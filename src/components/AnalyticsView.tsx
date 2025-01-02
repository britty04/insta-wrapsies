import { StatsCard } from "./StatsCard";
import { motion } from "framer-motion";

export const AnalyticsView = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
    >
      <StatsCard
        title="Total Liked Posts"
        value="847"
        description="Posts you've liked across Instagram"
      />
      <StatsCard
        title="Monthly Usage"
        value="2.3 hrs"
        description="Average daily time spent"
      />
      <StatsCard
        title="Comments Made"
        value="126"
        description="Total comments on other posts"
      />
      <StatsCard
        title="Saved Posts"
        value="234"
        description="Posts you've bookmarked"
      />
    </motion.div>
  );
};