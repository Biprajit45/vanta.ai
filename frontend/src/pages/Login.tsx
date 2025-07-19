import { useState } from "react";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }
      localStorage.setItem("vanta_user_logged_in", "true");
      localStorage.setItem("vanta_user_username", form.username);
      // If the username is an email, store it directly; otherwise, fetch the email from the backend
      if (form.username.includes("@")) {
        localStorage.setItem("vanta_user_email", form.username);
      } else {
        // Fetch email from backend
        try {
          const res = await fetch("http://127.0.0.1:8000/api/get-email/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: form.username })
          });
          const data = await res.json();
          if (res.ok && data.email) {
            localStorage.setItem("vanta_user_email", data.email);
          }
        } catch (err) {
          // fallback: do not set email
        }
      }
      // Optionally store user info in localStorage or context
      // localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect to chat or dashboard
      navigate("/chat");
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

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
            <span className="neon-text">VANTA ACCESS</span>
          </h1>
          <p className="text-muted-foreground font-mono">
            Connect to your digital consciousness
          </p>
        </div>

        {/* Login Form */}
        <CyberCard className="p-8 scan-effect">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary font-mono text-sm tracking-wider">
                VANTA ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="agent@vanta.ai"
                  className="pl-10 bg-background/50 border-primary/30 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                  value={form.username}
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
            {error && <div className="text-danger font-mono text-sm">{error}</div>}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
                <span className="text-muted-foreground font-mono">Remember vanta pattern</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:text-primary/80 font-mono">
                Forgot access?
              </Link>
            </div>

            <CyberButton 
              type="submit" 
              variant="neon" 
              className="w-full py-3"
              isGlitching={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "CONNECTING..." : "VANTA LINK"}
              <ArrowRight className="ml-2" size={16} />
            </CyberButton>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground font-mono text-sm">
              No vanta profile yet?{" "}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-bold">
                Create Digital Clone
              </Link>
            </p>
          </div>

          {/* Biometric Options */}
          <div className="mt-6 pt-6 border-t border-primary/20">
            <p className="text-center text-xs text-muted-foreground font-mono mb-4">
              BIOMETRIC AUTHENTICATION
            </p>
            <div className="flex justify-center space-x-4">
              <CyberButton variant="ghost" size="sm" className="px-4">
                RETINAL SCAN
              </CyberButton>
              <CyberButton variant="ghost" size="sm" className="px-4">
                VOICE PRINT
              </CyberButton>
            </div>
          </div>
        </CyberCard>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground/60 font-mono">
            SECURE CONNECTION • 256-BIT QUANTUM ENCRYPTION
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

export default Login;