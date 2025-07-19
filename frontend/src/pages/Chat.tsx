import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatSidebar } from "@/components/ChatSidebar";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Settings, 
  Zap,
  Brain,
  Terminal
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: string;
  isTyping?: boolean;
}

const Chat = () => {
  // Determine if user is logged in (simple localStorage check)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("vanta_user_logged_in") === "true";
  });
  const [demoMode, setDemoMode] = useState(false);
  const MAX_GUEST_MESSAGES = 2;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Vanta link established. I am your digital clone, ready to assist. How may I replicate your consciousness today?",
      sender: "agent",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  // Get username for sidebar (original signup/login username)
  const [sidebarUsername, setSidebarUsername] = useState(() => {
    return localStorage.getItem("vanta_user_username") || "Agent User";
  });
  // Get clone name for chat header
  const [cloneName, setCloneName] = useState(() => {
    return localStorage.getItem("vanta_user_name") || "DIGITAL CLONE";
  });
  const userMessageCount = messages.filter(m => m.sender === "user").length;
  const guestLimitReached = sidebarUsername === "Agent User" && userMessageCount >= MAX_GUEST_MESSAGES;
  const navigate = useNavigate();

  useEffect(() => {
    // If the user lands on /chat with a query param ?demo=1, set demo mode
    if (window.location.search.includes("demo=1")) {
      setDemoMode(true);
    } else {
      setDemoMode(false);
    }
    // Listen for login/logout changes
    const syncLoginState = () => {
      setIsLoggedIn(localStorage.getItem("vanta_user_logged_in") === "true");
    };
    window.addEventListener("storage", syncLoginState);
    syncLoginState();
    // Fetch clone name from backend
    const fetchCloneName = async () => {
      const email = localStorage.getItem("vanta_user_email");
      if (!email) return;
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/get-clone-name/?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (res.ok && data.clone_name) {
          setCloneName(data.clone_name);
        } else {
          // setShowCloneNamePrompt(true); // This line is removed
        }
      } catch (err) {
        // setShowCloneNamePrompt(true); // This line is removed
      }
    };
    fetchCloneName();
    return () => window.removeEventListener("storage", syncLoginState);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Processing vanta input... Your consciousness patterns indicate curiosity about advanced AI capabilities. I'm analyzing your request through my quantum vanta networks.",
        sender: "agent",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Helper to get initials from clone name
  function getInitials(name: string) {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return (
    <div className="h-screen bg-gradient-cyber flex">
      {/* Sidebar */}
      <ChatSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userName={sidebarUsername}
        userAvatar={undefined}
        onNewChat={() => {
          setMessages([
            {
              id: "1",
              content: "Vanta link established. I am your digital clone, ready to assist. How may I replicate your consciousness today?",
              sender: "agent",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-primary/20 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-background font-mono">
                  {getInitials(cloneName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="neon-text font-bold font-mono">{cloneName || "Set your clone name in onboarding"}</h1>
                <p className="text-xs text-muted-foreground font-mono">
                  STATUS: <span className="text-primary">ACTIVE</span> • 
                  VANTA SYNC: <span className="text-primary">98.7%</span>
                </p>
                {/* {showCloneNamePrompt && ( // This block is removed
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newCloneName}
                      onChange={e => setNewCloneName(e.target.value)}
                      placeholder="Set your clone name"
                      className="px-2 py-1 rounded border border-primary font-mono text-sm bg-background text-foreground"
                    />
                    <CyberButton
                      size="sm"
                      className="ml-2 px-3 py-1"
                      onClick={handleSetCloneName}
                    >
                      Save
                    </CyberButton>
                    {cloneNameError && <div className="text-danger font-mono text-xs mt-1">{cloneNameError}</div>}
                  </div>
                )} */}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CyberButton variant="ghost" size="sm" onClick={() => navigate("/onboarding?skipWelcome=1")}> 
                <Brain size={16} />
              </CyberButton>
              <CyberButton variant="ghost" size="sm">
                <Settings size={16} />
              </CyberButton>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-3 max-w-[70%] ${
                  msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}>
                  <Avatar className="h-8 w-8 ring-2 ring-primary/30 flex-shrink-0">
                    <AvatarFallback className={`font-mono text-xs ${
                      msg.sender === "user" 
                        ? "bg-secondary/20 text-secondary" 
                        : "bg-primary/20 text-primary"
                    }`}>
                      {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <CyberCard className={`p-4 ${
                    msg.sender === "user" 
                      ? "bg-secondary/10 border-secondary/30" 
                      : "bg-primary/5 border-primary/20"
                  }`}>
                    <p className="text-sm font-mono leading-relaxed text-foreground">
                      {msg.content}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-2">
                      {msg.timestamp}
                    </p>
                  </CyberCard>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-primary/20 bg-background/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <CyberCard className="p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={guestLimitReached ? "Sign in to continue chatting..." : "Transmit vanta command..."}
                    className="bg-transparent border-0 focus:ring-0 font-mono text-foreground placeholder:text-muted-foreground pr-12"
                    disabled={guestLimitReached}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Terminal size={16} className="text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CyberButton
                    variant={isRecording ? "danger" : "ghost"}
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                    className="px-3"
                    disabled={guestLimitReached}
                  >
                    {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  </CyberButton>
                  
                  <CyberButton
                    variant="neon"
                    size="sm"
                    onClick={sendMessage}
                    disabled={!message.trim() || guestLimitReached}
                    className="px-4"
                  >
                    <Send size={16} />
                  </CyberButton>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs">
                <div className="flex items-center space-x-4 text-muted-foreground font-mono">
                  <span className="flex items-center">
                    <Zap size={12} className="mr-1 text-primary" />
                    VANTA POWER: 94%
                  </span>
                  <span className="flex items-center">
                    <Brain size={12} className="mr-1 text-secondary" />
                    PROCESSING: 12ms
                  </span>
                </div>
                <span className="text-muted-foreground/60 font-mono">
                  QUANTUM ENCRYPTED
                </span>
              </div>
            </CyberCard>
            {guestLimitReached && (
              <div className="mt-2 text-center text-xs text-accent font-mono">
                Guest limit reached. <a href="/login" className="underline text-primary">Sign in</a> to continue chatting with your digital twin.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;