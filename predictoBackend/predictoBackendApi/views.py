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

# sentiment_keywords = ['angry', 'negative', 'neutral', 'positive', 'happy']

# def calculate_cosine_similarity(embedding1, embedding2):
#     similarity = cosine_similarity([embedding1], [embedding2])
#     return similarity[0][0]

# def predict_sentiment(input_embedding):
#     similarity_scores = [calculate_cosine_similarity(input_embedding, use_model([keyword])[0]) for keyword in sentiment_keywords]
#     predicted_sentiment_index = np.argmax(similarity_scores)
#     return sentiment_keywords[predicted_sentiment_index]

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

# @csrf_exempt
# def sentix(request):
#     if request.method == 'POST':
#         # Check if the request contains text
#         text = request.POST.get('text', '')

#         # Perform sentiment analysis using the Universal Sentence Encoder
#         if text:
#             sentiment_embedding = use_model([text])[0]
            
#             predicted_sentiment = predict_sentiment(sentiment_embedding)
            
#             return JsonResponse({'sentiment': predicted_sentiment})
#         else:
#             return JsonResponse({'error': 'No text provided'})

#     return JsonResponse({'error': 'Invalid request method'})

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