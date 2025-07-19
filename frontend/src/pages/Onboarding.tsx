import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Upload, FileText, UserCheck, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

const steps = [
  { label: "Welcome", icon: <CheckCircle className="h-5 w-5" /> },
  { label: "Upload Data", icon: <Upload className="h-5 w-5" /> },
  { label: "Questionnaire", icon: <FileText className="h-5 w-5" /> },
  { label: "Review", icon: <UserCheck className="h-5 w-5" /> },
];

const Onboarding = () => {
  const location = useLocation();
  const skipWelcome = new URLSearchParams(location.search).get("skipWelcome") === "1";
  const [step, setStep] = useState(skipWelcome ? 1 : 0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [textData, setTextData] = useState("");
  const [questionnaire, setQuestionnaire] = useState({ personality: "", interests: "" });
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const [finalStep, setFinalStep] = useState(false);
  const [cloneName, setCloneName] = useState(() => localStorage.getItem("vanta_user_name") || "");
  const [nameError, setNameError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userEmail] = useState(() => localStorage.getItem("vanta_user_email") || "");
  const API_BASE = 'https://vanta-ai-1.onrender.com/api/';

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // Placeholder handlers for file upload and questionnaire
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleQuestionnaireChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestionnaire({ ...questionnaire, [e.target.name]: e.target.value });
  };

  // Handle "Train My Clone" click
  const handleTrain = () => {
    setStep(4); // Go to progress step
    setProgress(0);
    setShowSuccess(false);
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (progressInterval.current) clearInterval(progressInterval.current);
          setTimeout(() => setShowSuccess(true), 400);
          setTimeout(() => setFinalStep(true), 1800);
          return 100;
        }
        // Robotic, non-linear increments for effect
        const increment = Math.floor(Math.random() * 10) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 180);
  };

  const handleNameCheck = async () => {
    setNameError("");
    setSuggestions([]);
    setIsChecking(true);
    try {
      const res = await fetch(`${API_BASE}check-clone-name/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cloneName })
      });
      const data = await res.json();
      if (data.exists) {
        setNameError("Name is taken. Please choose another.");
        setSuggestions(data.suggestions || []);
      } else {
        setNameError("");
        setSuggestions([]);
      }
    } catch (err) {
      setNameError("Network error");
    } finally {
      setIsChecking(false);
    }
  };

  const handleNameSave = async () => {
    setIsSaving(true);
    setNameError("");
    try {
      const res = await fetch(`${API_BASE}set-clone-name/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, clone_name: cloneName })
      });
      const data = await res.json();
      if (!res.ok) {
        setNameError(data.error || "Failed to save name");
        return false;
      }
      localStorage.setItem("vanta_user_name", cloneName);
      setNameError("");
      return true;
    } catch (err) {
      setNameError("Network error");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cyber flex items-center justify-center p-6">
      <CyberCard className="w-full max-w-2xl p-8 scan-effect relative">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {(skipWelcome ? steps.slice(1) : steps).map((s, i) => (
            <div key={s.label} className="flex-1 flex flex-col items-center">
              <div className={`rounded-full border-2 ${i + (skipWelcome ? 1 : 0) <= step ? 'border-primary bg-primary/20' : 'border-muted-foreground/30 bg-background/30'} p-2 mb-1 transition-all`}>{s.icon}</div>
              <span className={`text-xs font-mono ${i + (skipWelcome ? 1 : 0) === step ? 'text-primary' : 'text-muted-foreground/60'}`}>{s.label}</span>
              {i < (skipWelcome ? steps.length - 2 : steps.length - 1) && <div className="w-full h-1 bg-gradient-to-r from-primary/40 to-muted-foreground/10 my-1" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {(!skipWelcome && step === 0) && (
          <div className="text-center">
            <h2 className="text-3xl font-bold neon-text mb-2 font-mono">Welcome to Your Digital Clone</h2>
            <p className="text-muted-foreground font-mono mb-6">Train your AI clone by uploading your data and answering a few questions. Your clone will learn from your unique digital footprint.</p>
            <CyberButton variant="neon" onClick={nextStep} className="px-8 py-3">Begin Training <ArrowRight className="ml-2" size={16} /></CyberButton>
          </div>
        )}
        {((skipWelcome && step === 1) || (!skipWelcome && step === 1)) && (
          <div>
            <h2 className="text-2xl font-bold neon-text mb-4 font-mono">Upload Your Data</h2>
            <p className="text-muted-foreground font-mono mb-4">Upload files (PDF, TXT, DOCX) or paste text to help your clone learn.</p>
            <input type="file" multiple className="mb-4 block w-full text-sm text-primary file:bg-primary/20 file:border-none file:rounded file:px-4 file:py-2 file:text-primary hover:file:bg-primary/40 transition" onChange={handleFileChange} />
            <textarea
              className="w-full h-24 p-2 bg-background/50 border border-primary/30 rounded font-mono text-foreground mb-4"
              placeholder="Paste text here..."
              value={textData}
              onChange={e => setTextData(e.target.value)}
            />
            <div className="mb-4">
              <span className="font-mono text-xs text-muted-foreground">{uploadedFiles.length} file(s) selected</span>
            </div>
            <div className="flex justify-between">
              <CyberButton variant="ghost" onClick={prevStep} disabled={skipWelcome}>
                <ArrowLeft className="mr-2" size={16} />Back
              </CyberButton>
              <CyberButton variant="neon" onClick={nextStep}>Next <ArrowRight className="ml-2" size={16} /></CyberButton>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold neon-text mb-4 font-mono">Questionnaire</h2>
            <p className="text-muted-foreground font-mono mb-4">Help your clone understand your personality and interests.</p>
            <div className="mb-4">
              <label className="block font-mono text-primary mb-1">Describe your personality:</label>
              <textarea
                name="personality"
                className="w-full h-16 p-2 bg-background/50 border border-primary/30 rounded font-mono text-foreground"
                placeholder="e.g. Curious, optimistic, analytical..."
                value={questionnaire.personality}
                onChange={handleQuestionnaireChange}
              />
            </div>
            <div className="mb-4">
              <label className="block font-mono text-primary mb-1">List your main interests:</label>
              <textarea
                name="interests"
                className="w-full h-16 p-2 bg-background/50 border border-primary/30 rounded font-mono text-foreground"
                placeholder="e.g. AI, music, philosophy..."
                value={questionnaire.interests}
                onChange={handleQuestionnaireChange}
              />
            </div>
            <div className="flex justify-between">
              <CyberButton variant="ghost" onClick={prevStep}><ArrowLeft className="mr-2" size={16} />Back</CyberButton>
              <CyberButton variant="neon" onClick={nextStep}>Next <ArrowRight className="ml-2" size={16} /></CyberButton>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold neon-text mb-4 font-mono">Review & Confirm</h2>
            <p className="text-muted-foreground font-mono mb-4">Review your data before training your clone.</p>
            <div className="mb-2 font-mono text-sm">
              <strong className="text-primary">Files:</strong> {uploadedFiles.length > 0 ? uploadedFiles.map(f => f.name).join(", ") : "None"}
            </div>
            <div className="mb-2 font-mono text-sm">
              <strong className="text-primary">Text:</strong> {textData ? <span className="break-words">{textData.slice(0, 100)}{textData.length > 100 ? '...' : ''}</span> : "None"}
            </div>
            <div className="mb-2 font-mono text-sm">
              <strong className="text-primary">Personality:</strong> {questionnaire.personality || "None"}
            </div>
            <div className="mb-4 font-mono text-sm">
              <strong className="text-primary">Interests:</strong> {questionnaire.interests || "None"}
            </div>
            <div className="flex justify-between">
              <CyberButton variant="ghost" onClick={prevStep}><ArrowLeft className="mr-2" size={16} />Back</CyberButton>
              <CyberButton variant="neon" onClick={handleTrain}>Train My Clone <ArrowRight className="ml-2" size={16} /></CyberButton>
            </div>
          </div>
        )}
        {step === 4 && !finalStep && (
          <div className="text-center">
            {!showSuccess ? (
              <>
                <h2 className="text-2xl font-bold neon-text mb-4 font-mono animate-pulse">Training in Progress...</h2>
                <div className="relative mb-4">
                  <Progress value={progress} className="h-6 bg-background/60 border border-primary/30 rounded-full overflow-hidden shadow-lg" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-primary text-lg tracking-widest drop-shadow-neon">{progress}%</span>
                </div>
                <p className="text-muted-foreground font-mono mb-6">Your digital clone is being trained on your data. This may take a moment.</p>
                <CyberButton variant="neon" disabled className="px-8 py-3">Please wait...</CyberButton>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
                  {/* Animated SVG Robot Head */}
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-neon animate-bounce">
                    <rect x="12" y="20" width="40" height="28" rx="8" fill="#0ff" stroke="#0ff" strokeWidth="2"/>
                    <rect x="24" y="12" width="16" height="12" rx="4" fill="#0ff" stroke="#0ff" strokeWidth="2"/>
                    <circle cx="20" cy="34" r="4" fill="#fff" stroke="#0ff" strokeWidth="2"/>
                    <circle cx="44" cy="34" r="4" fill="#fff" stroke="#0ff" strokeWidth="2"/>
                    <rect x="28" y="40" width="8" height="4" rx="2" fill="#fff" stroke="#0ff" strokeWidth="1.5"/>
                    <rect x="8" y="28" width="4" height="12" rx="2" fill="#0ff"/>
                    <rect x="52" y="28" width="4" height="12" rx="2" fill="#0ff"/>
                  </svg>
                  {/* Glitchy, flickering CLONE READY text */}
                  <div className="relative inline-block">
                    <span className="text-3xl font-extrabold font-mono neon-text animate-glitch block text-primary drop-shadow-neon" style={{ letterSpacing: '0.15em' }}>
                      CLONE READY
                    </span>
                    {/* Glitch layers */}
                    <span className="absolute left-0 top-0 w-full h-full text-3xl font-extrabold font-mono neon-text block text-cyan-400 opacity-60 animate-glitch2 pointer-events-none select-none" style={{ letterSpacing: '0.15em' }}>
                      CLONE READY
                    </span>
                    <span className="absolute left-0 top-0 w-full h-full text-3xl font-extrabold font-mono neon-text block text-pink-500 opacity-40 animate-glitch3 pointer-events-none select-none" style={{ letterSpacing: '0.15em' }}>
                      CLONE READY
                    </span>
                  </div>
                  <p className="text-cyan-300 font-mono text-lg mb-2 animate-flicker">Neural Link Established</p>
                  <CyberButton variant="neon" disabled className="px-8 py-3 animate-pulse">Redirecting to Chat...</CyberButton>
                </div>
                {/* Cyberpunk animated border */}
                <div className="absolute inset-0 pointer-events-none animate-border-glow rounded-2xl border-4 border-primary/60"></div>
              </>
            )}
          </div>
        )}
        {finalStep && (
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold neon-text mb-4 font-mono">Name Your Clone</h2>
            <p className="text-muted-foreground font-mono mb-4">Give your digital clone a unique name. This will be shown in the chat interface.</p>
            <form onSubmit={e => { e.preventDefault(); handleNameCheck(); }} className="space-y-4 max-w-xs mx-auto">
              <Input
                value={cloneName}
                onChange={e => setCloneName(e.target.value)}
                placeholder="Enter clone name"
                className="text-center font-mono"
                maxLength={32}
                required
                autoFocus
              />
              {nameError && <div className="text-danger font-mono text-sm">{nameError}</div>}
              {suggestions.length > 0 && (
                <div className="text-muted-foreground font-mono text-xs">
                  Suggestions: {suggestions.map(s => (
                    <span key={s} className="mx-1 cursor-pointer underline" onClick={() => setCloneName(s)}>{s}</span>
                  ))}
                </div>
              )}
              <CyberButton
                type="button"
                variant="neon"
                className="w-full py-3"
                isGlitching={isChecking || isSaving}
                disabled={isChecking || isSaving}
                onClick={async () => {
                  await handleNameCheck();
                  if (!nameError && suggestions.length === 0) {
                    const success = await handleNameSave();
                    if (success) navigate("/chat");
                  }
                }}
              >
                {isSaving ? "Saving..." : "Save & Continue"}
                <ArrowRight className="ml-2" size={16} />
              </CyberButton>
            </form>
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground/60 font-mono">
                If left blank, your username will be used as the clone name.
              </p>
            </div>
          </div>
        )}
      </CyberCard>
    </div>
  );
};

export default Onboarding; 