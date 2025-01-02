import { ArrowLeft, Instagram, PartyPopper } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== "/";

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/20 border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <a 
                href="https://www.instagram.com/brittytino/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram className="w-6 h-6 text-pink-500 animate-pulse" />
              </a>
              <span className="text-xl font-bold bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent">
                Insta Wrapped
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <PartyPopper className="w-5 h-5 text-yellow-500 animate-bounce" />
            <span className="text-white/80">2024</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};