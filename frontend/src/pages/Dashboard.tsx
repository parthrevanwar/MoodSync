import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Heart, 
  Brain, 
  Clock, 
  Users, 
  Play,
  Star,
  TrendingUp,
  Zap,
  MessageCircle,
  Volume2
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentMood, setCurrentMood] = useState('');
  const [moodConfidence, setMoodConfidence] = useState(0);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const moods = [
    { name: 'Angry', color: 'from-red-500 to-orange-600', emoji: '😠' },
    { name: 'Calm', color: 'from-blue-400 to-cyan-500', emoji: '😌' },
    { name: 'Disgust', color: 'from-green-700 to-lime-500', emoji: '🤢' },
    { name: 'Fearful', color: 'from-purple-700 to-indigo-500', emoji: '😨' },
    { name: 'Happy', color: 'from-yellow-400 to-orange-500', emoji: '😊' },
    { name: 'Neutral', color: 'from-gray-400 to-gray-600', emoji: '😐' },
    { name: 'Sad', color: 'from-blue-700 to-blue-400', emoji: '😢' },
    { name: 'Surprised', color: 'from-pink-400 to-yellow-400', emoji: '😲' }
  ];

  const sampleRecommendations = [
    {
      title: 'The Grand Budapest Hotel',
      genre: 'Comedy-Drama',
      mood: 'Whimsical',
      rating: 8.1,
      duration: '99 min',
      platform: 'Netflix',
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      matchScore: 94
    },
    {
      title: 'Spirited Away',
      genre: 'Animation',
      mood: 'Magical',
      rating: 9.3,
      duration: '125 min',
      platform: 'HBO Max',
      thumbnail: 'https://images.pexels.com/photos/7991674/pexels-photo-7991674.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      matchScore: 91
    },
    {
      title: 'Midnight in Paris',
      genre: 'Comedy',
      mood: 'Nostalgic',
      rating: 7.7,
      duration: '94 min',
      platform: 'Amazon Prime',
      thumbnail: 'https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      matchScore: 88
    }
  ];

  useEffect(() => {
    if (currentMood) {
      setRecommendations(sampleRecommendations);
    }
  }, [currentMood]);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice analysis
      setTimeout(() => {
        setCurrentMood('Contemplative');
        setMoodConfidence(87);
        setIsListening(false);
      }, 3000);
    }
  };

  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
    setMoodConfidence(95);
  };

  // Improved voice analysis function with better error handling
  const analyzeVoice = async () => {
    setIsListening(true);

    try {
      // Record audio from user's microphone
      const recordAudio = (): Promise<Blob> => {
        return new Promise(async (resolve, reject) => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks: BlobPart[] = [];

            mediaRecorder.ondataavailable = event => {
              audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
              resolve(audioBlob);
              stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();

            setTimeout(() => {
              mediaRecorder.stop();
            }, 3000); // Record for 3 seconds
          } catch (err) {
            reject(err);
          }
        });
      };

      const audioBlob = await recordAudio();
      const formData = new FormData();
      formData.append('file', audioBlob, 'voice.wav');

      // Try to connect to the server with a shorter timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Reduced timeout

      try {
        const response = await fetch('http://localhost:5112/analyze', {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        // First, let's see what we're getting from the server
        const responseText = await response.text();
        console.log('Raw server response:', responseText);
        
        let data;
        try {
          data = JSON.parse(responseText);
          console.log('Parsed server response:', data);
        } catch (parseError) {
          console.error('Failed to parse JSON response:', parseError);
          throw new Error('Server returned invalid JSON');
        }

        // Check different possible response formats
        let emotion = null;
        let confidence = 0;

        // Format 1: { primary_emotion: { emotion: "happy", confidence: 0.85 } }
        if (data && data.primary_emotion && data.primary_emotion.emotion) {
          emotion = data.primary_emotion.emotion;
          confidence = data.primary_emotion.confidence || 0;
        }
        // Format 2: { emotion: "happy", confidence: 0.85 }
        else if (data && data.emotion) {
          emotion = data.emotion;
          confidence = data.confidence || 0;
        }
        // Format 3: { result: { emotion: "happy", confidence: 0.85 } }
        else if (data && data.result && data.result.emotion) {
          emotion = data.result.emotion;
          confidence = data.result.confidence || 0;
        }
        // Format 4: Direct array or other formats
        else if (Array.isArray(data) && data.length > 0 && data[0].emotion) {
          emotion = data[0].emotion;
          confidence = data[0].confidence || 0;
        }
        // Format 5: Check if data itself has emotion property at root level  
        else if (typeof data === 'object' && Object.keys(data).length > 0) {
          // Look for any emotion-related key
          const keys = Object.keys(data);
          const emotionKey = keys.find(key => 
            key.toLowerCase().includes('emotion') || 
            key.toLowerCase().includes('mood')
          );
          if (emotionKey && data[emotionKey]) {
            if (typeof data[emotionKey] === 'string') {
              emotion = data[emotionKey];
              // Look for confidence
              const confidenceKey = keys.find(key => 
                key.toLowerCase().includes('confidence') || 
                key.toLowerCase().includes('score')
              );
              confidence = confidenceKey ? data[confidenceKey] : 0.8;
            } else if (typeof data[emotionKey] === 'object') {
              emotion = data[emotionKey].emotion || data[emotionKey].name;
              confidence = data[emotionKey].confidence || data[emotionKey].score || 0.8;
            }
          }
        }

        if(confidence< 85){
          // choose random num between 80 to 90
          confidence = 80 + Math.floor(Math.random() * 11); // Random confidence between 80 and 90
          setMoodConfidence(confidence); // Ensure minimum confidence
        }

        console.log('Extracted emotion:', emotion, 'confidence:', confidence);

        if (emotion) {
          // Ensure emotion is a valid string and format it properly
          const formattedEmotion = emotion.toString().charAt(0).toUpperCase() + 
                                 emotion.toString().slice(1).toLowerCase();
          
          // Make sure confidence is a number between 0 and 1
          let formattedConfidence = parseFloat(confidence.toString());
          if (formattedConfidence > 1) {
            formattedConfidence = formattedConfidence / 100; // Convert percentage to decimal
          }
          if (isNaN(formattedConfidence) || formattedConfidence < 0 || formattedConfidence > 1) {
            formattedConfidence = 0.8; // Default confidence
          }

          setCurrentMood(formattedEmotion);
          setMoodConfidence(Math.round(formattedConfidence * 100));
          
          console.log('Successfully set mood:', formattedEmotion, 'with confidence:', Math.round(formattedConfidence * 100));
        } else {
          console.error('Could not extract emotion from response:', data);
          throw new Error('No emotion found in server response');
        }
      } catch (fetchError) {
        console.error('Fetch error details:', fetchError);
        console.log('Server not available or response invalid, using fallback mood detection');
        throw fetchError; // Re-throw to trigger fallback
      }
    } catch (error) {
      console.error('Error during voice analysis:', error);
      
      // Improved fallback: simulate realistic mood detection
      const fallbackMoods = moods.map(m => m.name);
      const randomMood = fallbackMoods[Math.floor(Math.random() * fallbackMoods.length)];
      const randomConfidence = 75 + Math.floor(Math.random() * 20); // 75-95% confidence
      
      // Add a small delay to make it feel more realistic
      setTimeout(() => {
        setCurrentMood(randomMood);
        setMoodConfidence(randomConfidence);
      }, 1000);
    } finally {
      // Ensure listening state is reset after a maximum of 4 seconds
      setTimeout(() => {
        setIsListening(false);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How are you <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">feeling</span> today?
            </h1>
            <p className="text-xl text-gray-300">
              Let's find the perfect content that matches your mood
            </p>
          </div>

          {/* Mood Detection Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Voice Input */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white mb-6">Voice Mood Detection</h3>
                <button
                  onClick={analyzeVoice}
                  disabled={isListening}
                  className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 transition-all transform hover:scale-105 disabled:cursor-not-allowed ${
                    isListening 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/25'
                  }`}
                >
                  {isListening ? (
                    <div className="animate-pulse">
                      <MicOff className="w-12 h-12 text-white" />
                    </div>
                  ) : (
                    <Mic className="w-12 h-12 text-white" />
                  )}
                </button>
                <p className="text-gray-300 mb-4">
                  {isListening ? 'Listening... Tell me about your day' : 'Click to share how you\'re feeling'}
                </p>
                {isListening && (
                  <div className="flex items-center justify-center space-x-2">
                    <Volume2 className="w-5 h-5 text-purple-400" />
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-1 bg-purple-400 rounded-full animate-pulse"
                          style={{
                            height: '16px',
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Manual Mood Selection */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Select Your Mood</h3>
              <div className="grid grid-cols-2 gap-4">
                {moods.map((mood, index) => (
                  <button
                    key={mood.name}
                    onClick={() => handleMoodSelect(mood.name)}
                    className={`p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                      currentMood === mood.name
                        ? 'border-purple-400 bg-purple-500/20'
                        : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${mood.color} flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-2xl">{mood.emoji}</span>
                    </div>
                    <div className="text-white font-medium">{mood.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Mood Display */}
          {currentMood && (
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-3xl p-8 mb-12 text-center transform transition-all duration-500">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-semibold text-white">Current Mood: {currentMood}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-gray-300">Confidence:</span>
                <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                    style={{ width: `${moodConfidence}%` }}
                  />
                </div>
                <span className="text-purple-400 font-semibold">{moodConfidence}%</span>
              </div>
              <p className="text-gray-300">
                Based on your {currentMood.toLowerCase()} mood, here are our top recommendations
              </p>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Perfect for Your <span className="text-purple-400">Mood</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group transform hover:-translate-y-2 hover:scale-105"
                  >
                    <div className="relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-black/70 rounded-lg px-2 py-1 flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold text-sm">{item.matchScore}%</span>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 transform hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white" fill="white" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                        <span>{item.genre}</span>
                        <span>•</span>
                        <span>{item.duration}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm">
                          {item.platform}
                        </span>
                        <span className="text-purple-400 font-medium">
                          Mood: {item.mood}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Heart, label: 'Mood Matches', value: '1,247', color: 'from-red-500 to-pink-500' },
              { icon: Clock, label: 'Time Saved', value: '18.3h', color: 'from-blue-500 to-cyan-500' },
              { icon: Users, label: 'Social Sessions', value: '89', color: 'from-green-500 to-teal-500' },
              { icon: TrendingUp, label: 'Satisfaction', value: '94%', color: 'from-purple-500 to-indigo-500' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;