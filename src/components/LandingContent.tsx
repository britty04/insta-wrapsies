import { motion } from "framer-motion";
import { Users, Camera, Heart, MessageCircle, Share2, Sparkles, TrendingUp, Lock, Laugh } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
          <div className="relative w-32 h-32 mx-auto mb-8">
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzk4YTJkNjFkNmY5ZmU4ZjJlZWJiZTM4ZjM5ZmM4ZmM1ZjI4ZjZhYiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l0HlvcRyVJeO8Gmju/giphy.gif" 
              alt="Instagram Meme"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent">
            Your Instagram Story
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Ready to see your Instagram journey? Let's make it fun! 🚀
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Users className="w-8 h-8" />,
            title: "Engagement Analytics",
            description: "Track your interactions and meme game 🎮"
          },
          {
            icon: <Laugh className="w-8 h-8" />,
            title: "Meme Stats",
            description: "See how many people you've made laugh 😂"
          },
          {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Beautiful Stats",
            description: "Get shareable, meme-worthy insights ✨"
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
    </div>
  );
};