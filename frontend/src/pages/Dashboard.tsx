import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Progress } from "@/components/ui/progress";
import { Sparkles, FileText, Upload, Trash2, MessageCircle, RefreshCw } from "lucide-react";

const mockFiles = [
  { name: "journal.txt", size: "12 KB", status: "Processed" },
  { name: "resume.pdf", size: "88 KB", status: "Processed" },
  { name: "notes.docx", size: "45 KB", status: "Pending" },
];

const Dashboard = () => {
  const [files, setFiles] = useState(mockFiles);
  const [cloneStatus, setCloneStatus] = useState("Ready");
  const [progress, setProgress] = useState(100);
  const navigate = useNavigate();

  const handleDelete = (idx: number) => {
    setFiles(files => files.filter((_, i) => i !== idx));
  };

  const handleRetrain = () => {
    navigate("/onboarding?skipWelcome=1");
  };

  const handleChat = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-cyber flex items-center justify-center p-6">
      <CyberCard className="w-full max-w-3xl p-8 scan-effect relative">
        {/* Header & Clone Status */}
        <div className="flex items-center gap-4 mb-8">
          <Sparkles className="text-primary animate-spin" size={36} />
          <div>
            <h1 className="text-3xl font-bold neon-text font-mono mb-1">Your Digital Clone</h1>
            <span className={`font-mono text-sm px-3 py-1 rounded-full ${cloneStatus === "Ready" ? "bg-primary/20 text-primary" : "bg-yellow-500/20 text-yellow-400"}`}>Status: {cloneStatus}</span>
          </div>
        </div>

        {/* Training Progress */}
        <div className="mb-8">
          <h2 className="text-xl font-mono text-primary mb-2">Training Progress</h2>
          <Progress value={progress} className="h-4 bg-background/60 border border-primary/30 rounded-full overflow-hidden shadow-lg" />
          <div className="font-mono text-xs text-muted-foreground mt-1">{progress === 100 ? "Clone fully trained." : `Training... (${progress}%)`}</div>
        </div>

        {/* Data Management */}
        <div className="mb-8">
          <h2 className="text-xl font-mono text-primary mb-2">Your Data</h2>
          <div className="bg-background/40 border border-primary/20 rounded-lg p-4 mb-2">
            {files.length === 0 ? (
              <div className="text-muted-foreground font-mono text-sm">No files uploaded yet.</div>
            ) : (
              <ul className="divide-y divide-primary/10">
                {files.map((file, idx) => (
                  <li key={file.name} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" size={20} />
                      <span className="font-mono text-sm text-foreground">{file.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">({file.size})</span>
                      <span className={`font-mono text-xs px-2 py-0.5 rounded ${file.status === "Processed" ? "bg-primary/20 text-primary" : "bg-yellow-500/20 text-yellow-400"}`}>{file.status}</span>
                    </div>
                    <button onClick={() => handleDelete(idx)} className="ml-2 text-pink-500 hover:text-pink-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <CyberButton variant="neon" className="mt-2"><Upload className="mr-2" size={16} />Add More Data</CyberButton>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 justify-end">
          <CyberButton variant="neon" className="px-6" onClick={handleChat}><MessageCircle className="mr-2" size={18} />Chat with Clone</CyberButton>
          <CyberButton variant="ghost" className="px-6" onClick={handleRetrain}><RefreshCw className="mr-2" size={18} />Retrain</CyberButton>
        </div>
      </CyberCard>
    </div>
  );
};

export default Dashboard; 