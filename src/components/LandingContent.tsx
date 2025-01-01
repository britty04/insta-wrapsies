import { motion } from "framer-motion";
import { Instagram, Users, Camera, Heart, MessageCircle, Share2, Sparkles, TrendingUp, Lock } from "lucide-react";

export const LandingContent = () => {
  return (
    <div className="space-y-24 py-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent">
            Your Instagram Story
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover your Instagram journey through beautiful insights and shareable stats. See how you've grown and engaged with your community throughout 2024.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Users className="w-8 h-8" />,
            title: "Engagement Analytics",
            description: "Track your interactions and engagement patterns"
          },
          {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Growth Insights",
            description: "Visualize your Instagram journey and progress"
          },
          {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Beautiful Stats",
            description: "Get shareable, aesthetically pleasing insights"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
          >
            <div className="bg-gradient-to-br from-instagram-purple to-instagram-pink p-4 rounded-xl w-fit mb-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
            <p className="text-lg text-white/70">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* How It Works */}
      <section className="text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              icon: <Instagram className="w-6 h-6" />,
              title: "Enter Username",
              description: "Simply enter your Instagram handle to begin"
            },
            {
              step: "2",
              icon: <Lock className="w-6 h-6" />,
              title: "Verify Account",
              description: "Confirm your public Instagram profile"
            },
            {
              step: "3",
              icon: <Share2 className="w-6 h-6" />,
              title: "Share Insights",
              description: "Download and share your personalized stats"
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-instagram-purple/20 via-instagram-pink/20 to-instagram-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-instagram-purple to-instagram-pink flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};