import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { LandingContent } from "@/components/LandingContent";
import { SearchSection } from "@/components/SearchSection";
import { StatsSection } from "@/components/StatsSection";
import { Drawer } from "@/components/ui/drawer";
import html2canvas from 'html2canvas';

const MAX_DAILY_CREDITS = 20;

const PREDEFINED_PROFILE = {
  username: "brittytino",
  followers: 363,
  following: 373,
  posts: 0,
  profilePicUrl: "/brittytino.jpg"
};

const generateRandomStats = (username: string) => ({
  activeDays: Math.floor(Math.random() * (365 - 200) + 200),
  postsLiked: Math.floor(Math.random() * (5000 - 500) + 500),
  storiesWatched: Math.floor(Math.random() * (10000 - 1000) + 1000),
  peakHour: `${Math.floor(Math.random() * (23 - 6) + 6)}:00`,
});

const simulateProfileFetch = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    isPrivate: false,
    ...PREDEFINED_PROFILE
  };
};

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
  const [memeUrl, setMemeUrl] = useState("");

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

  const fetchMeme = async () => {
    try {
      const response = await fetch(
        'https://ronreiter-meme-generator.p.rapidapi.com/meme?font_size=50&top=Top%20Text&font=Impact&bottom=Bottom%20Text&meme=Condescending-Wonka',
        {
          headers: {
            'x-rapidapi-key': 'YOUR_API_KEY',
            'x-rapidapi-host': 'ronreiter-meme-generator.p.rapidapi.com'
          }
        }
      );
      const blob = await response.blob();
      setMemeUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error fetching meme:', error);
    }
  };

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
      const profile = await simulateProfileFetch();
      
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
      
      // Fetch meme after analytics are shown
      await fetchMeme();
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
            {memeUrl && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 max-w-md mx-auto"
              >
                <img src={memeUrl} alt="Meme" className="rounded-lg shadow-xl" />
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;