import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Target, 
  Clock, 
  Users, 
  Repeat, 
  Mic, 
  Smartphone, 
  Globe,
  ArrowRight,
  Play,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: 'Mood-Based Recommendations',
      description: 'AI analyzes your emotions to suggest perfect content matches',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Circadian Analysis',
      description: 'Behavioral pattern analysis for optimal viewing times',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Social Consensus',
      description: 'Multi-user system for group content decisions',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Repeat,
      title: 'Cross-Platform',
      description: 'Content aggregation across all streaming platforms',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Mic,
      title: 'Voice Integration',
      description: 'Seamless Alexa integration for hands-free control',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Companion',
      description: 'Remote control and mood input via mobile app',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Globe,
      title: 'Multi-Lingual',
      description: 'Global support with cultural adaptation',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Lightning-fast recommendations in seconds',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const metrics = [
    { value: '89%', label: 'Reduced Discovery Time', icon: Clock },
    { value: '45%', label: 'Longer Viewing Sessions', icon: TrendingUp },
    { value: '60%', label: 'Cross-Platform Usage', icon: Repeat },
    { value: '35%', label: 'Improved Retention', icon: Award }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Social Streamer',
      content: 'MoodSync eliminated our endless scrolling. Now we find perfect movies for our group in seconds!',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Family Coordinator',
      content: 'Finally, a solution that considers everyone\'s mood and preferences. Movie nights are stress-free now.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      name: 'Emma Thompson',
      role: 'Overwhelmed Browser',
      content: 'The mood detection is incredible. It knows exactly what I need to watch based on my day.',
      avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-slate-900/80" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                MoodSync
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Revolutionary mood-aware content recommendation system that eliminates decision fatigue 
              and delivers emotionally aligned viewing experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Watching</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Streaming <span className="text-red-400">Problem</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Current platforms waste your time with context-blind recommendations and endless browsing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Content Discovery Paradox',
                description: 'Users waste 18 minutes browsing despite having access to millions of titles',
                stat: '18 min',
                statLabel: 'Average Browse Time'
              },
              {
                title: 'Context-Blind Recommendations',
                description: 'No consideration for mood, time of day, or social context',
                stat: '73%',
                statLabel: 'Users Dissatisfied'
              },
              {
                title: 'Isolated Viewing',
                description: 'Limited social features confined to single platforms',
                stat: '2.3x',
                statLabel: 'More Enjoyable Together'
              }
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/20 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-red-400 mb-2">{problem.stat}</div>
                <div className="text-sm text-red-300 mb-4">{problem.statLabel}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{problem.title}</h3>
                <p className="text-gray-300">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Solution</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionary features that transform how you discover and enjoy content
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proven <span className="text-green-400">Impact</span>
            </h2>
            <p className="text-xl text-gray-300">
              Real results from beta users and market research
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8 mb-4">
                    <Icon className="w-8 h-8 text-green-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-green-400 mb-2">{metric.value}</div>
                    <div className="text-gray-300">{metric.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Users <span className="text-blue-400">Say</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-3xl p-12 backdrop-blur-sm"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Viewing Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who've eliminated decision fatigue forever
            </p>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 mx-auto shadow-lg"
              >
                <Heart className="w-5 h-5" />
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;