import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger" | "ghost" | "neon";
  size?: "default" | "sm" | "lg";
  isGlitching?: boolean;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "default", size = "default", isGlitching = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
      danger: "bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)]",
      ghost: "bg-transparent border border-muted-foreground/30 text-muted-foreground hover:bg-muted/20",
      neon: "bg-gradient-to-r from-primary to-secondary text-background font-bold hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
    };

    return (
      <Button
        ref={ref}
        className={cn(
          "transition-all duration-300 font-mono",
          variants[variant],
          isGlitching && "cyber-glitch",
          className
        )}
        size={size}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

CyberButton.displayName = "CyberButton";