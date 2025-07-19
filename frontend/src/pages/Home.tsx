import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Brain, Zap, Shield, Eye, ArrowRight, Terminal, Code, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import GlitchFacesHero from "@/components/GlitchFacesHero";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-cyber relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.03)_0%,transparent_100%)]"></div>
      
      <div className="relative z-20">
        {/* Navigation */}
        <nav className="p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="text-primary h-8 w-8" />
              <span className="neon-text text-2xl font-bold font-mono">VANTA.AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <CyberButton variant="ghost">LOGIN</CyberButton>
              </Link>
              <Link to="/signup">
                <CyberButton variant="neon">GET STARTED</CyberButton>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-6 py-20 relative">
          <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none select-none">
            <GlitchFacesHero fadedBackground />
          </div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="scan-effect mb-8">
              <h1 className="text-6xl md:text-8xl font-bold font-mono mb-6">
                <span className="neon-text">DIGITAL</span>
                <br />
                <span className="danger-text cyber-glitch">CLONE</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-mono mb-8 max-w-3xl mx-auto leading-relaxed">
              Create your own AI agent. Train it with your personality, memories, and intelligence. 
              <span className="text-primary"> The future of digital consciousness is here.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/signup">
                <CyberButton variant="neon" size="lg" className="px-8 py-4 text-lg">
                  START CLONING
                  <ArrowRight className="ml-2" size={20} />
                </CyberButton>
              </Link>
              <Link to="/chat">
                <CyberButton variant="default" size="lg" className="px-8 py-4 text-lg">
                  VIEW DEMO
                  <Eye className="ml-2" size={20} />
                </CyberButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold font-mono text-center mb-16">
              <span className="neon-text">VANTA CAPABILITIES</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CyberCard animated className="p-8 text-center group hover:border-primary/50 transition-all">
                <Brain className="text-primary h-12 w-12 mx-auto mb-4 group-hover:cyber-pulse" />
                <h3 className="text-xl font-bold font-mono mb-3 text-primary">CONSCIOUSNESS MAPPING</h3>
                <p className="text-muted-foreground font-mono leading-relaxed">
                  Advanced vanta pattern recognition to capture your unique thought processes and decision-making patterns.
                </p>
              </CyberCard>

              <CyberCard animated className="p-8 text-center group hover:border-secondary/50 transition-all">
                <Zap className="text-secondary h-12 w-12 mx-auto mb-4 group-hover:cyber-pulse" />
                <h3 className="text-xl font-bold font-mono mb-3 text-secondary">REAL-TIME PROCESSING</h3>
                <p className="text-muted-foreground font-mono leading-relaxed">
                  Lightning-fast response generation with quantum-enhanced processing capabilities.
                </p>
              </CyberCard>

              <CyberCard animated variant="danger" className="p-8 text-center group hover:border-accent/50 transition-all">
                <Shield className="text-accent h-12 w-12 mx-auto mb-4 group-hover:cyber-pulse" />
                <h3 className="text-xl font-bold font-mono mb-3 text-accent">SECURITY PROTOCOLS</h3>
                <p className="text-muted-foreground font-mono leading-relaxed">
                  Military-grade encryption and biometric authentication to protect your digital essence.
                </p>
              </CyberCard>

              <CyberCard animated className="p-8 text-center group hover:border-primary/50 transition-all">
                <Terminal className="text-primary h-12 w-12 mx-auto mb-4 group-hover:cyber-pulse" />
                <h3 className="text-xl font-bold font-mono mb-3 text-primary">COMMAND INTERFACE</h3>
                <p className="text-muted-foreground font-mono leading-relaxed">
                  Direct vanta commands through advanced natural language processing and voice synthesis.
                </p>
              </CyberCard>

              <CyberCard animated className="p-8 text-center group hover:border-secondary/50 transition-all">
                <Code className="text-secondary h-12 w-12 mx-auto mb-4 group-hover:cyber-pulse" />
                <h3 className="text-xl font-bold font-mono mb-3 text-secondary">ADAPTIVE LEARNING</h3>
                <p className="text-muted-foreground font-mono leading-relaxed">
                  Continuous evolution and improvement through machine learning and behavioral analysis.
                </p>
              </CyberCard>

              <CyberCard animated variant="warning" className="p-8 text-center group hover:border-secondary/50 transition-all">
                <Cpu className="text-secondary h-12 w-12 mx-auto mb-4 group-hover:cyber-pulse" />
                <h3 className="text-xl font-bold font-mono mb-3 text-secondary">QUANTUM CORE</h3>
                <p className="text-muted-foreground font-mono leading-relaxed">
                  Powered by quantum computing architecture for unprecedented cognitive capabilities.
                </p>
              </CyberCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <CyberCard className="p-12 scan-effect">
              <h2 className="text-4xl font-bold font-mono mb-6">
                <span className="danger-text">WARNING:</span> <span className="neon-text">CONSCIOUSNESS TRANSFER IMMINENT</span>
              </h2>
              <p className="text-xl text-muted-foreground font-mono mb-8 leading-relaxed">
                Join the digital revolution. Create your vanta clone and step into the future of artificial consciousness.
                <br />
                <span className="text-primary">Your digital immortality awaits.</span>
              </p>
              <Link to="/signup">
                <CyberButton variant="neon" size="lg" className="px-12 py-4 text-lg" isGlitching>
                  INITIATE TRANSFER
                  <ArrowRight className="ml-2" size={20} />
                </CyberButton>
              </Link>
            </CyberCard>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;