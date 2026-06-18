"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "@/store/chatStore";
import { useMutation } from "@tanstack/react-query";

export function ChatWindow() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage, isLoading, setLoading, quickReplies, conversationId } = useChatStore();

  const chatMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: conversationId,
          text,
          language: "en", // could get from userStore
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    onSuccess: (data) => {
      addMessage({ role: "assistant", content: data.response });
      // If the API returned quick replies, we could set them here
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    addMessage({ role: "user", content: text.trim() });
    setInput("");
    setLoading(true);
    chatMutation.mutate(text.trim());
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-3xl mx-auto w-full pb-32">
        {/* Initial Greeting if no messages */}
        {messages.length === 0 && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0 border border-primary-500/30">
              <span className="text-xl">🙏</span>
            </div>
            <div className="bg-surface-800 border border-surface-700 rounded-2xl rounded-tl-sm p-4 text-text-primary max-w-[85%]">
              <p>Namaste. I'm here to listen, not judge.</p>
              <p className="mt-2">What's on your mind today?</p>
            </div>
          </div>
        )}

        {/* Message History */}
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                msg.role === "user" 
                  ? "bg-surface-700 border-surface-600" 
                  : "bg-primary-500/20 border-primary-500/30"
              }`}>
                {msg.role === "user" ? <span className="text-xl">👤</span> : <span className="text-xl">🙏</span>}
              </div>
              <div className={`rounded-2xl p-4 text-text-primary max-w-[85%] ${
                msg.role === "user"
                  ? "bg-primary-500/10 border border-primary-500/20 rounded-tr-sm"
                  : "bg-surface-800 border border-surface-700 rounded-tl-sm"
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0 border border-primary-500/30">
              <span className="text-xl">🙏</span>
            </div>
            <div className="bg-surface-800 border border-surface-700 rounded-2xl rounded-tl-sm p-4 text-text-primary max-w-[85%] flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
              <span className="text-text-secondary text-sm">Typing...</span>
            </div>
          </div>
        )}

        {/* Quick Replies */}
        {messages.length === 0 && quickReplies.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-4 pl-14">
            {["I'm not feeling well", "I need to find a doctor", "I'm worried about something", "I just want to talk"].map((reply, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(reply)}
                className="bg-surface-800 hover:bg-surface-700 border border-surface-600 text-text-secondary hover:text-text-primary text-sm px-4 py-2 rounded-full transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-3xl mx-auto relative flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Type your message..." 
            className="flex-1 bg-surface-800 border border-surface-600 rounded-full py-4 pl-6 pr-4 text-text-primary focus:outline-none focus:border-primary-500 transition-colors shadow-lg"
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 bg-primary-500 hover:bg-primary-400 disabled:opacity-50 disabled:hover:bg-primary-500 rounded-full flex items-center justify-center text-surface-900 transition-colors shrink-0"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
