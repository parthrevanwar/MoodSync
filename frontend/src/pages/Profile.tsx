import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Heart,
  Clock,
  Users,
  Star,
  Edit,
  Save,
  Camera,
  Smartphone,
  Tv,
  Volume2
} from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    location: 'San Francisco, CA',
    bio: 'Movie enthusiast who loves discovering new content based on mood. Always up for a good watch party!',
    favoriteGenres: ['Comedy', 'Sci-Fi', 'Drama', 'Animation'],
    preferredMoods: ['Happy', 'Relaxed', 'Excited']
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    autoDetectMood: true,
    socialSharing: true,
    darkMode: true,
    language: 'English',
    region: 'US'
  });

  const stats = [
    { label: 'Total Watch Time', value: '234h', icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { label: 'Mood Matches', value: '1,247', icon: Heart, color: 'from-red-500 to-pink-500' },
    { label: 'Social Sessions', value: '89', icon: Users, color: 'from-green-500 to-teal-500' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'from-yellow-500 to-orange-500' }
  ];

  const devices = [
    { name: 'Fire TV Stick 4K', type: 'Primary', icon: Tv, status: 'Connected', lastUsed: '2 hours ago' },
    { name: 'iPhone 14 Pro', type: 'Mobile', icon: Smartphone, status: 'Connected', lastUsed: '5 minutes ago' },
    { name: 'Samsung Smart TV', type: 'Secondary', icon: Tv, status: 'Offline', lastUsed: '2 days ago' }
  ];

  const moodHistory = [
    { date: 'Today', moods: ['Happy', 'Excited', 'Relaxed'] },
    { date: 'Yesterday', moods: ['Contemplative', 'Cozy'] },
    { date: '2 days ago', moods: ['Energetic', 'Happy', 'Excited'] }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-xl text-gray-300">
            Manage your preferences and view your MoodSync journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop"
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <button className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center font-semibold text-xl"
                    />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-300 text-center"
                    />
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-400 text-center"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">{profile.name}</h2>
                    <p className="text-gray-300 mb-2">{profile.email}</p>
                    <p className="text-gray-400 text-sm">{profile.location}</p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-300 text-sm resize-none h-20"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-300 text-sm">{profile.bio}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{stat.label}</span>
                      </div>
                      <span className="text-white font-semibold">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-purple-400" />
                Preferences
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications}
                        onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-pink-400" />
                      <span className="text-white">Auto-Detect Mood</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.autoDetectMood}
                        onChange={(e) => setPreferences({ ...preferences, autoDetectMood: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-400" />
                      <span className="text-white">Social Sharing</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.socialSharing}
                        onChange={(e) => setPreferences({ ...preferences, socialSharing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-3 text-white mb-2">
                      <Globe className="w-5 h-5 text-cyan-400" />
                      <span>Language</span>
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3 text-white mb-2">
                      <Shield className="w-5 h-5 text-orange-400" />
                      <span>Region</span>
                    </label>
                    <select
                      value={preferences.region}
                      onChange={(e) => setPreferences({ ...preferences, region: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connected Devices */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Tv className="w-6 h-6 mr-3 text-blue-400" />
                Connected Devices
              </h3>
              
              <div className="space-y-4">
                {devices.map((device, index) => {
                  const Icon = device.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{device.name}</div>
                          <div className="text-gray-400 text-sm">{device.type} • Last used {device.lastUsed}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          device.status === 'Connected' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {device.status}
                        </span>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Mood History */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-pink-400" />
                Recent Mood History
              </h3>
              
              <div className="space-y-4">
                {moodHistory.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300 font-medium">{day.date}</span>
                    <div className="flex items-center space-x-2">
                      {day.moods.map((mood, moodIndex) => (
                        <span
                          key={moodIndex}
                          className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                        >
                          {mood}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;