"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bot,
  Plus,
  MessageSquare,
  LogOut,
  User,
  Settings,
  Trash2,
  PanelLeft,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock conversation history
const conversations = [
  { id: "1", title: "Website Development Help", date: "Just now" },
  { id: "2", title: "Marketing Strategy Ideas", date: "2 hours ago" },
  { id: "3", title: "Product Feature Suggestions", date: "Yesterday" },
  { id: "4", title: "Technical Support", date: "2 days ago" },
  { id: "5", title: "Data Analysis Questions", date: "1 week ago" },
];

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Simulate logout
  const handleLogout = () => {
    router.push("/login");
  };

  // Start a new chat
  const handleNewChat = () => {
    router.push("/chat");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } h-screen bg-muted/40 border-r transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold">ChatAssist</span>
          </Link>
        </div>

        <div className="p-3">
          <Button
            onClick={handleNewChat}
            className="w-full bg-purple-600 hover:bg-purple-700 gap-2 justify-start"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <Separator />

        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-3 py-2">
                Recent Conversations
              </h3>
              {conversations.map((conversation) => (
                <Button
                  key={conversation.id}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3 px-3"
                  onClick={() => router.push(`/chat/${conversation.id}`)}
                >
                  <div className="flex items-start gap-3 w-full overflow-hidden">
                    <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-medium">
                        {conversation.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {conversation.date}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        <div className="p-3 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
            Clear conversations
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src="/placeholder.svg?height=24&width=24"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Toggle sidebar button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 left-3 z-10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="absolute top-3 right-3 z-10">
          <ModeToggle />
        </div>

        {children}
      </div>
    </div>
  );
}
