"""
Heart Disease Prediction Model Trainer
Uses multiple algorithms to find the best model
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import json

def create_sample_dataset():
    """Create a realistic sample dataset for heart disease"""
    np.random.seed(42)
    n_samples = 1000
    
    data = {
        'age': np.random.randint(29, 78, n_samples),
        'sex': np.random.choice([0, 1], n_samples),
        'cp': np.random.randint(0, 4, n_samples),  # Chest pain type
        'trestbps': np.random.randint(94, 201, n_samples),  # Resting blood pressure
        'chol': np.random.randint(126, 565, n_samples),  # Serum cholesterol
        'fbs': np.random.choice([0, 1], n_samples),  # Fasting blood sugar > 120 mg/dl
        'restecg': np.random.randint(0, 3, n_samples),  # Resting ECG results
        'thalach': np.random.randint(71, 203, n_samples),  # Maximum heart rate
        'exang': np.random.choice([0, 1], n_samples),  # Exercise induced angina
        'oldpeak': np.round(np.random.uniform(0.0, 6.2, n_samples), 1),  # ST depression
        'slope': np.random.randint(0, 3, n_samples),  # Slope of peak exercise ST segment
        'ca': np.random.randint(0, 4, n_samples),  # Number of major vessels colored
        'thal': np.random.choice([1, 2, 3], n_samples),  # Thalassemia
    }
    
    df = pd.DataFrame(data)
    
    # Create target with some logic to make it realistic
    # Higher risk based on combination of factors
    risk_score = (
        df['age'] * 0.05 +
        df['trestbps'] * 0.02 +
        df['chol'] * 0.01 +
        (df['sex'] == 1) * 10 +
        (df['cp'] >= 2) * 15 +
        (df['fbs'] == 1) * 10 +
        (df['exang'] == 1) * 20 +
        (df['oldpeak'] > 1.5) * 25 +
        df['ca'] * 10 +
        (df['thal'] == 3) * 15
    )
    
    df['target'] = (risk_score > 100).astype(int)
    
    return df

def train_models(X_train, X_test, y_train, y_test):
    """Train multiple models and return the best one"""
    
    models = {
        'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10),
        'KNN': KNeighborsClassifier(n_neighbors=7),
        'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42)
    }
    
    results = {}
    best_model = None
    best_score = 0
    best_name = ""
    
    for name, model in models.items():
        print(f"\n{'='*50}")
        print(f"Training {name}...")
        
        model.fit(X_train, y_train)
        train_score = model.score(X_train, y_train)
        test_score = model.score(X_test, y_test)
        
        print(f"Train Accuracy: {train_score:.4f}")
        print(f"Test Accuracy: {test_score:.4f}")
        
        results[name] = {
            'model': model,
            'train_score': train_score,
            'test_score': test_score
        }
        
        if test_score > best_score:
            best_score = test_score
            best_model = model
            best_name = name
    
    print(f"\n{'='*50}")
    print(f"🏆 Best Model: {best_name} with {best_score:.4f} accuracy")
    print(f"{'='*50}\n")
    
    return best_model, best_name, results

def main():
    print("🩺 Heart Disease Prediction Model Training")
    print("="*50)
    
    # Load or create dataset
    print("\n📊 Loading Dataset...")
    df = create_sample_dataset()
    
    print(f"Dataset Shape: {df.shape}")
    print(f"Target Distribution:\n{df['target'].value_counts()}")
    
    # Split features and target
    X = df.drop('target', axis=1)
    y = df['target']
    
    # Split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"\nTrain set: {X_train.shape[0]} samples")
    print(f"Test set: {X_test.shape[0]} samples")
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Save scaler
    joblib.dump(scaler, 'ml/scaler.pkl')
    print("✅ Scaler saved to ml/scaler.pkl")
    
    # Train models
    best_model, best_name, results = train_models(
        X_train_scaled, X_test_scaled, y_train, y_test
    )
    
    # Make predictions on test set
    y_pred = best_model.predict(X_test_scaled)
    
    # Detailed metrics
    print("\n📈 Detailed Classification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save the best model
    joblib.dump(best_model, 'ml/heart_disease_model.pkl')
    print("✅ Model saved to ml/heart_disease_model.pkl")
    
    # Save feature names
    feature_names = list(X.columns)
    with open('ml/feature_names.json', 'w') as f:
        json.dump(feature_names, f)
    print("✅ Feature names saved to ml/feature_names.json")
    
    # Save metadata
    metadata = {
        'best_model': best_name,
        'best_accuracy': results[best_name]['test_score'],
        'train_accuracy': results[best_name]['train_score'],
        'n_features': len(feature_names),
        'n_train_samples': len(X_train),
        'n_test_samples': len(X_test)
    }
    
    with open('ml/model_metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    print("✅ Model metadata saved to ml/model_metadata.json")
    
    print("\n🎉 Training Complete!")
    print(f"Best Model: {best_name}")
    print(f"Accuracy: {results[best_name]['test_score']:.4f}")

if __name__ == "__main__":
    main()

