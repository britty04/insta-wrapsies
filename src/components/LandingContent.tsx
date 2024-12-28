import { motion } from "framer-motion";
import { Instagram, Users, Camera, Heart, MessageCircle, Share2 } from "lucide-react";

export const LandingContent = () => {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Discover Your Instagram Journey
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Get detailed insights about your Instagram activity, engagement patterns, and growth trends throughout 2024.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Users className="w-8 h-8" />,
            title: "Audience Insights",
            description: "Understand your follower growth and engagement patterns"
          },
          {
            icon: <Camera className="w-8 h-8" />,
            title: "Content Analysis",
            description: "See which of your posts performed the best"
          },
          {
            icon: <Heart className="w-8 h-8" />,
            title: "Engagement Metrics",
            description: "Track likes, comments, and overall engagement"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <div className="bg-gradient-to-br from-instagram-purple to-instagram-pink p-3 rounded-lg w-fit mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* How It Works */}
      <section className="text-center space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Enter Username",
              description: "Simply enter your Instagram username to get started"
            },
            {
              step: "2",
              title: "Verify Account",
              description: "Confirm your public Instagram profile"
            },
            {
              step: "3",
              title: "Get Insights",
              description: "View and download your personalized stats"
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-instagram-purple to-instagram-pink flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">{step.step}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-white/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};