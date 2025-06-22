import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Video, Mic, MicOff, VideoOff, Phone, PhoneOff, Send, Heart, Laugh, Sunrise as Surprised, ThumbsUp, Play, Pause, Volume2, Settings, UserPlus, Crown } from 'lucide-react';

const SocialViewing: React.FC = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const participants = [
    {
      id: 1,
      name: 'You',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      isHost: true,
      mood: 'Excited',
      isOnline: true
    },
    {
      id: 2,
      name: 'Sarah',
      avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      isHost: false,
      mood: 'Happy',
      isOnline: true
    },
    {
      id: 3,
      name: 'Mike',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      isHost: false,
      mood: 'Relaxed',
      isOnline: true
    },
    {
      id: 4,
      name: 'Emma',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      isHost: false,
      mood: 'Cozy',
      isOnline: false
    }
  ];

  const currentMovie = {
    title: 'The Grand Budapest Hotel',
    duration: '1:39:00',
    currentTime: '0:45:32',
    progress: 45.8
  };

  const sampleMessages = [
    { id: 1, user: 'Sarah', message: 'This movie is absolutely gorgeous! 😍', timestamp: '10:42 PM', reaction: 'heart' },
    { id: 2, user: 'Mike', message: 'Wes Anderson\'s cinematography is unmatched', timestamp: '10:43 PM' },
    { id: 3, user: 'You', message: 'The color palette is incredible!', timestamp: '10:44 PM', reaction: 'thumbs-up' },
    { id: 4, user: 'Sarah', message: 'Ralph Fiennes is hilarious in this', timestamp: '10:45 PM', reaction: 'laugh' }
  ];

  useEffect(() => {
    setMessages(sampleMessages);
  }, []);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setChatMessage('');
    }
  };

  const reactions = [
    { icon: Heart, label: 'Love', color: 'text-red-500' },
    { icon: Laugh, label: 'Funny', color: 'text-yellow-500' },
    { icon: Surprised, label: 'Wow', color: 'text-blue-500' },
    { icon: ThumbsUp, label: 'Like', color: 'text-green-500' }
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Social <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Watch Party</span>
          </h1>
          <p className="text-gray-300">Watch together, chat in real-time, and share reactions</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Video Player */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black rounded-2xl overflow-hidden mb-6 relative"
            >
              {/* Video Player */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
                <img
                  src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop"
                  alt="Movie Scene"
                  className="w-full h-full object-cover"
                />
                
                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4"
                  >
                    {isPlaying ? (
                      <Pause className="w-12 h-12 text-white" fill="white" />
                    ) : (
                      <Play className="w-12 h-12 text-white" fill="white" />
                    )}
                  </motion.button>
                </div>

                {/* Live Reactions */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 50 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0, y: -50 }}
                      transition={{ delay: i * 0.5 }}
                      className="bg-black/70 rounded-full p-2"
                    >
                      <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Player Controls */}
              <div className="bg-black/90 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">{currentMovie.title}</h3>
                  <div className="text-gray-400 text-sm">
                    {currentMovie.currentTime} / {currentMovie.duration}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentMovie.progress}%` }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <Volume2 className="w-6 h-6 text-white" />
                    <div className="w-20 h-1 bg-gray-700 rounded-full">
                      <div className="w-3/4 h-full bg-purple-500 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Settings className="w-6 h-6 text-white hover:text-purple-400 cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reaction Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Quick Reactions</span>
                <div className="flex items-center space-x-2">
                  {reactions.map((reaction, index) => {
                    const Icon = reaction.icon;
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${reaction.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Participants ({participants.filter(p => p.isOnline).length})
                </h3>
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  <UserPlus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                      participant.isOnline ? 'bg-white/5' : 'bg-gray-500/20'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className={`w-10 h-10 rounded-full ${
                          participant.isOnline ? '' : 'grayscale opacity-50'
                        }`}
                      />
                      {participant.isHost && (
                        <Crown className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                      )}
                      {participant.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${participant.isOnline ? 'text-white' : 'text-gray-500'}`}>
                        {participant.name}
                      </div>
                      <div className={`text-sm ${participant.isOnline ? 'text-purple-400' : 'text-gray-600'}`}>
                        {participant.mood}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Call Controls */}
              <div className="flex items-center justify-center space-x-3 mt-6 pt-6 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-full transition-colors ${
                    isMicOn ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full transition-colors ${
                    isVideoOn ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-red-500 text-white"
                >
                  <PhoneOff className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Chat */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-semibold flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Live Chat
                </h3>
              </div>
              
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        message.user === 'You' ? 'text-purple-400' : 'text-gray-300'
                      }`}>
                        {message.user}
                      </span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-white text-sm">{message.message}</p>
                      {message.reaction && (
                        <div className="flex items-center space-x-1">
                          {reactions.find(r => r.label.toLowerCase() === message.reaction)?.icon && (
                            React.createElement(
                              reactions.find(r => r.label.toLowerCase() === message.reaction)!.icon,
                              { className: `w-4 h-4 ${reactions.find(r => r.label.toLowerCase() === message.reaction)!.color}` }
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chat Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialViewing;