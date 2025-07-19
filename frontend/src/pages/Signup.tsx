import { useState } from "react";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Lock, User, Mail, ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const API_BASE = 'https://vanta-ai-1.onrender.com/api/';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validatePassword = (password: string) => {
    // At least 8 chars, one uppercase, one number, one special char
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (!agreed) {
      setError("You must accept the agreement");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!validatePassword(form.password)) {
      setError("Password must be at least 8 characters, include an uppercase letter, a number, and a special character.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        setIsLoading(false);
        return;
      }
      setStep(2);
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitialization = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("vanta_user_logged_in", "true");
      localStorage.setItem("vanta_user_username", form.username);
      localStorage.setItem("vanta_user_email", form.email);
      navigate("/onboarding");
    }, 1000);
  };

  if (step === 2) {
    // Remove the useEffect that redirects to login
    return (
      <div className="min-h-screen bg-gradient-cyber relative overflow-hidden flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.03)_0%,transparent_100%)]"></div>
        <div className="relative z-10 w-full max-w-md text-center">
          <CyberCard variant="danger" className="p-8 scan-effect">
            <Shield className="text-accent h-16 w-16 mx-auto mb-6 cyber-pulse" />
            <h1 className="text-2xl font-bold font-mono mb-4">
              <span className="danger-text">VANTA CLONE CREATED</span>
            </h1>
            <p className="text-muted-foreground font-mono mb-6 leading-relaxed">
              Your digital consciousness has been successfully initialized. 
              Beginning vanta pattern calibration...
            </p>
            <div className="mb-6">
              <div className="cyber-border rounded-lg p-4 mb-4">
                <div className="scanning-line h-1 bg-primary/50 rounded-full"></div>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                CALIBRATING VANTA PATHWAYS...
              </p>
            </div>
            <CyberButton 
              variant="neon" 
              className="w-full py-3"
              onClick={handleInitialization}
              isGlitching={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "INITIALIZING..." : "ENTER VANTA NETWORK"}
              <ArrowRight className="ml-2" size={16} />
            </CyberButton>
          </CyberCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cyber relative overflow-hidden flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.03)_0%,transparent_100%)]"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <Brain className="text-primary h-8 w-8" />
            <span className="neon-text text-2xl font-bold font-mono">VANTA.AI</span>
          </Link>
          <h1 className="text-3xl font-bold font-mono mb-2">
            <span className="danger-text">CREATE CLONE</span>
          </h1>
          <p className="text-muted-foreground font-mono">
            Initialize your digital consciousness
          </p>
        </div>

        {/* Signup Form */}
        <CyberCard className="p-8 scan-effect">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-primary font-mono text-sm tracking-wider">
                AGENT NAME
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Vanta Agent Alpha"
                  className="pl-10 bg-background/50 border-primary/30 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary font-mono text-sm tracking-wider">
                ACCESS CODE
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className="pl-10 pr-10 bg-background/50 border-primary/30 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-primary font-mono text-sm tracking-wider">
                CONFIRM ACCESS CODE
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className="pl-10 pr-10 bg-background/50 border-primary/30 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <div className="text-danger font-mono text-sm">{error}</div>}
            <div className="flex items-start space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-primary mt-1" required checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              <span className="text-xs text-muted-foreground font-mono leading-relaxed">
                I accept the Vanta Consciousness Transfer Protocol and understand that 
                <span className="text-accent"> my digital clone will inherit my memories and personality patterns</span>.
              </span>
            </div>

            <CyberButton 
              type="submit" 
              variant="neon" 
              className="w-full py-3"
              isGlitching={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "CREATING CLONE..." : "INITIATE TRANSFER"}
              <ArrowRight className="ml-2" size={16} />
            </CyberButton>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground font-mono text-sm">
              Already have a vanta profile?{" "}
              <Link to="/login" className="text-primary hover:text-primary/80 font-bold">
                Vanta Link
              </Link>
            </p>
          </div>
        </CyberCard>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground/60 font-mono">
            SECURE CONSCIOUSNESS TRANSFER • QUANTUM ENCRYPTED
          </p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="text-primary hover:text-primary/80 font-mono underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;