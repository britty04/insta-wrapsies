import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Lock } from "lucide-react";

interface InstagramProfileProps {
  username: string;
  isPrivate?: boolean;
  profilePicUrl?: string;
}

export const InstagramProfile = ({ username, isPrivate, profilePicUrl }: InstagramProfileProps) => {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <Avatar className="w-16 h-16 border-2 border-white/10">
        {profilePicUrl ? (
          <AvatarImage src={profilePicUrl} alt={username} />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-instagram-purple to-instagram-pink text-white">
            {username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-white">@{username}</span>
          {isPrivate && (
            <Lock className="w-4 h-4 text-white/60" />
          )}
        </div>
        {isPrivate && (
          <p className="text-white/60 text-sm">This account is private. Please make it public to view insights.</p>
        )}
      </div>
    </div>
  );
};