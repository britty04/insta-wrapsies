import { motion } from "framer-motion";
import { Instagram, Users, Camera, Heart, MessageCircle, Share2, Sparkles, TrendingUp, Lock, Laugh } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd5Z2g4Y3E2NXJ1..." 
              alt="Instagram Meme"
              className="rounded-full object-cover animate-bounce"
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

      {/* Fun Stats Slider */}
      <section className="max-w-4xl mx-auto">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Fun Fact-O-Meter</h3>
            <div className="space-y-8">
              <div>
                <p className="text-white/80 mb-2">Meme Energy Level</p>
                <Slider defaultValue={[75]} max={100} step={1} />
              </div>
              <div>
                <p className="text-white/80 mb-2">Viral Potential</p>
                <Slider defaultValue={[88]} max={100} step={1} />
              </div>
            </div>
          </CardContent>
        </Card>
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

      {/* Meme Gallery */}
      <section className="text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Meme Hall of Fame</h2>
        <ScrollArea className="h-[400px] w-full rounded-md border border-white/10 p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <img
                  src={`https://picsum.photos/400/400?random=${i}`}
                  alt={`Meme ${i + 1}`}
                  className="object-cover w-full h-full transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </section>
    </div>
  );
};