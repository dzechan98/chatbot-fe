"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, Paperclip, Mic, User } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand your question. Let me think about that...",
        "That's an interesting point. Here's what I can tell you...",
        "Based on my knowledge, I'd recommend considering the following...",
        "I can help with that! Here's some information that might be useful...",
        "Great question! The answer depends on several factors...",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <p className="text-xs text-muted-foreground">Always online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : ""}`}>
            {message.sender === "bot" && (
              <Avatar className="mt-1 w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                <AvatarFallback>
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-purple-600 text-white" : "bg-muted"
              }`}
            >
              <div className="space-y-1">
                <p>{message.content}</p>
                <p className={`text-xs ${message.sender === "user" ? "text-purple-100" : "text-muted-foreground"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
            {message.sender === "user" && (
              <Avatar className="mt-1 w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <Avatar className="mt-1 w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
              <AvatarFallback>
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[80%] rounded-lg p-3 bg-muted">
              <div className="flex space-x-1">
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

      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button type="button" variant="outline" size="icon" className="shrink-0">
            <Paperclip className="w-4 h-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="button" variant="outline" size="icon" className="shrink-0">
            <Mic className="w-4 h-4" />
            <span className="sr-only">Voice input</span>
          </Button>
          <Button type="submit" size="icon" className="shrink-0 bg-purple-600 hover:bg-purple-700">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
