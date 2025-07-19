import { useState } from "react";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to verify email");
      } else if (data.exists) {
        setStep(2);
      } else {
        setError("No account found with this email.");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!validatePassword(newPassword)) {
      setError("Password must be at least 8 characters, include an uppercase letter, a number, and a special character.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to reset password");
      } else {
        setMessage("Password reset successful. You can now log in.");
        setStep(3);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cyber flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <Brain className="text-primary h-8 w-8" />
            <span className="neon-text text-2xl font-bold font-mono">VANTA.AI</span>
          </Link>
          <h1 className="text-3xl font-bold font-mono mb-2">
            <span className="neon-text">RESET ACCESS</span>
          </h1>
          <p className="text-muted-foreground font-mono">
            {step === 1 && "Enter your Vanta ID to reset your access code"}
            {step === 2 && "Set a new access code for your account"}
            {step === 3 && "Your password has been reset. You can now log in."}
          </p>
        </div>
        <CyberCard className="p-8 scan-effect">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary font-mono text-sm tracking-wider">
                  VANTA ID
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="agent@vanta.ai"
                    className="pl-10 bg-background/50 border-primary/30 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {error && <div className="text-danger font-mono text-sm">{error}</div>}
              {message && <div className="text-success font-mono text-sm">{message}</div>}
              <CyberButton
                type="submit"
                variant="neon"
                className="w-full py-3"
                isGlitching={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "VERIFYING..." : "VERIFY EMAIL"}
                <ArrowRight className="ml-2" size={16} />
              </CyberButton>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-primary font-mono text-sm tracking-wider">
                  NEW ACCESS CODE
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••••"
                    className="pl-10 pr-10 bg-background/50 border-primary/30 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-primary font-mono text-sm tracking-wider">
                  CONFIRM ACCESS CODE
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••••"
                    className="pl-10 pr-10 bg-background/50 border-primary/30 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <div className="text-danger font-mono text-sm">{error}</div>}
              {message && <div className="text-success font-mono text-sm">{message}</div>}
              <CyberButton
                type="submit"
                variant="neon"
                className="w-full py-3"
                isGlitching={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "RESETTING..." : "RESET PASSWORD"}
                <ArrowRight className="ml-2" size={16} />
              </CyberButton>
            </form>
          )}
          {step === 3 && (
            <div className="text-center">
              <div className="text-success font-mono text-lg mb-4">Password reset successful!</div>
              <Link to="/login" className="text-primary hover:text-primary/80 font-mono">
                Back to Login
              </Link>
            </div>
          )}
        </CyberCard>
      </div>
    </div>
  );
};

export default ForgotPassword; 