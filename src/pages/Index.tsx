import { useState } from "react";
import { GradientButton } from "@/components/GradientButton";
import { StatsCard } from "@/components/StatsCard";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    toast({
      title: "Demo Mode",
      description: "This is a demo version showing sample data.",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Background decoration */}
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
            <GradientButton onClick={handleStart} className="text-lg px-8 py-6">
              Start Your Journey
            </GradientButton>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <StatsCard
                title="Active Days"
                value="284"
                description="You were active on Instagram for 284 days in 2024"
              />
              <StatsCard
                title="Posts Liked"
                value="1,432"
                description="You spread love through likes"
              />
              <StatsCard
                title="Stories Watched"
                value="3,721"
                description="You kept up with your friends' daily moments"
              />
              <StatsCard
                title="Peak Activity"
                value="9PM"
                description="Your most active hour on Instagram"
              />
            </div>
            
            <div className="text-center mt-12">
              <GradientButton 
                onClick={() => toast({
                  title: "Coming Soon",
                  description: "The share feature will be available in the next update!",
                })}
                className="text-lg px-8 py-4"
              >
                Generate Shareable Card
              </GradientButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;