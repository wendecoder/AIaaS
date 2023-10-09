import os
import io
import tensorflow as tf
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from keras.applications.vgg16 import VGG16, preprocess_input, decode_predictions
from keras.preprocessing import image
from keras.models import load_model
import cv2
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
nltk.download('vader_lexicon')


# Load the pre-trained VGG16 model
animal_model = VGG16(weights='imagenet')

# Path to the downloaded model directory on your local computer
model_path = r"C:\Users\Administrator\Documents\uninversal"

# Define a dictionary to map label numbers to label names
DB_label_names = {
    0: 'No DR',
    1: 'Mild',
    2: 'Moderate',
    3: 'Severe',
    4: 'Proliferative DR'
}

SC_label_names = {
    0: 'MEL(Melanoma (Highly cancerous))',    # Melanoma (Highly cancerous)
    1: 'NV(Melanocytic nevus (Not cancerous))',     # Melanocytic nevus (Not cancerous)
    2: 'BCC(Basal cell carcinoma (Cancerous))',    # Basal cell carcinoma (Cancerous)
    3: 'AK(Actinic keratosis (Precancerous))',     # Actinic keratosis (Precancerous)
    4: 'BKL(Benign keratosis-like lesions (Not cancerous))',    # Benign keratosis-like lesions (Not cancerous)
    5: 'DF(Dermatofibroma (Usually not cancerous))',     # Dermatofibroma (Usually not cancerous)
    6: 'VASC(Vascular lesions (Varies in cancerousness))',   # Vascular lesions (Varies in cancerousness)
    7: 'SCC(Squamous cell carcinoma (Cancerous))',    # Squamous cell carcinoma (Cancerous)
    8: 'UNK(Unknown (Uncertain cancerousness))'     # Unknown (Uncertain cancerousness)
}
# Load the model using TensorFlow Hub
use_model = tf.saved_model.load(model_path)

# ImageNet class ID range for animal categories
animal_class_id_prefix = "n0"
animal_class_id_start = 2084071
animal_class_id_end = 2617172

def getDatasetAndEmbeddings():
    # Define the path to the text file containing AI-related sentences
    file_path = r"C:\Users\Administrator\Documents\semanticDataset.txt"

    # Read sentences from the text file
    with open(file_path, "r", encoding="utf-8") as file:
        dataset = file.readlines()

    # Preprocess sentences by removing newline characters
    dataset = [sentence.strip() for sentence in dataset]

    # Load the embedded sentence
    loaded_embeddings = np.load(r"C:\Users\Administrator\Desktop\Icog Project\predictochain\predictoBackend\sentence_embeddings.model.npy")
    
    return dataset, loaded_embeddings


@csrf_exempt
def aniclassify(request):
    if request.method == 'POST':
        # Get the uploaded image
        image_file = request.FILES['image']

        # Read the image data from the InMemoryUploadedFile
        image_data = image_file.read()

        # Load and preprocess the image
        img = image.load_img(io.BytesIO(image_data), target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = preprocess_input(img_array)
        img_array = img_array.reshape((1, img_array.shape[0], img_array.shape[1], img_array.shape[2]))

        # Make predictions
        predictions = animal_model.predict(img_array)
        decoded_predictions = decode_predictions(predictions, top=1)[0]
        predicted_class_id = decoded_predictions[0][0]
        predicted_category = decoded_predictions[0][1]

        # Check if the predicted class ID is within the animal class ID range
        # if predicted_class_id.startswith(animal_class_id_prefix):
        #     numeric_class_id = int(predicted_class_id[len(animal_class_id_prefix):])
        #     if animal_class_id_start <= numeric_class_id <= animal_class_id_end:
        return JsonResponse({'predicted_category': predicted_category})

        # If the predicted class ID is not within the range or doesn't start with "n0"
        # return JsonResponse({'error': 'The uploaded image is not an animal image'})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def sentix(request):
    if request.method == 'POST':
        text = request.POST.get('text', '')

        if text:
            sentences = nltk.sent_tokenize(text)
            sentiment_scores = []

            sia = SentimentIntensityAnalyzer()

            for sentence in sentences:
                sentiment_scores.append(sia.polarity_scores(sentence))

            overall_sentiment = sum(score['compound'] for score in sentiment_scores) / len(sentiment_scores)
            print(overall_sentiment)
            if overall_sentiment >= 0.05:
                predicted_sentiment = 'Positive'
            elif overall_sentiment <= -0.05:
                predicted_sentiment = 'Negative'
            else:
                predicted_sentiment = 'Neutral'

            return JsonResponse({'sentiment': predicted_sentiment})
        else:
            return JsonResponse({'error': 'No text provided'})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def semanticSearch(request):
    print("got inside semantic search endpoint")
    if request.method == 'POST':
        print("yes the method is post")
        user_query = request.POST.get('text', '')
        if user_query:
            # Preprocess user query and encode it into an embedding
            query_embedding = use_model([user_query])[0]
            dataset, loaded_embeddings = getDatasetAndEmbeddings()

            # Calculate cosine similarity between query embedding and loaded embeddings
            similarity_scores = cosine_similarity([query_embedding], loaded_embeddings)[0]

            # Combine the sentences and similarity scores
            ranked_sentences = sorted(zip(dataset, similarity_scores), key=lambda x: x[1], reverse=True)

            # Prepare response data
            response_data = [
                {"sentence": sentence, "similarity_score": score.item()} for sentence, score in ranked_sentences[:5]
            ]
            print(response_data)

            return JsonResponse({"results": response_data})
        else:
            print("no user query received")
            return JsonResponse({"error": "No query provided"})

    return JsonResponse({"error": "Invalid request method"})

@csrf_exempt
def medicognize(request):
    IMAGE_SIZE = [331, 331]
    
    if request.method == 'POST':
        print(request.FILES)
        print(request.POST)
        imageFile = request.FILES['image']
        imageCategory = request.POST.get('type', '')

        if imageCategory == 'Diabetic Retinopathy Detection':
            model = load_model(r"C:\Users\Administrator\Documents\best_model.h5")
            if imageFile:
                # Read the image data from the InMemoryUploadedFile
                image_data = imageFile.read()
                
                # Decode the image using PIL
                image = Image.open(io.BytesIO(image_data))
                
                # Convert the image array to 8-bit unsigned integer data type
                image = tf.image.convert_image_dtype(image, tf.uint8)

                # Set the static shape of the image tensor
                # image.set_shape([None, None, 3])   Assuming 3 channels for RGB images
                
                # Apply image enhancement preprocessing using OpenCV
                def preprocess_image(image):
                    img_array = image.numpy()
                    img_array_gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)  # Convert to grayscale
                    img_array_eq = cv2.equalizeHist(img_array_gray)  # Apply histogram equalization
                    img_array_eq_rgb = cv2.cvtColor(img_array_eq, cv2.COLOR_GRAY2RGB)  # Convert back to RGB
                    # Ensure pixel values are within the expected range (0-255)
                    img_array_eq_rgb = np.clip(img_array_eq_rgb, 0, 255)
                    # Normalize the image to the range [0, 1] and convert to TensorFlow tensor
                    normalized = tf.convert_to_tensor(img_array_eq_rgb / 255.0, dtype=tf.float32)
                    return normalized

                image = tf.py_function(preprocess_image, [image], tf.float32)
                
                # Convert to float32 and normalize to [0, 1]
                image = tf.image.convert_image_dtype(image, tf.float32)
                
                # Set the static shape of the image tensor
                image.set_shape([None, None, 3])  # Assuming 3 channels for RGB images
                
                # Resize the image to the defined size
                image = tf.image.resize(image, IMAGE_SIZE)

                # Add a batch dimension with size 1
                image = tf.expand_dims(image, axis=0)

                # Print the shape of the image tensor
                print("Shape of the preprocessed image:", image.shape)

                prediction = model.predict(image)
                prediction_idx = np.argmax(prediction, axis=-1)
                print(prediction_idx[0])
                labeled_prediction = DB_label_names[prediction_idx[0]]
                return JsonResponse({"prediction": labeled_prediction})
            
        elif imageCategory == 'Skin Cancer Detection':
            model = load_model(r"D:\best_model.h5")
            if imageFile:
                # Read the image data from the InMemoryUploadedFile
                image_data = imageFile.read()
                
                # Decode the image using PIL
                image = Image.open(io.BytesIO(image_data))

                # Convert to float32 and normalize to [0, 1]
                normalized = tf.image.convert_image_dtype(image, tf.float32) / 255.0

                # Resize the image to the defined size
                image = tf.image.resize(normalized, IMAGE_SIZE)

                # Add a batch dimension with size 1
                image = tf.expand_dims(image, axis=0)

                # Print the shape of the image tensor
                print("Shape of the preprocessed image:", image.shape)

                prediction = model.predict(image)
                prediction_idx = np.argmax(prediction, axis=-1)
                print(prediction_idx[0])
                labeled_prediction = SC_label_names[prediction_idx[0]]
                return JsonResponse({"prediction": labeled_prediction})

        else:
                print("no user query received")
                return JsonResponse({"error": "No query provided"})
        
    return JsonResponse({'error': 'Invalid request method'})
    
