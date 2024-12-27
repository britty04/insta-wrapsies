import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
}

export const StatsCard = ({ title, value, description, className }: StatsCardProps) => {
  return (
    <div
      className={cn(
        "backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl",
        "transform transition-all hover:scale-105",
        "animate-fade-in",
        className
      )}
    >
      <h3 className="text-xl font-semibold mb-2 text-white/90">{title}</h3>
      <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-instagram-purple to-instagram-orange bg-clip-text text-transparent">
        {value}
      </p>
      {description && (
        <p className="text-sm text-white/70">{description}</p>
      )}
    </div>
  );
};