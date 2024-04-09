from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app) 

model = tf.keras.models.load_model('C:/Users/Dhanush/Downloads/plant-village-tomato-main/trained_model')

class_names = [
    'Tomato_Bacterial_spot',
    'Tomato_Early_blight',
    'Tomato_Late_blight',
    'Tomato_Leaf_Mold',
    'Tomato_Septoria_leaf_spot',
    'Tomato_Spider_mites_Two_spotted_spider_mite',
    'Tomato_Target_Spot',
    'Tomato_Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato_mosaic_virus',
    'Tomato_healthy'
]

threshold = 0.5  # Threshold for confidence level

@app.route('/predict', methods=['POST'])
def predict_disease():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image'].read()
    preprocessed_image = preprocess_image(image)
    predictions = model(preprocessed_image)
    max_prob = np.max(predictions)
    
    if max_prob < threshold:
        return jsonify({'predicted_class': 'Unknown'})
    
    predicted_class = np.argmax(predictions)
    predicted_class_name = class_names[predicted_class]
    
    return jsonify({'predicted_class': predicted_class_name})

def preprocess_image(image):
    img_array = tf.image.decode_image(image, channels=3)
    img_array = tf.image.resize(img_array, [256, 256])
    img_array = tf.expand_dims(img_array, 0) 
    img_array = img_array / 255.0  
    return img_array

if __name__ == '__main__':
    app.run(debug=True)
