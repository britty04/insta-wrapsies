import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { PartyPopper, Sparkles } from "lucide-react";

interface NewYearPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewYearPopup = ({ open, onOpenChange }: NewYearPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border-white/10">
        <motion.div 
          className="text-center space-y-6 py-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center space-x-4">
            <PartyPopper className="w-10 h-10 text-yellow-500 animate-bounce" />
            <Sparkles className="w-10 h-10 text-pink-500 animate-pulse" />
          </div>
          
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Happy New Year 2025!
          </motion.h2>
          
          <p className="text-white/80 text-lg">
            Thank you for being part of our journey! Here's to another year of amazing content and growth! 🎉
          </p>
          
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-instagram-purple to-instagram-pink rounded-lg text-white font-semibold"
            onClick={() => onOpenChange(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Celebrate! 🎊
          </motion.button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};