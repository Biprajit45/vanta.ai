import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RomanticCardProps {
  children: ReactNode;
  className?: string;
  float?: boolean;
}

export const RomanticCard = ({ children, className, float = false }: RomanticCardProps) => {
  return (
    <div
      className={cn(
        "glass-card",
        float && "float",
        "transform transition-all duration-300 hover:scale-105",
        className
      )}
    >
      {children}
    </div>
  );
};