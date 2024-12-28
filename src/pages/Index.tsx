import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { GradientButton } from "@/components/GradientButton";
import { StatsCard } from "@/components/StatsCard";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import { Instagram, Loader2 } from "lucide-react";
import { InstagramProfile } from "@/components/InstagramProfile";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { LandingContent } from "@/components/LandingContent";
import { fetchInstagramProfile } from "@/utils/instagramApi";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LandingHero } from "@/components/LandingHero";

const MAX_DAILY_CREDITS = 0; // Set to 0 for development

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
      const profile = await fetchInstagramProfile(username);
      
      if (!profile) {
        toast({
          title: "Invalid Username",
          description: "Please check your Instagram username and try again.",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }

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
      
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 5000));
      
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(131,58,180,0.2),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(193,53,132,0.2),transparent_40%)] pointer-events-none" />

      <Navbar />

      <main className="container mx-auto px-4 py-12 relative z-10">
        {!started ? (
          <div className="max-w-4xl mx-auto">
            <LandingHero />
            <LandingContent />
            <div className="mt-12 space-y-4">
              <div className="relative max-w-md mx-auto">
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
              <div className="text-sm text-white/60 mb-4">
                Credits remaining: {MAX_DAILY_CREDITS - creditsUsed} of {MAX_DAILY_CREDITS}
              </div>
              <GradientButton 
                onClick={handleStart} 
                className="text-lg px-8 py-6 w-full max-w-md mx-auto"
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
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto" id="stats-container">
            <InstagramProfile 
              username={username}
              isPrivate={profileData.isPrivate}
              profilePicUrl={profileData.profilePicUrl}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <StatsCard
                title="Active Days"
                value={stats.activeDays}
                description="You were active on Instagram for this many days in 2024"
              />
              <StatsCard
                title="Posts Liked"
                value={stats.postsLiked.toLocaleString()}
                description="You spread love through likes"
              />
              <StatsCard
                title="Stories Watched"
                value={stats.storiesWatched.toLocaleString()}
                description="You kept up with your friends' daily moments"
              />
              <StatsCard
                title="Peak Activity"
                value={stats.peakHour}
                description="Your most active hour on Instagram"
              />
            </div>
            
            <div className="text-center mt-12" data-download-button>
              <GradientButton 
                onClick={handleShare}
                className="text-lg px-8 py-4"
              >
                Download Card
              </GradientButton>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <SubscriptionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
};

export default Index;
