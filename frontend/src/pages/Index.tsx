import { FloatingHearts } from "@/components/FloatingHearts";
import { LoveMessage } from "@/components/LoveMessage";
import { RomanticCard } from "@/components/RomanticCard";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Star, Flower2 } from "lucide-react";
import romanticHero from "@/assets/romantic-hero.jpg";
import coupleHugging from "@/assets/couple-hugging.webp";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating hearts animation */}
      <FloatingHearts />
      
      {/* Hero background */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${romanticHero})` }}
      />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <Sparkles className="text-yellow-300 sparkle mr-3" size={32} />
            <h1 className="gradient-text text-6xl font-bold">
              My Love
            </h1>
            <Sparkles className="text-yellow-300 sparkle ml-3" size={32} />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A little piece of my heart, crafted just for you ✨
          </p>
        </div>

        {/* Cute couple illustration */}
        <div className="text-center mb-12">
          <RomanticCard float className="inline-block p-8">
            <div className="relative">
              <img 
                src={coupleHugging} 
                alt="Cute cartoon couple hugging"
                className="w-64 h-64 mx-auto rounded-2xl object-cover shadow-lg"
                style={{
                  filter: "drop-shadow(0 10px 25px rgba(59, 130, 246, 0.3))"
                }}
              />
              <div className="absolute -top-2 -right-2">
                <Heart className="text-pink-400 fill-pink-300 sparkle" size={24} />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Sparkles className="text-blue-400 sparkle" size={20} />
              </div>
            </div>
            <h2 className="gradient-text text-2xl font-bold mt-6 mb-2">
              You & Me Forever
            </h2>
            <p className="text-muted-foreground">
              Just like this sweet couple, we're perfect together 💙
            </p>
          </RomanticCard>
        </div>

        {/* Main love message */}
        <div className="mb-16">
          <LoveMessage />
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <RomanticCard float className="text-center">
            <Heart className="text-4xl text-pink-400 fill-pink-300 mx-auto mb-4 pulse-heart" />
            <h3 className="text-xl font-semibold mb-2 gradient-text">Forever Yours</h3>
            <p className="text-muted-foreground">
              Through every sunrise and sunset, my love for you grows stronger
            </p>
          </RomanticCard>

          <RomanticCard float className="text-center">
            <Star className="text-4xl text-purple-400 fill-purple-300 mx-auto mb-4 sparkle" />
            <h3 className="text-xl font-semibold mb-2 gradient-text">You're My Star</h3>
            <p className="text-muted-foreground">
              In the vast sky of life, you shine the brightest
            </p>
          </RomanticCard>

          <RomanticCard float className="text-center">
            <Flower2 className="text-4xl text-pink-400 mx-auto mb-4 float" />
            <h3 className="text-xl font-semibold mb-2 gradient-text">Beautiful Soul</h3>
            <p className="text-muted-foreground">
              Your beauty radiates from within, lighting up my world
            </p>
          </RomanticCard>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <RomanticCard className="inline-block">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-lg mb-4">
                  You mean the world to me 💕
                </p>
                <Button variant="romantic" size="lg" className="shadow-lg">
                  <Heart className="mr-2 fill-current" size={20} />
                  I Love You
                  <Sparkles className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </RomanticCard>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed bottom-10 right-10 opacity-30 pointer-events-none">
        <div className="relative">
          <div className="w-32 h-32 rounded-full glass animate-pulse"></div>
          <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-400 fill-pink-300" size={40} />
        </div>
      </div>
    </div>
  );
};

export default Index;
