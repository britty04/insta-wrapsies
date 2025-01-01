import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Lock, Verified } from "lucide-react";
import { motion } from "framer-motion";

interface InstagramProfileProps {
  username: string;
  isPrivate?: boolean;
  profilePicUrl?: string;
}

export const InstagramProfile = ({ username, isPrivate, profilePicUrl }: InstagramProfileProps) => {
  const defaultProfilePic = "https://instagram.fmaa2-3.fna.fbcdn.net/v/t51.2885-19/457028319_512473401142173_6604381690495407370_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fmaa2-3.fna.fbcdn.net&_nc_cat=109&_nc_ohc=Mz3PxlDvOScQ7kNvgEmY9m6&_nc_gid=d3c12f4d61144e5f994dede9ebef4e7d&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYDk4h1Avr7S1sKH1gqKJIHJY4ytg9L6taHeosnroH5dKw&oe=677B452D&_nc_sid=8b3546";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-3 mb-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm"
    >
      <Avatar className="w-24 h-24 border-2 border-white/10">
        <AvatarImage src={profilePicUrl || defaultProfilePic} alt={username} />
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
              <span className="font-bold text-white">1,012</span> posts
            </div>
            <div className="text-white/80">
              <span className="font-bold text-white">1.1M</span> followers
            </div>
            <div className="text-white/80">
              <span className="font-bold text-white">1,258</span> following
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};