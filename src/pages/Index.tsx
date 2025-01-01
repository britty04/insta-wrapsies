import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { LandingContent } from "@/components/LandingContent";
import { SearchSection } from "@/components/SearchSection";
import { StatsSection } from "@/components/StatsSection";
import html2canvas from 'html2canvas';

const MAX_DAILY_CREDITS = 20;

const PREDEFINED_PROFILE = {
  username: "brittytino",
  followers: 363,
  following: 373,
  posts: 0,
  profilePicUrl: "/brittytino.jpg",
  isPrivate: false
};

const generateRealisticStats = () => ({
  weeklyActivity: "4 days",
  engagementRate: "2.8%",
  bestTimeToPost: "6:00 PM",
  topContentType: "Reels"
});

const Index = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState(PREDEFINED_PROFILE.username);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [profileData, setProfileData] = useState(PREDEFINED_PROFILE);

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
      // Simulate profile fetch with predefined data
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProfileData(PREDEFINED_PROFILE);
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStats(generateRealisticStats());
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
          description: "Your insights card has been downloaded. Share it with your friends!",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(131,58,180,0.2),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(193,53,132,0.2),transparent_40%)] pointer-events-none" />

      <main className="container mx-auto px-4 py-12 relative z-10">
        {!started ? (
          <motion.div 
            className="max-w-4xl mx-auto mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SearchSection 
              username={username}
              setUsername={setUsername}
              handleStart={handleStart}
              isVerifying={isVerifying}
              isLoading={isLoading}
            />
            <div className="mt-16">
              <LandingContent />
            </div>
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
    </div>
  );
};

export default Index;