import { Instagram, Github, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/60 text-sm">
            © 2024 Insta Wrapped. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://www.instagram.com/brittytino/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/brittytino" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.tinobritty.tech/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};