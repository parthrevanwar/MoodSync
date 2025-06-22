# test_api.py
import requests

def test_emotion_analysis(file_path):
    """Test the emotion analysis API"""
    # API endpoint
    url = 'http://localhost:5011/analyze'
    
    # Open and send the file
    with open(file_path, 'rb') as file:
        files = {'file': file}
        response = requests.post(url, files=files)
    
    # Print results
    if response.status_code == 200:
        result = response.json()
        if result['status'] == 'success':
            print("\nAnalysis Results:")
            print(f"Duration: {result['duration']:.2f} seconds")
            print(f"\nPrimary Emotion: {result['primary_emotion']['emotion']} "
                  f"({result['primary_emotion']['confidence']:.2%})")
            
            print("\nTop 3 Emotions:")
            for emotion in result['top3_emotions']:
                print(f"- {emotion['emotion']}: {emotion['confidence']:.2%}")
            
            print("\nAudio Features:")
            for feature, value in result['audio_features'].items():
                print(f"- {feature}: {value:.2f}")
        else:
            print(f"Error: {result['message']}")
    else:
        print(f"Request failed with status code: {response.status_code}")
        print(response.text)

if __name__ == '__main__':
    # Test the API
    test_emotion_analysis('out.wav')