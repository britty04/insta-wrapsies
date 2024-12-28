import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
}

export const StatsCard = ({ title, value, description, className }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "backdrop-blur-md bg-black/40 rounded-2xl p-6",
        "transform transition-all hover:scale-105",
        "relative overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-instagram-purple/20 via-instagram-pink/20 to-instagram-orange/20" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-4xl font-bold mb-2 text-white">
          {value}
        </p>
        {description && (
          <p className="text-sm text-white/90">{description}</p>
        )}
      </div>
    </motion.div>
  );
};