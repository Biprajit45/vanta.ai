import { useState } from "react";
import { CyberCard } from "./CyberCard";
import { CyberButton } from "./CyberButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  User, 
  Bot, 
  Settings, 
  LogOut, 
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

interface ChatSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  userName?: string;
  userAvatar?: string;
  onNewChat?: () => void;
}

export const ChatSidebar = ({ 
  isCollapsed = false, 
  onToggle,
  userName = "Agent User",
  userAvatar,
  onNewChat
}: ChatSidebarProps) => {
  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "AI Agent Setup",
      timestamp: "2 hours ago",
      preview: "How do I configure my digital clone?"
    },
    {
      id: "2", 
      title: "Voice Training",
      timestamp: "1 day ago",
      preview: "Training voice patterns for better mimicry"
    },
    {
      id: "3",
      title: "Personality Matrix",
      timestamp: "2 days ago", 
      preview: "Defining behavioral patterns and responses"
    },
    {
      id: "4",
      title: "Memory Core",
      timestamp: "3 days ago",
      preview: "Uploading personal memories and experiences"
    }
  ]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("vanta_user_logged_in");
    localStorage.removeItem("vanta_user_name");
    localStorage.removeItem("vanta_user_username");
    localStorage.removeItem("vanta_user_email");
    navigate("/");
    window.location.reload(); // Ensures state is reset
  };

  return (
    <div className={cn(
      "h-screen bg-background/50 backdrop-blur-sm border-r border-primary/20 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-80"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-primary/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="neon-text text-lg font-bold font-mono">VANTA LINK</h2>
          )}
          <CyberButton
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="ml-auto"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </CyberButton>
        </div>
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-b border-primary/20">
          <CyberCard className="p-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="bg-primary/20 text-primary font-mono">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary font-mono truncate">
                  {userName}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  AGENT_STATUS: ACTIVE
                </p>
              </div>
            </div>
          </CyberCard>
        </div>
      )}

      {/* New Chat Button */}
      <div className="p-4">
        <CyberButton 
          variant="neon" 
          className={cn("w-full", isCollapsed && "px-2")}
          onClick={onNewChat}
        >
          <Plus size={16} />
          {!isCollapsed && <span className="ml-2">NEW CHAT</span>}
        </CyberButton>
      </div>

      {/* Chat History */}
      <div className="flex-1 px-4">
        {!isCollapsed && (
          <>
            <h3 className="text-sm font-mono text-muted-foreground mb-3 tracking-wider">
              RECENT SESSIONS
            </h3>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <CyberCard 
                    key={chat.id} 
                    className="p-3 cursor-pointer hover:border-primary/40 transition-all group"
                  >
                    <div className="flex items-start space-x-2">
                      <MessageSquare size={14} className="text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground font-mono truncate group-hover:text-primary transition-colors">
                          {chat.title}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono truncate">
                          {chat.preview}
                        </p>
                        <p className="text-xs text-muted-foreground/60 font-mono mt-1">
                          {chat.timestamp}
                        </p>
                      </div>
                    </div>
                  </CyberCard>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-primary/20 space-y-2">
        <CyberButton 
          variant="ghost" 
          className={cn("w-full justify-start", isCollapsed && "justify-center px-2")}
        >
          <Settings size={16} />
          {!isCollapsed && <span className="ml-2">SETTINGS</span>}
        </CyberButton>
        <CyberButton 
          variant="danger" 
          className={cn("w-full justify-start", isCollapsed && "justify-center px-2")}
          onClick={handleLogout}
        >
          <LogOut size={16} />
          {!isCollapsed && <span className="ml-2">DISCONNECT</span>}
        </CyberButton>
      </div>
    </div>
  );
};