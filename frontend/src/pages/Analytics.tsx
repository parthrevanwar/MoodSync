import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Heart, 
  Target, 
  Zap,
  Award,
  Calendar,
  Globe,
  Smartphone
} from 'lucide-react';

const Analytics: React.FC = () => {
  const moodData = [
    { mood: 'Happy', count: 342, color: '#FFD700' },
    { mood: 'Relaxed', count: 287, color: '#4FC3F7' },
    { mood: 'Excited', count: 234, color: '#FF6B6B' },
    { mood: 'Contemplative', count: 198, color: '#9C27B0' },
    { mood: 'Energetic', count: 165, color: '#4CAF50' },
    { mood: 'Cozy', count: 143, color: '#FF9800' }
  ];

  const weeklyData = [
    { day: 'Mon', sessions: 45, satisfaction: 92 },
    { day: 'Tue', sessions: 52, satisfaction: 89 },
    { day: 'Wed', sessions: 48, satisfaction: 94 },
    { day: 'Thu', sessions: 61, satisfaction: 91 },
    { day: 'Fri', sessions: 78, satisfaction: 96 },
    { day: 'Sat', sessions: 94, satisfaction: 98 },
    { day: 'Sun', sessions: 87, satisfaction: 95 }
  ];

  const platformData = [
    { name: 'Netflix', value: 35, color: '#E50914' },
    { name: 'Disney+', value: 25, color: '#113CCF' },
    { name: 'HBO Max', value: 20, color: '#5B2C87' },
    { name: 'Prime Video', value: 15, color: '#00A8E1' },
    { name: 'Others', value: 5, color: '#6B7280' }
  ];

  const metrics = [
    {
      title: 'Total Sessions',
      value: '2,847',
      change: '+23%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Avg. Session Time',
      value: '2.4h',
      change: '+45%',
      trend: 'up',
      icon: Clock,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Mood Accuracy',
      value: '94.2%',
      change: '+8%',
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'User Satisfaction',
      value: '4.8/5',
      change: '+12%',
      trend: 'up',
      icon: Heart,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const achievements = [
    {
      title: 'Mood Master',
      description: 'Perfect mood detection for 7 days straight',
      icon: Target,
      color: 'from-purple-500 to-indigo-500',
      unlocked: true
    },
    {
      title: 'Social Butterfly',
      description: 'Host 50 watch parties',
      icon: Users,
      color: 'from-pink-500 to-rose-500',
      unlocked: true
    },
    {
      title: 'Binge Expert',
      description: 'Watch content for 100+ hours',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      unlocked: false
    },
    {
      title: 'Global Explorer',
      description: 'Watch content from 10+ countries',
      icon: Globe,
      color: 'from-green-500 to-teal-500',
      unlocked: true
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Viewing <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Analytics</span>
          </h1>
          <p className="text-xl text-gray-300">
            Insights into your mood patterns and viewing habits
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-gray-400 text-sm">{metric.title}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-purple-400" />
              Weekly Activity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" tick={{ fill: '#D1D5DB' }} />
                <YAxis tick={{ fill: '#D1D5DB' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="sessions" fill="url(#gradientBar)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Satisfaction Trend */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
              Satisfaction Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" tick={{ fill: '#D1D5DB' }} />
                <YAxis tick={{ fill: '#D1D5DB' }} domain={[85, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Mood Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-3 text-pink-400" />
              Mood Distribution
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {moodData.map((mood, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-4 text-center"
                >
                  <div 
                    className="w-8 h-8 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: mood.color }}
                  />
                  <div className="text-white font-semibold">{mood.count}</div>
                  <div className="text-gray-400 text-sm">{mood.mood}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Platform Usage */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Smartphone className="w-6 h-6 mr-3 text-blue-400" />
              Platform Usage
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Award className="w-8 h-8 mr-3 text-yellow-400" />
            Your Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 text-center relative ${
                    achievement.unlocked 
                      ? 'border-yellow-500/30 bg-yellow-500/5' 
                      : 'border-white/10 opacity-60'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{achievement.title}</h4>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                  {achievement.unlocked && (
                    <div className="mt-3 text-yellow-400 text-sm font-medium">
                      ✨ Unlocked!
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-3xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            🎯 Personal Insights
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="text-purple-400 font-semibold mb-2">Peak Viewing Time</h4>
              <p className="text-gray-300">You're most active on weekend evenings, with 89% higher engagement.</p>
            </div>
            <div>
              <h4 className="text-pink-400 font-semibold mb-2">Mood Pattern</h4>
              <p className="text-gray-300">Happy moods lead to 2.3x longer viewing sessions and higher satisfaction.</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2">Social Impact</h4>
              <p className="text-gray-300">Group viewing increases enjoyment by 40% compared to solo sessions.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;