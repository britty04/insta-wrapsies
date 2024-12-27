import { Instagram } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Instagram className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-instagram-purple to-instagram-pink bg-clip-text text-transparent">
              Insta Wrapped
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              How it works
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Guide
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};