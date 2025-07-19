import { Heart, Sparkles, Star } from "lucide-react";
import { RomanticCard } from "./RomanticCard";

const loveMessages = [
  "You are my sunshine on cloudy days",
  "Every moment with you feels like magic",
  "You make my heart skip a beat",
  "In your eyes, I found my home",
  "You are my favorite notification",
  "With you, every day is Valentine's Day"
];

export const LoveMessage = () => {
  const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];

  return (
    <RomanticCard float className="text-center max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Heart className="text-6xl text-pink-400 fill-pink-300 pulse-heart" />
          <Sparkles className="absolute -top-2 -right-2 text-yellow-300 sparkle" size={20} />
          <Star className="absolute -bottom-1 -left-2 text-purple-300 sparkle" size={16} />
        </div>
      </div>
      
      <h2 className="gradient-text text-2xl font-bold mb-4">
        For My Beautiful Girlfriend
      </h2>
      
      <p className="text-lg text-muted-foreground leading-relaxed">
        {randomMessage}
      </p>
      
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(5)].map((_, i) => (
          <Heart
            key={i}
            size={16}
            className="text-pink-400 fill-pink-300 sparkle"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>
    </RomanticCard>
  );
};