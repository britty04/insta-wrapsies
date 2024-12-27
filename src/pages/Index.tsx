import { useState, useEffect } from "react";
import { GradientButton } from "@/components/GradientButton";
import { StatsCard } from "@/components/StatsCard";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";
import { Instagram, Loader2 } from "lucide-react";
import { InstagramProfile } from "@/components/InstagramProfile";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { verifyInstagramUsername } from "@/utils/instagram";

const MAX_DAILY_CREDITS = 3;

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
      const { isValid, isPrivate, profilePicUrl } = await verifyInstagramUsername(username);
      if (!isValid) {
        toast({
          title: "Invalid Username",
          description: "Please check your Instagram username and try again.",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }

      if (isPrivate) {
        toast({
          title: "Private Account",
          description: "Please make your account public to view insights.",
          variant: "destructive",
        });
        setProfileData({ isPrivate, profilePicUrl });
        setIsVerifying(false);
        return;
      }

      setProfileData({ isPrivate: false, profilePicUrl });
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
    <>
      <Helmet>
        <title>Instagram Wrapped 2024 - Your Year in Review</title>
        <meta name="description" content="Discover your Instagram journey through 2024 with beautiful insights and shareable stats. See your active days, liked posts, and more!" />
        <meta property="og:title" content="Instagram Wrapped 2024" />
        <meta property="og:description" content="Get your personalized Instagram year in review for 2024" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="Instagram Wrapped, 2024 Review, Social Media Analytics, Instagram Stats" />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(131,58,180,0.2),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(193,53,132,0.2),transparent_40%)] pointer-events-none" />

        <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col justify-center">
          {!started ? (
            <div className="max-w-2xl mx-auto text-center animate-fade-in space-y-8">
              <Instagram className="w-16 h-16 mx-auto text-pink-500 animate-pulse" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent">
                Your 2024 Instagram Wrapped
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Discover your Instagram journey through 2024 with beautiful insights and shareable stats.
              </p>
              <div className="space-y-4">
                <div className="relative max-w-md mx-auto">
                  <Input
                    type="text"
                    placeholder="Enter your Instagram username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-center pl-10"
                    disabled={isVerifying || isLoading}
                  />
                  <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
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
        </div>
      </div>

      <SubscriptionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </>
  );
};

export default Index;