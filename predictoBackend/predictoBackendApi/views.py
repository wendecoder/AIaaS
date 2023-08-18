import os
import io
import tensorflow as tf
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from keras.applications.vgg16 import VGG16, preprocess_input, decode_predictions
from keras.preprocessing import image
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
nltk.download('vader_lexicon')


# Load the pre-trained VGG16 model
animal_model = VGG16(weights='imagenet')

# Path to the downloaded model directory on your local computer
model_path = r"C:\Users\Administrator\Documents\uninversal"


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