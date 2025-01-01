import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Lock, Verified } from "lucide-react";
import { motion } from "framer-motion";

interface InstagramProfileProps {
  username: string;
  isPrivate?: boolean;
  profilePicUrl?: string;
  followers?: number;
  following?: number;
  posts?: number;
}

export const InstagramProfile = ({ 
  username, 
  isPrivate, 
  profilePicUrl,
  followers = 363,
  following = 373,
  posts = 0
}: InstagramProfileProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-3 mb-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm"
    >
      <Avatar className="w-24 h-24 border-2 border-white/10">
        <AvatarImage src={profilePicUrl} alt={username} />
        <AvatarFallback className="bg-gradient-to-br from-instagram-purple to-instagram-pink text-white">
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-semibold text-white">@{username}</span>
          {isPrivate ? (
            <Lock className="w-5 h-5 text-white/60" />
          ) : (
            <Verified className="w-5 h-5 text-blue-400" />
          )}
        </div>
        {isPrivate ? (
          <p className="text-white/60 text-sm">This account is private. Please make it public to view insights.</p>
        ) : (
          <div className="flex space-x-4 mt-2">
            <div className="text-white/80">
              <span className="font-bold text-white">{posts}</span> posts
            </div>
            <div className="text-white/80">
              <span className="font-bold text-white">{followers}</span> followers
            </div>
            <div className="text-white/80">
              <span className="font-bold text-white">{following}</span> following
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};