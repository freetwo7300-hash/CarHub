"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send } from "@/lib/icons"
import { Card } from "@/components/ui/card"

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can we help you today?", sender: "bot", timestamp: new Date() },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: input, sender: "user", timestamp: new Date() }])
      setInput("")

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Thanks for your message! Our team will respond shortly.",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
      }, 500)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-slide-up"
      >
        <div className="w-6 h-6">
          {isOpen ? <X /> : <MessageCircle />}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-96 shadow-2xl flex flex-col animate-slide-up z-40">
          <div className="bg-accent text-accent-foreground p-4 rounded-t-lg">
            <h3 className="font-semibold">Live Chat Support</h3>
            <p className="text-sm opacity-90">We typically reply in minutes</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button size="sm" onClick={handleSend} className="bg-accent hover:bg-accent/90">
              <div className="w-4 h-4">
                <Send />
              </div>
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
