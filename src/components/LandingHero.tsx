import { Instagram } from "lucide-react";

export const LandingHero = () => {
  return (
    <div className="text-center animate-fade-in space-y-8">
      <Instagram className="w-16 h-16 mx-auto text-pink-500 animate-pulse" />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent">
        Your 2024 Instagram Wrapped
      </h1>
      <p className="text-lg md:text-xl text-white/80 mb-8">
        Discover your Instagram journey through 2024 with beautiful insights and shareable stats.
      </p>
    </div>
  );
};