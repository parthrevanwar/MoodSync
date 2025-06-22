# Testing Emotion Analysis API with Postman

## Available Endpoints

1. Health Check
```
GET http://localhost:5000/health
```

2. Get Supported Emotions
```
GET http://localhost:5000/emotions
```

3. Analyze Audio
```
POST http://localhost:5000/analyze
```

## Testing Steps

### 1. Health Check
1. Create new request
2. Select `GET` method
3. Enter URL: `http://localhost:5000/health`
4. Click Send
   - Should return: `{"status": "healthy", "model_loaded": true}`

### 2. Get Emotions
1. Create new request
2. Select `GET` method
3. Enter URL: `http://localhost:5000/emotions`
4. Click Send
   - Should return list of supported emotions

### 3. Analyze Audio (Main Endpoint)
1. Create new request
2. Select `POST` method
3. Enter URL: `http://localhost:5000/analyze`
4. Go to `Body` tab
5. Select `form-data`
6. Add key-value pair:
   - Key: `file` (Important: Click dropdown and select 'File' type)
   - Value: Select your audio file
7. Click Send

Expected Response Format:
```json
{
    "status": "success",
    "duration": 10.5,
    "primary_emotion": {
        "emotion": "happy",
        "confidence": 0.85
    },
    "top3_emotions": [
        {
            "emotion": "happy",
            "confidence": 0.85
        },
        {
            "emotion": "neutral",
            "confidence": 0.10
        },
        {
            "emotion": "excited",
            "confidence": 0.05
        }
    ],
    "audio_features": {
        "volume_mean": 0.75,
        "speech_rate": 1.2,
        "spectral_centroid": 950.5,
        "tempo": 120.0
    }
}
```

## Common Issues and Solutions

1. **File Not Found**
   - Make sure you've selected a file in the form-data
   - Check if the key is named exactly `file`

2. **Server Not Running**
   - Ensure Flask server is running
   - Check if you see "Running on http://localhost:5000" in terminal

3. **Wrong File Type**
   - Check if file extension is .wav, .mp3, or .ogg
   - Error message will indicate allowed types

4. **File Too Large**
   - Maximum file size is 16MB
   - Try with a smaller file

## Testing Different Scenarios

1. **Happy Path:**
   - Upload valid audio file
   - Should get successful analysis

2. **Error Cases:**
   - Try without file (should get "No file provided")
   - Try wrong file type (should get file type error)
   - Try file > 16MB (should get size limit error)

3. **Different Audio Types:**
   - Test with different emotions
   - Test different durations
   - Test different audio qualities