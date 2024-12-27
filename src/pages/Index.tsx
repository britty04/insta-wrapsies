import { useState, useEffect } from "react";
import { GradientButton } from "@/components/GradientButton";
import { StatsCard } from "@/components/StatsCard";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";

const generateRandomStats = (username: string) => {
  // Seed the random generator with username for consistent results per user
  let seed = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  return {
    activeDays: Math.floor(random() * (365 - 200) + 200), // 200-365 days
    postsLiked: Math.floor(random() * (5000 - 500) + 500), // 500-5000 posts
    storiesWatched: Math.floor(random() * (10000 - 1000) + 1000), // 1000-10000 stories
    peakHour: `${Math.floor(random() * (23 - 6) + 6)}:00`, // Peak time between 6:00-23:00
  };
};

const Index = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [hasUsedToday, setHasUsedToday] = useState(false);

  useEffect(() => {
    const lastUsed = localStorage.getItem('lastUsed');
    if (lastUsed && lastUsed === new Date().toDateString()) {
      setHasUsedToday(true);
    }
  }, []);

  const handleStart = () => {
    if (!username) {
      toast({
        title: "Username Required",
        description: "Please enter your Instagram username to continue.",
        variant: "destructive",
      });
      return;
    }

    if (hasUsedToday) {
      toast({
        title: "Daily Limit Reached",
        description: "Subscribe to our premium plan for unlimited access!",
        variant: "destructive",
      });
      return;
    }

    setStats(generateRandomStats(username));
    setStarted(true);
    localStorage.setItem('lastUsed', new Date().toDateString());
  };

  const handleShare = async () => {
    const statsElement = document.getElementById('stats-container');
    if (statsElement) {
      try {
        const canvas = await html2canvas(statsElement);
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

        <div className="container mx-auto px-4 py-12">
          {!started ? (
            <div className="max-w-2xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent">
                Your 2024 Instagram Wrapped
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Discover your Instagram journey through 2024 with beautiful insights and shareable stats.
              </p>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your Instagram username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="max-w-md mx-auto text-center"
                />
                <GradientButton onClick={handleStart} className="text-lg px-8 py-6">
                  Start Your Journey
                </GradientButton>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto" id="stats-container">
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
              
              <div className="text-center mt-12">
                <GradientButton 
                  onClick={handleShare}
                  className="text-lg px-8 py-4"
                >
                  Download Shareable Card
                </GradientButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;