const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

function checkModelFiles() {
    return {
        modelExists: fs.existsSync('ml/heart_disease_model.pkl'),
        scalerExists: fs.existsSync('ml/scaler.pkl'),
        featureExists: fs.existsSync('ml/feature_names.json')
    };
}

function demoPrediction(data) {
    let riskScore = 0;
    
    if (data.age > 60) riskScore += 20;
    else if (data.age > 45) riskScore += 10;
    
    if (data.trestbps > 140) riskScore += 15;
    else if (data.trestbps > 120) riskScore += 5;
    
    if (data.chol > 240) riskScore += 15;
    else if (data.chol > 200) riskScore += 5;
    
    if (data.sex == 1) riskScore += 5;
    if (data.cp >= 2) riskScore += 10;
    if (data.exang == 1) riskScore += 15;
    if (data.oldpeak > 1.5) riskScore += 15;
    
    riskScore += data.ca * 5;
    if (data.thal == 3) riskScore += 10;
    if (data.fbs == 1) riskScore += 5;
    
    const probability = Math.min(riskScore / 100, 1);
    const prediction = probability > 0.5 ? 1 : 0;
    
    let riskLevel;
    if (probability < 0.3) riskLevel = "Low";
    else if (probability < 0.6) riskLevel = "Moderate";
    else if (probability < 0.8) riskLevel = "High";
    else riskLevel = "Very High";
    
    return {
        prediction: prediction,
        probability: Math.round(probability * 100) / 100,
        risk_level: riskLevel,
        confidence: "Moderate (Demo Mode)",
        demo: true
    };
}

function tryPythonCommand(commands, index, inputData, res) {
    if (index >= commands.length) {
        res.json(demoPrediction(JSON.parse(inputData)));
        return;
    }
    
    const pythonCmd = commands[index];
    console.log(`Trying: ${pythonCmd}`);
    
    const pythonProcess = spawn(pythonCmd, ['ml/predict.py', inputData]);
    let pythonOutput = '';
    
    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });
    
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            tryPythonCommand(commands, index + 1, inputData, res);
            return;
        }
        
        try {
            const result = JSON.parse(pythonOutput);
            res.json(result);
        } catch (error) {
            tryPythonCommand(commands, index + 1, inputData, res);
        }
    });
    
    pythonProcess.on('error', () => {
        tryPythonCommand(commands, index + 1, inputData, res);
    });
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.post('/api/predict', (req, res) => {
    const requiredFields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
    const missingFields = requiredFields.filter(field => req.body[field] === undefined);
    
    if (missingFields.length > 0) {
        return res.status(400).json({ error: 'Missing fields', missing: missingFields });
    }
    
    const modelFiles = checkModelFiles();
    if (!modelFiles.modelExists || !modelFiles.scalerExists) {
        console.log('Using demo mode');
        return res.json(demoPrediction(req.body));
    }
    
    tryPythonCommand(['python3', 'python'], 0, JSON.stringify(req.body), res);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
