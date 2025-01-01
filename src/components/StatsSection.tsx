import { motion } from "framer-motion";
import { StatsCard } from "@/components/StatsCard";
import { InstagramProfile } from "@/components/InstagramProfile";
import { GradientButton } from "@/components/GradientButton";

interface StatsSectionProps {
  username: string;
  stats: any;
  profileData: any;
  handleShare: () => void;
}

export const StatsSection = ({ username, stats, profileData, handleShare }: StatsSectionProps) => {
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
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatsCard
          title="Active Days"
          value={stats.activeDays}
          description="You were active on Instagram for this many days in 2024"
        />
        <StatsCard
          title="Posts Liked"
          value={stats.postsLiked.toLocaleString()}
          description="You spread love through likes"
        />
        <StatsCard
          title="Stories Watched"
          value={stats.storiesWatched.toLocaleString()}
          description="You kept up with your friends' daily moments"
        />
        <StatsCard
          title="Peak Activity"
          value={stats.peakHour}
          description="Your most active hour on Instagram"
        />
      </div>
      
      <div className="text-center" data-download-button>
        <GradientButton 
          onClick={handleShare}
          className="text-lg px-8 py-4"
        >
          Download Card
        </GradientButton>
      </div>
    </motion.div>
  );
};