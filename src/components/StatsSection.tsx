import { motion } from "framer-motion";
import { StatsCard } from "@/components/StatsCard";
import { InstagramProfile } from "@/components/InstagramProfile";
import { GradientButton } from "@/components/GradientButton";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { AnalyticsToggle } from "./AnalyticsToggle";
import { AnalyticsView } from "./AnalyticsView";
import { NewYearPopup } from "./NewYearPopup";
import { Footer } from "./Footer";

interface StatsSectionProps {
  username: string;
  stats: any;
  profileData: any;
  handleShare: () => void;
}

export const StatsSection = ({ username, stats, profileData, handleShare }: StatsSectionProps) => {
  const [activeView, setActiveView] = useState<"insights" | "analytics">("insights");
  const [showNewYearPopup, setShowNewYearPopup] = useState(false);

  useEffect(() => {
    // Show the popup after a short delay
    const timer = setTimeout(() => {
      setShowNewYearPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <InstagramProfile 
        username={username}
        isPrivate={profileData.isPrivate}
        profilePicUrl={profileData.profilePicUrl}
        followers={profileData.followers}
        following={profileData.following}
        posts={profileData.posts}
      />
      
      <AnalyticsToggle activeView={activeView} setActiveView={setActiveView} />
      
      {activeView === "insights" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatsCard
            title="Weekly Activity"
            value="4 days"
            description="Your average active days per week"
          />
          <StatsCard
            title="Engagement Rate"
            value="2.8%"
            description="Your average engagement per post"
          />
          <StatsCard
            title="Best Time to Post"
            value="6:00 PM"
            description="When your audience is most active"
          />
          <StatsCard
            title="Top Content Type"
            value="Reels"
            description="Your most engaging content format"
          />
        </div>
      ) : (
        <AnalyticsView />
      )}
      
      <div className="text-center" data-download-button>
        <GradientButton 
          onClick={handleShare}
          className="text-lg px-8 py-4"
        >
          Download Insights
        </GradientButton>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12"
      >
        <Card className="overflow-hidden bg-black/40 backdrop-blur-sm border-white/10">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM0YjBjMzQyMTQ5ZWM5ZTJiZDM4ZDM4ZWJjNzU0ZmQ5ZTI5ZjE3YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oEjHAUOqG3lSS0f1C/giphy.gif" 
            alt="Celebration GIF"
            className="w-full h-auto rounded-lg"
          />
        </Card>
      </motion.div>

      <NewYearPopup open={showNewYearPopup} onOpenChange={setShowNewYearPopup} />
      
      <Footer />
    </motion.div>
  );
};