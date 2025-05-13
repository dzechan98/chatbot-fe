"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Focus the input when the component mounts
    inputRef.current?.focus();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand your question. Let me think about that...\n\nBased on my knowledge, I can tell you that this is a complex topic with several aspects to consider. First, it's important to understand the fundamentals. Then, we can explore the practical applications and potential challenges.\n\nWould you like me to elaborate on any specific part of this?",
        "That's an interesting point. Here's what I can tell you...\n\nThe concept you're asking about has evolved significantly over time. Current research suggests multiple approaches, each with their own advantages and limitations.\n\nI'd be happy to provide more specific information if you can clarify which aspect you're most interested in.",
        "Based on my knowledge, I'd recommend considering the following...\n\n1. Start with a clear understanding of your goals\n2. Research the available tools and methodologies\n3. Implement a step-by-step approach\n4. Regularly evaluate and adjust your strategy\n\nThis structured approach tends to yield the best results in most scenarios.",
        "I can help with that! Here's some information that might be useful...\n\nThe topic you're inquiring about is quite nuanced. There are several schools of thought, but recent developments have led to some consensus among experts.\n\nThe key principles to keep in mind are adaptability, efficiency, and sustainability. Would you like me to provide some practical examples?",
        "Great question! The answer depends on several factors...\n\nContext is particularly important here, as the optimal approach can vary significantly based on your specific circumstances. Generally speaking, it's advisable to:\n\n- Analyze your current situation\n- Identify potential constraints\n- Consider both short-term and long-term implications\n- Consult relevant case studies or precedents\n\nDoes this address what you were looking for?",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full pt-14">
      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-6 pb-24">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-4 rounded-lg",
                message.sender === "user" ? "justify-end" : ""
              )}
            >
              {message.sender === "bot" && (
                <Avatar className="mt-1 w-8 h-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="AI"
                  />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-lg p-4",
                  message.sender === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-muted"
                )}
              >
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
              {message.sender === "user" && (
                <Avatar className="mt-1 w-8 h-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-600">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-4 rounded-lg">
              <Avatar className="mt-1 w-8 h-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="AI"
                />
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[85%] rounded-lg p-4 bg-muted">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4">
        <form
          onSubmit={handleSendMessage}
          className="max-w-3xl mx-auto relative"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message ChatAssist..."
            className="pr-12 py-6 text-base"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent text-foreground"
            disabled={!input.trim() || isTyping}
          >
            <Send
              className={`w-5 h-5 ${
                input.trim() ? "text-purple-600" : "text-muted-foreground"
              }`}
            />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
        <p className="text-xs text-center text-muted-foreground mt-2">
          ChatAssist can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
