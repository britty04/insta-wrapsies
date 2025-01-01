import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { LandingContent } from "@/components/LandingContent";
import { LandingHero } from "@/components/LandingHero";
import { SearchSection } from "@/components/SearchSection";
import { StatsSection } from "@/components/StatsSection";

const MAX_DAILY_CREDITS = 20;

const generateRandomStats = (username: string) => {
  let seed = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  return {
    activeDays: Math.floor(random() * (365 - 200) + 200),
    postsLiked: Math.floor(random() * (5000 - 500) + 500),
    storiesWatched: Math.floor(random() * (10000 - 1000) + 1000),
    peakHour: `${Math.floor(random() * (23 - 6) + 6)}:00`,
  };
};

const simulateProfileFetch = async (username: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate random profile data
  return {
    isPrivate: Math.random() > 0.7,
    profilePicUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    followers: Math.floor(Math.random() * 5000),
    following: Math.floor(Math.random() * 1000),
    posts: Math.floor(Math.random() * 500),
  };
};

const Index = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [profileData, setProfileData] = useState<{
    isPrivate?: boolean;
    profilePicUrl?: string;
    followers?: number;
    following?: number;
    posts?: number;
  }>({});

  useEffect(() => {
    const savedCredits = localStorage.getItem('creditsUsed');
    const lastUsedDate = localStorage.getItem('lastUsedDate');
    const today = new Date().toDateString();

    if (lastUsedDate !== today) {
      localStorage.setItem('creditsUsed', '0');
      localStorage.setItem('lastUsedDate', today);
      setCreditsUsed(0);
    } else if (savedCredits) {
      setCreditsUsed(parseInt(savedCredits));
    }
  }, []);

  const handleStart = async () => {
    if (!username) {
      toast({
        title: "Username Required",
        description: "Please enter your Instagram username to continue.",
        variant: "destructive",
      });
      return;
    }

    if (creditsUsed >= MAX_DAILY_CREDITS) {
      setShowSubscriptionModal(true);
      return;
    }

    setIsVerifying(true);
    try {
      const profile = await simulateProfileFetch(username);
      
      if (profile.isPrivate) {
        toast({
          title: "Private Account",
          description: "Please make your account public to view insights.",
          variant: "destructive",
        });
        setProfileData(profile);
        setIsVerifying(false);
        return;
      }

      setProfileData(profile);
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStats(generateRandomStats(username));
      setStarted(true);
      const newCreditsUsed = creditsUsed + 1;
      setCreditsUsed(newCreditsUsed);
      localStorage.setItem('creditsUsed', newCreditsUsed.toString());
      localStorage.setItem('lastUsedDate', new Date().toDateString());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify username. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    const statsElement = document.getElementById('stats-container');
    const downloadButton = document.querySelector('[data-download-button]');
    if (statsElement && downloadButton) {
      try {
        downloadButton.classList.add('hidden');
        const canvas = await html2canvas(statsElement, {
          backgroundColor: '#000000',
          scale: 2,
        });
        downloadButton.classList.remove('hidden');
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'instagram-wrapped-2024.png';
        link.click();
        
        toast({
          title: "Success!",
          description: "Your wrapped card has been downloaded. Share it on your favorite social media!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate sharing card. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(131,58,180,0.2),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(193,53,132,0.2),transparent_40%)] pointer-events-none" />

      <main className="container mx-auto px-4 py-12 relative z-10">
        {!started ? (
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LandingHero />
            <SearchSection 
              username={username}
              setUsername={setUsername}
              handleStart={handleStart}
              isVerifying={isVerifying}
              isLoading={isLoading}
            />
            <LandingContent />
          </motion.div>
        ) : (
          <div id="stats-container">
            <StatsSection 
              username={username}
              stats={stats}
              profileData={profileData}
              handleShare={handleShare}
            />
          </div>
        )}
      </main>

      <SubscriptionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
};

export default Index;