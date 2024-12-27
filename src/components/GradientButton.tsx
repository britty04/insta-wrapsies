import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const GradientButton = ({ children, className, ...props }: GradientButtonProps) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange hover:opacity-90 transition-opacity",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};