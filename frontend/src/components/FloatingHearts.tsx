import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  size: number;
}

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: FloatingHeart[] = [];
      for (let i = 0; i < 6; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          size: 16 + Math.random() * 8,
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-30"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animation: "floating-hearts 15s linear infinite",
          }}
        >
          <Heart
            size={heart.size}
            className="text-pink-400 fill-pink-300 sparkle"
            style={{
              filter: "drop-shadow(0 0 8px rgba(244, 114, 182, 0.4))",
            }}
          />
        </div>
      ))}
    </div>
  );
};