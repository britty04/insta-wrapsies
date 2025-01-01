import { useState } from "react";
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/GradientButton";
import { Instagram, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SearchSectionProps {
  username: string;
  setUsername: (username: string) => void;
  handleStart: () => void;
  isVerifying: boolean;
  isLoading: boolean;
}

export const SearchSection = ({ username, setUsername, handleStart, isVerifying, isLoading }: SearchSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto space-y-4"
    >
      <div className="relative">
        <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-40 h-40">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM5YzBkZjY5ZTM4ZTBhZGNiZDM4ZjM5Y2JlZGNiOWM0ZTY4ZjZhYiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/xT0GqimU9HSdMNQ2A0/giphy.gif" 
            alt="Meme"
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>
        <Input
          type="text"
          placeholder="Enter your Instagram username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-center pl-10 bg-white/5 border-white/10 text-white"
          disabled={isVerifying || isLoading}
        />
        <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
      </div>
      <GradientButton 
        onClick={handleStart} 
        className="text-lg px-8 py-6 w-full"
        disabled={isVerifying || isLoading}
      >
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Verifying Username
          </>
        ) : isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Insights
          </>
        ) : (
          <>Start Your Journey</>
        )}
      </GradientButton>
    </motion.div>
  );
};