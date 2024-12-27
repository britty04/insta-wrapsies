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
        "backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl",
        "transform transition-all hover:scale-105 hover:bg-white/10",
        "relative overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-instagram-purple/10 via-instagram-pink/10 to-instagram-orange/10 opacity-50" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2 text-white/90">{title}</h3>
        <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-instagram-purple to-instagram-orange bg-clip-text text-transparent">
          {value}
        </p>
        {description && (
          <p className="text-sm text-white/70">{description}</p>
        )}
      </div>
    </motion.div>
  );
};