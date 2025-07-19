import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "danger" | "warning";
  animated?: boolean;
}

export const CyberCard = ({ 
  children, 
  className, 
  variant = "default",
  animated = false 
}: CyberCardProps) => {
  const variants = {
    default: "cyber-card",
    danger: "cyber-card border-accent/30 shadow-[0_0_20px_hsl(var(--accent)/0.1)]",
    warning: "cyber-card border-secondary/30 shadow-[0_0_20px_hsl(var(--secondary)/0.1)]"
  };

  return (
    <div className={cn(
      variants[variant],
      animated && "cyber-float",
      className
    )}>
      {children}
    </div>
  );
};