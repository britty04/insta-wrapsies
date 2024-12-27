import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GradientButton } from "./GradientButton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
  const plans = [
    {
      name: "Monthly Premium",
      priceUSD: 4.99,
      priceINR: 399,
      features: ["Unlimited insights", "Priority support", "Early access to new features"],
    },
    {
      name: "Yearly Premium",
      priceUSD: 49.99,
      priceINR: 3999,
      features: ["All monthly features", "2 months free", "Exclusive analytics"],
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-gray-900 to-black border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent">
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Get unlimited insights and exclusive features
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {plans.map((plan) => (
            <Card key={plan.name} className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">{plan.name}</CardTitle>
                <CardDescription className="text-white/70">
                  ${plan.priceUSD} / ₹{plan.priceINR}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-white/80 flex items-center">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <GradientButton className="w-full mt-4">Subscribe Now</GradientButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};