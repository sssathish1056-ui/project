// Heart Disease Predictor Frontend Script - Standalone Version (No Server Needed!)

// DOM Elements
const form = document.getElementById('heartForm');
const submitBtn = document.getElementById('submitBtn');
const resultsContainer = document.getElementById('resultsContainer');
const loadingOverlay = document.getElementById('loadingOverlay');
const chatMessages = document.getElementById('chatMessages');

// Form submission handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading
    showLoading();
    
    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        const parsedValue = value;
        // Try to parse as number
        if (!isNaN(value) && value !== '') {
            data[key] = parseFloat(value);
        } else {
            data[key] = value;
        }
    });
    
    // Show AI message
    addAIMessage("Processing your medical data... This will just take a moment.");
    
    // Simulate processing delay
    setTimeout(() => {
        try {
            // Calculate prediction locally (no server needed!)
            const result = calculatePrediction(data);
            
            // Hide loading
            hideLoading();
            
            // Add AI response
            addAIMessage(`Analysis complete! Your risk level is ${result.risk_level}. I've prepared a detailed assessment below.`);
            
            // Display results
            displayResults(result);
            
            // Scroll to results
            setTimeout(() => {
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            
        } catch (error) {
            hideLoading();
            addAIMessage("I encountered an error. Please check that all fields are filled correctly.");
            console.error('Error:', error);
        }
    }, 1500); // 1.5 second delay for realistic feel
});

function calculatePrediction(data) {
    console.log('🔬 Calculating heart disease risk...', data);
    
    // Calculate risk score based on medical factors
    let riskScore = 0;
    
    // Age factor (strongest predictor)
    if (data.age > 65) riskScore += 25;
    else if (data.age > 55) riskScore += 18;
    else if (data.age > 45) riskScore += 12;
    else if (data.age > 35) riskScore += 5;
    
    // Blood pressure (very important)
    if (data.trestbps > 150) riskScore += 20;
    else if (data.trestbps > 140) riskScore += 15;
    else if (data.trestbps > 130) riskScore += 10;
    else if (data.trestbps > 120) riskScore += 5;
    
    // Cholesterol level
    if (data.chol > 280) riskScore += 20;
    else if (data.chol > 240) riskScore += 15;
    else if (data.chol > 200) riskScore += 8;
    
    // Sex (males have higher risk)
    if (data.sex == 1) riskScore += 8;
    
    // Chest pain type (important indicator)
    if (data.cp == 3 || data.cp == '3') riskScore += 0; // Asymptomatic - lower risk
    else if (data.cp == 2 || data.cp == '2') riskScore += 12;
    else if (data.cp == 1 || data.cp == '1') riskScore += 8;
    else if (data.cp == 0 || data.cp == '0') riskScore += 5;
    
    // Exercise induced angina (significant risk)
    if (data.exang == 1 || data.exang == '1') riskScore += 15;
    
    // ST depression (indicator of heart problems)
    const oldpeakValue = parseFloat(data.oldpeak);
    if (oldpeakValue > 2.5) riskScore += 20;
    else if (oldpeakValue > 1.5) riskScore += 12;
    else if (oldpeakValue > 0.5) riskScore += 5;
    
    // Number of major vessels (blockages)
    riskScore += (parseInt(data.ca) || 0) * 8;
    
    // Heart rate (low max heart rate indicates problems)
    if (data.thalach < 100) riskScore += 15;
    else if (data.thalach < 120) riskScore += 10;
    else if (data.thalach < 150) riskScore += 5;
    
    // Thalassemia (blood disorder factor)
    if (data.thal == 3 || data.thal == '3') riskScore += 12; // Reversible defect
    else if (data.thal == 2 || data.thal == '2') riskScore += 8; // Fixed defect
    
    // Fasting blood sugar (diabetes indicator)
    if (data.fbs == 1 || data.fbs == '1') riskScore += 8;
    
    // Slope of ST segment
    if (data.slope == 2 || data.slope == '2') riskScore += 10; // Downsloping
    else if (data.slope == 1 || data.slope == '1') riskScore += 5; // Flat
    
    // Resting ECG abnormalities
    if (data.restecg == 1 || data.restecg == '1') riskScore += 5;
    
    // Normalize to 0-1 range (0 to 100%)
    const probability = Math.min(riskScore / 100, 0.99);
    
    // Determine prediction
    const prediction = probability > 0.5 ? 1 : 0;
    
    // Determine risk level
    let riskLevel;
    if (probability < 0.3) riskLevel = "Low";
    else if (probability < 0.55) riskLevel = "Moderate";
    else if (probability < 0.75) riskLevel = "High";
    else riskLevel = "Very High";
    
    // Determine confidence
    let confidence = "Moderate";
    if (probability > 0.85 || probability < 0.15) confidence = "High";
    else if (probability > 0.70 || probability < 0.30) confidence = "Moderate";
    else confidence = "Moderate";
    
    const result = {
        prediction: prediction,
        probability: probability,
        risk_level: riskLevel,
        confidence: confidence,
        risk_score: riskScore.toFixed(0)
    };
    
    console.log('📊 Prediction result:', result);
    return result;
}

function showLoading() {
    if (loadingOverlay) loadingOverlay.classList.add('active');
    if (submitBtn) submitBtn.disabled = true;
}

function hideLoading() {
    if (loadingOverlay) loadingOverlay.classList.remove('active');
    if (submitBtn) submitBtn.disabled = false;
}

function addAIMessage(message) {
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function displayResults(result) {
    // Update risk percentage
    const riskPercentage = Math.round(result.probability * 100);
    document.getElementById('riskPercentage').textContent = `${riskPercentage}%`;
    
    // Update risk bar
    const riskFill = document.getElementById('riskFill');
    if (riskFill) {
        riskFill.style.width = `${riskPercentage}%`;
    }
    
    // Update risk badge
    const riskBadge = document.getElementById('riskBadge');
    const riskLevel = document.getElementById('riskLevel');
    if (riskLevel) {
        riskLevel.textContent = result.risk_level;
    }
    
    // Set badge color based on risk
    if (riskBadge) {
        riskBadge.className = 'risk-badge';
        if (result.risk_level === 'Very High' || result.risk_level === 'High') {
            riskBadge.classList.add('high-risk');
        } else if (result.risk_level === 'Low') {
            riskBadge.classList.add('low-risk');
        }
    }
    
    // Update prediction
    const predictionResult = document.getElementById('predictionResult');
    if (predictionResult) {
        const predictionText = result.prediction === 1 
            ? '⚠️ Heart Disease Risk Detected' 
            : '✅ Low Risk - Healthy Heart';
        predictionResult.textContent = predictionText;
    }
    
    // Update prediction box color
    const predictionBox = document.getElementById('predictionBox');
    if (predictionBox) {
        if (result.prediction === 1) {
            predictionBox.style.background = 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)';
        } else {
            predictionBox.style.background = 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)';
        }
    }
    
    // Update confidence
    const confidenceLevel = document.getElementById('confidenceLevel');
    if (confidenceLevel) {
        confidenceLevel.textContent = result.confidence;
    }
    
    // Generate recommendations
    generateRecommendations(result);
    
    // Show results container
    if (resultsContainer) {
        resultsContainer.style.display = 'block';
    }
}

function generateRecommendations(result) {
    const recommendationsList = document.getElementById('recommendationsList');
    if (!recommendationsList) return;
    
    recommendationsList.innerHTML = '';
    
    const recommendations = [];
    
    if (result.prediction === 1) {
        recommendations.push(
            { icon: '🏥', text: 'Schedule an appointment with a cardiologist immediately.' },
            { icon: '💊', text: 'Discuss medication options with your healthcare provider.' },
            { icon: '📊', text: 'Consider additional diagnostic tests like ECG or echocardiogram.' },
            { icon: '❤️', text: 'Adopt a heart-healthy lifestyle: reduce sodium and saturated fats.' },
            { icon: '🚶', text: 'Engage in regular physical activity as advised by your doctor.' },
            { icon: '🚭', text: 'If you smoke, seek support to quit smoking immediately.' },
            { icon: '😴', text: 'Ensure adequate sleep (7-9 hours) and manage stress levels.' },
            { icon: '📅', text: 'Keep regular follow-ups with your healthcare provider.' }
        );
    } else {
        recommendations.push(
            { icon: '✅', text: 'Continue maintaining your healthy lifestyle habits.' },
            { icon: '🥗', text: 'Maintain a balanced diet rich in fruits and vegetables.' },
            { icon: '🏃', text: 'Keep up regular physical activity (150 minutes/week).' },
            { icon: '🩺', text: 'Schedule annual health check-ups.' },
            { icon: '💤', text: 'Ensure quality sleep and stress management.' },
            { icon: '🧘', text: 'Practice mindfulness and relaxation techniques.' },
            { icon: '📚', text: 'Stay informed about heart health best practices.' }
        );
    }
    
    recommendations.forEach(rec => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.innerHTML = `<span>${rec.icon}</span><span>${rec.text}</span>`;
        recommendationsList.appendChild(item);
    });
}

function resetForm() {
    if (form) form.reset();
    if (resultsContainer) resultsContainer.style.display = 'none';
    if (form) form.scrollIntoView({ behavior: 'smooth' });
    addAIMessage("Ready for a new analysis. Please fill in the information below.");
}

// Add initial welcome message on page load
document.addEventListener('DOMContentLoaded', () => {
    addAIMessage("Welcome! Let's start by gathering some information about your health profile.");
    console.log('✅ Heart Disease Predictor loaded successfully!');
    console.log('💡 This version works completely standalone - no server needed!');
});
