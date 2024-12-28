import { toast } from "@/hooks/use-toast";

interface InstagramProfile {
  username: string;
  isPrivate: boolean;
  profilePicUrl: string;
  followers: number;
  following: number;
  posts: number;
}

export const fetchInstagramProfile = async (username: string): Promise<InstagramProfile | null> => {
  try {
    // Simulate API call with delayed response
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // This is where we would integrate with Instagram's Graph API
    // For now, we'll simulate responses based on username patterns
    
    // Simulate private accounts (usernames ending with '_private')
    const isPrivate = username.toLowerCase().endsWith('_private');
    
    // Generate consistent avatar URL based on username
    const profilePicUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    
    // Generate random but consistent stats based on username hash
    const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rand = (min: number, max: number) => Math.floor((hash % 100) / 100 * (max - min) + min);
    
    return {
      username,
      isPrivate,
      profilePicUrl,
      followers: rand(100, 10000),
      following: rand(50, 1000),
      posts: rand(10, 500)
    };
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    toast({
      title: "Error",
      description: "Failed to fetch Instagram profile. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};