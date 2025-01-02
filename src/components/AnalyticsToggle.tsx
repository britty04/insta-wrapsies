import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";

interface AnalyticsToggleProps {
  activeView: "insights" | "analytics";
  setActiveView: (view: "insights" | "analytics") => void;
}

export const AnalyticsToggle = ({ activeView, setActiveView }: AnalyticsToggleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center mb-8"
    >
      <ToggleGroup type="single" value={activeView} onValueChange={(value) => setActiveView(value as "insights" | "analytics")}>
        <ToggleGroupItem 
          value="insights" 
          className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-instagram-purple to-instagram-pink data-[state=on]:text-white data-[state=on]:bg-opacity-100 data-[state=off]:bg-opacity-50"
        >
          Account Insights
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="analytics" 
          className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-instagram-pink to-instagram-orange data-[state=on]:text-white data-[state=on]:bg-opacity-100 data-[state=off]:bg-opacity-50"
        >
          Analytics Overview
        </ToggleGroupItem>
      </ToggleGroup>
    </motion.div>
  );
};