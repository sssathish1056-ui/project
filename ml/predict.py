"""
Heart Disease Prediction API
Loads the trained model and makes predictions
"""

import sys
import json
import joblib
import numpy as np

def load_model():
    """Load the trained model and scaler"""
    model = joblib.load('ml/heart_disease_model.pkl')
    scaler = joblib.load('ml/scaler.pkl')
    
    with open('ml/feature_names.json', 'r') as f:
        feature_names = json.load(f)
    
    return model, scaler, feature_names

def predict(data):
    """
    Make a prediction on input data
    
    Expected input format:
    {
        "age": 63,
        "sex": 1,
        "cp": 3,
        "trestbps": 145,
        "chol": 233,
        "fbs": 1,
        "restecg": 0,
        "thalach": 150,
        "exang": 0,
        "oldpeak": 2.3,
        "slope": 0,
        "ca": 0,
        "thal": 1
    }
    """
    try:
        # Load model
        model, scaler, feature_names = load_model()
        
        # Convert input data to numpy array in correct order
        input_data = []
        for feature in feature_names:
            input_data.append(data[feature])
        
        input_array = np.array(input_data).reshape(1, -1)
        
        # Scale the input
        scaled_input = scaler.transform(input_array)
        
        # Make prediction
        prediction = model.predict(scaled_input)[0]
        probabilities = model.predict_proba(scaled_input)[0]
        
        # Get prediction probability
        disease_probability = float(probabilities[1])
        
        result = {
            "prediction": int(prediction),
            "probability": round(disease_probability, 4),
            "risk_level": get_risk_level(disease_probability),
            "confidence": get_confidence(disease_probability)
        }
        
        return result
        
    except Exception as e:
        return {
            "error": str(e),
            "prediction": -1
        }

def get_risk_level(probability):
    """Determine risk level based on probability"""
    if probability < 0.3:
        return "Low"
    elif probability < 0.6:
        return "Moderate"
    elif probability < 0.8:
        return "High"
    else:
        return "Very High"

def get_confidence(probability):
    """Get confidence level"""
    if probability < 0.4 or probability > 0.6:
        return "High"
    else:
        return "Moderate"

if __name__ == "__main__":
    # Read input from command line arguments
    input_json = sys.argv[1] if len(sys.argv) > 1 else None
    
    if input_json:
        try:
            data = json.loads(input_json)
            result = predict(data)
            print(json.dumps(result))
        except json.JSONDecodeError:
            print(json.dumps({"error": "Invalid JSON input"}))
    else:
        # Default test case
        test_data = {
            "age": 63,
            "sex": 1,
            "cp": 3,
            "trestbps": 145,
            "chol": 233,
            "fbs": 1,
            "restecg": 0,
            "thalach": 150,
            "exang": 0,
            "oldpeak": 2.3,
            "slope": 0,
            "ca": 0,
            "thal": 1
        }
        result = predict(test_data)
        print(json.dumps(result, indent=2))

