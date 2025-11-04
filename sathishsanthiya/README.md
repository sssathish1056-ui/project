# 🩺 Heart Disease Prediction Web App

<div align="center">

**AI-Powered Heart Disease Risk Assessment Platform**

Built with Machine Learning, Node.js, and Modern Web Technologies

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## ✨ Features

- 🤖 **AI-Powered Predictions**: Uses ensemble machine learning models (Logistic Regression, Random Forest, KNN, Gradient Boosting)
- 💻 **Modern UI/UX**: Beautiful, responsive interface with gradient designs and smooth animations
- 🎯 **Real-time Analysis**: Instant risk assessment with detailed probability scores
- 💬 **AI Assistant**: Interactive chat-style guidance system
- 📊 **Visual Results**: Risk meters, badges, and intuitive data visualization
- 🔒 **Privacy-First**: No data storage - all processing is local
- 🚀 **Easy Setup**: Automated dependency management

---

## 🏗️ Tech Stack

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern gradients, animations, and responsive design
- **JavaScript (ES6+)** - Async API calls and dynamic UI updates

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Python** - Machine learning backend
- **scikit-learn** - ML algorithms
- **pandas** - Data processing
- **numpy** - Numerical computations

### ML Models
- Logistic Regression
- Random Forest Classifier
- K-Nearest Neighbors (KNN)
- Gradient Boosting Classifier

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://python.org/)
- **npm** or **yarn** (comes with Node.js)
- **pip** (Python package manager)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/heart-disease-predictor.git
cd heart-disease-predictor
```

### 2. Install Node.js Dependencies

```bash
npm install
```

This will install:
- Express.js
- CORS
- Body-parser
- Nodemon (dev dependency)

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

Or using conda:

```bash
conda install --yes --file requirements.txt
```

This will install:
- scikit-learn
- pandas
- numpy
- joblib
- matplotlib
- seaborn

### 4. Train the ML Model

```bash
npm run train
```

Or directly:

```bash
python ml/train_model.py
```

This will:
- Generate a synthetic dataset
- Train multiple ML models
- Select the best performing model
- Save the model and scaler to `ml/` directory

**Expected Output:**
```
🩺 Heart Disease Prediction Model Training
==================================================

📊 Loading Dataset...
Dataset Shape: (1000, 14)
Target Distribution: ...

Train set: 800 samples
Test set: 200 samples

==================================================
Training Logistic Regression...
Train Accuracy: 0.8450
Test Accuracy: 0.8250
...

🏆 Best Model: Random Forest with 0.8750 accuracy
==================================================

🎉 Training Complete!
```

### 5. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   🩺 Heart Disease Predictor Server   ║
╚════════════════════════════════════════╝

🚀 Server running on http://localhost:3000
```

### 6. Open in Browser

Navigate to: **http://localhost:3000**

---

## 📖 Usage Guide

### Making a Prediction

1. **Fill the Form**: Enter patient data including:
   - Personal demographics (age, sex)
   - Medical measurements (blood pressure, cholesterol)
   - Test results (ECG, exercise tests)
   - Clinical observations

2. **Click "Analyze Heart Risk"**: The AI will process the data

3. **View Results**:
   - **Risk Probability**: Percentage chance of heart disease
   - **Risk Level**: Low, Moderate, High, or Very High
   - **Prediction**: Clear disease/no disease outcome
   - **AI Recommendations**: Personalized health advice

### Understanding the Results

- **Risk Level "Low"** (< 30%): Minimal risk, maintain healthy lifestyle
- **Risk Level "Moderate"** (30-60%): Some risk factors present, consider lifestyle changes
- **Risk Level "High"** (60-80%): Significant risk, consult healthcare provider
- **Risk Level "Very High"** (> 80%): High risk, seek immediate medical attention

---

## 🧪 Testing the API

### Using curl

```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

### Expected Response

```json
{
  "prediction": 1,
  "probability": 0.8234,
  "risk_level": "High",
  "confidence": "High"
}
```

---

## 📁 Project Structure

```
heart-disease-predictor/
│
├── ml/                          # Machine Learning Directory
│   ├── train_model.py          # Model training script
│   ├── predict.py              # Prediction API
│   ├── heart_disease_model.pkl # Trained model (generated)
│   └── scaler.pkl              # Feature scaler (generated)
│
├── index.html                  # Main HTML page
├── styles.css                  # Stylesheet
├── script.js                   # Frontend JavaScript
├── server.js                   # Node.js Express server
│
├── package.json                # Node.js dependencies
├── requirements.txt            # Python dependencies
├── .gitignore                  # Git ignore file
└── README.md                   # This file
```

---

## 🔧 Configuration

### Change Server Port

Edit `server.js`:

```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your desired port
```

Or set environment variable:

```bash
export PORT=5000
npm start
```

### Change API URL (Frontend)

Edit `script.js`:

```javascript
const API_URL = 'http://localhost:3000/api/predict'; // Update this
```

---

## 🎨 Customization

### Change Color Scheme

Edit `styles.css`:

```css
:root {
    --primary-color: #e74c3c;  /* Change this */
    --secondary-color: #3498db; /* And this */
    --success-color: #2ecc71;
    /* ... */
}
```

### Modify AI Messages

Edit `script.js` - `addAIMessage()` function and recommendation logic

---

## ⚠️ Important Disclaimers

1. **Medical Disclaimer**: This tool is for **educational and demonstration purposes only**. It does not replace professional medical advice, diagnosis, or treatment.

2. **Not FDA Approved**: This application is not a medical device and has not been evaluated by any medical regulatory authority.

3. **Data Privacy**: While the application processes data locally, always follow HIPAA and data protection regulations in production.

4. **Accuracy**: The model uses synthetic data and may not reflect real-world diagnostic accuracy.

---

## 🐛 Troubleshooting

### Python not found

**Error**: `python: command not found`

**Solution**:
- Use `python3` instead of `python`
- Update `server.js`: Change `spawn('python', ...)` to `spawn('python3', ...)`

### Model file not found

**Error**: `FileNotFoundError: ml/heart_disease_model.pkl`

**Solution**: Run the training script first:
```bash
npm run train
```

### Port already in use

**Error**: `EADDRINUSE: address already in use`

**Solution**: Kill the process using the port or change the port number:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

### CORS errors in browser

**Solution**: CORS is already configured in the server, but if issues persist:
1. Ensure you're accessing `http://localhost:3000`
2. Clear browser cache
3. Check browser console for specific errors

---

## 🚀 Deployment

### Local Deployment

Just follow the Quick Start guide above.

### Cloud Deployment

#### Render.com

1. Create a new Web Service
2. Connect your Git repository
3. Set build command: `pip install -r requirements.txt && npm install && npm run train`
4. Set start command: `npm start`
5. Deploy!

#### Heroku

1. Create `Procfile`:
```
web: node server.js
```

2. Deploy:
```bash
heroku create
git push heroku main
```

Railway.app, DigitalOcean App Platform, or similar services work similarly.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

---

## 🙏 Acknowledgments

- Scikit-learn for excellent ML tools
- Express.js for the robust web framework
- The open-source community for inspiration

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an [Issue](https://github.com/yourusername/heart-disease-predictor/issues)
3. Contact: your.email@example.com

---

<div align="center">
Made with ❤️ and 🤖 AI
</div>

