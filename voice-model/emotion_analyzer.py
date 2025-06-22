# emotion_analyzer.py
import numpy as np
import librosa
import torch
from transformers import AutoFeatureExtractor, AutoModelForAudioClassification
import warnings
from typing import Dict, List
import soundfile as sf

warnings.filterwarnings('ignore')

class EmotionAnalyzer:
    def __init__(self):
        # Basic settings
        self.sample_rate = 16000
        self.chunk_size = int(self.sample_rate * 3)  # 3-second chunks with overlap
        self.overlap = int(self.sample_rate * 1)     # 1-second overlap
        
        # Initialize model
        print("Loading emotion detection model...")
        self.model_name = "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"
        
        # Load model and move to GPU if available
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = AutoModelForAudioClassification.from_pretrained(self.model_name).to(self.device)
        self.feature_extractor = AutoFeatureExtractor.from_pretrained(self.model_name)
        self.model.eval()
        
        # Emotion labels
        self.emotions = ['angry', 'calm', 'disgust', 'fearful', 'happy', 'neutral', 'sad', 'surprised']
        print(f"Model loaded on {self.device}")

    def load_audio(self, file_path: str) -> np.ndarray:
        """Load audio file with proper resampling"""
        audio, sr = librosa.load(file_path, sr=self.sample_rate)
        return audio

    def preprocess_audio(self, audio: np.ndarray) -> np.ndarray:
        """Clean and normalize audio"""
        try:
            # Remove silence from start and end
            trimmed_audio, _ = librosa.effects.trim(audio, top_db=20)
            
            # Normalize volume
            normalized_audio = librosa.util.normalize(trimmed_audio)
            
            return normalized_audio
        except Exception as e:
            print(f"Preprocessing error: {e}")
            return audio

    def split_into_chunks(self, audio: np.ndarray) -> List[np.ndarray]:
        """Split audio into overlapping chunks"""
        chunks = []
        start = 0
        
        while start < len(audio):
            end = start + self.chunk_size
            chunk = audio[start:min(end, len(audio))]
            
            # Pad last chunk if needed
            if len(chunk) < self.chunk_size:
                chunk = np.pad(chunk, (0, self.chunk_size - len(chunk)))
            
            chunks.append(chunk)
            start += self.chunk_size - self.overlap
        
        return chunks

    def get_audio_features(self, audio: np.ndarray) -> Dict:
        """Extract comprehensive audio features"""
        features = {}
        
        try:
            # Temporal features
            rms = librosa.feature.rms(y=audio)[0]
            zcr = librosa.feature.zero_crossing_rate(audio)[0]
            
            # Spectral features
            spec_cent = librosa.feature.spectral_centroid(y=audio, sr=self.sample_rate)[0]
            spec_bw = librosa.feature.spectral_bandwidth(y=audio, sr=self.sample_rate)[0]
            
            # Rhythm features
            tempo, _ = librosa.beat.beat_track(y=audio, sr=self.sample_rate)
            
            features = {
                'volume_mean': float(np.mean(rms)),
                'volume_std': float(np.std(rms)),
                'speech_rate': float(np.mean(zcr)),
                'spectral_centroid': float(np.mean(spec_cent)),
                'spectral_bandwidth': float(np.mean(spec_bw)),
                'tempo': float(tempo)
            }
            
        except Exception as e:
            print(f"Feature extraction error: {e}")
        
        return features

    @torch.no_grad()
    def analyze_chunk(self, chunk: np.ndarray) -> Dict:
        """Analyze a single chunk of audio"""
        try:
            # Extract features for model
            inputs = self.feature_extractor(
                chunk, 
                sampling_rate=self.sample_rate,
                return_tensors="pt",
                padding=True
            )
            
            # Move inputs to device
            inputs = {k: v.to(self.device) for k, v in inputs.items()}
            
            # Get predictions
            outputs = self.model(**inputs)
            predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
            
            return predictions[0].cpu().numpy()
            
        except Exception as e:
            print(f"Chunk analysis error: {e}")
            return np.zeros(len(self.emotions))

    def analyze_audio_file(self, file_path: str) -> Dict:
        """Analyze complete audio file"""
        try:
            # Load and preprocess audio
            audio = self.load_audio(file_path)
            audio = self.preprocess_audio(audio)
            
            # Get audio duration
            duration = len(audio) / self.sample_rate
            
            # Split into chunks
            chunks = self.split_into_chunks(audio)
            
            # Analyze each chunk
            chunk_predictions = []
            for chunk in chunks:
                pred = self.analyze_chunk(chunk)
                chunk_predictions.append(pred)
            
            # Aggregate predictions
            if chunk_predictions:
                avg_predictions = np.mean(chunk_predictions, axis=0)
                
                # Get top 3 emotions
                top3_indices = np.argsort(avg_predictions)[-3:][::-1]
                top3_emotions = [
                    {
                        'emotion': self.emotions[idx],
                        'confidence': float(avg_predictions[idx])
                    }
                    for idx in top3_indices
                ]
                
                # Get audio features
                audio_features = self.get_audio_features(audio)
                
                return {
                    'status': 'success',
                    'duration': duration,
                    'primary_emotion': {
                        'emotion': self.emotions[top3_indices[0]],
                        'confidence': float(avg_predictions[top3_indices[0]])
                    },
                    'top3_emotions': top3_emotions,
                    'audio_features': audio_features,
                    'emotion_distribution': {
                        emotion: float(conf)
                        for emotion, conf in zip(self.emotions, avg_predictions)
                    }
                }
            
            return {'status': 'error', 'message': 'No valid predictions'}
            
        except Exception as e:
            return {
                'status': 'error',
                'message': str(e)
            }

def main():
    # Example usage
    analyzer = EmotionAnalyzer()
    
    # Analyze an audio file
    result = analyzer.analyze_audio_file('path_to_your_audio.wav')
    
    if result['status'] == 'success':
        print(f"\nAudio Duration: {result['duration']:.2f} seconds")
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

if __name__ == "__main__":
    main()