"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "./ChatWindow.module.css";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/** Convert basic markdown to HTML */
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^(\d+[\.\)]\s)/gm, '<span class="list-num">$1</span>')
    .replace(/^[-•]\s/gm, '<span class="list-bullet">• </span>')
    .replace(/\n/g, '<br/>');
}

export function ChatWindow() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    inputRef.current?.focus();
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No response stream");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      }
    } catch (error: unknown) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: t("chat.error"),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {/* Greeting */}
        {messages.length === 0 && !isLoading && (
          <>
            <div className={`${styles.row} ${styles.rowAssistant}`}>
              <div className={`${styles.avatar} ${styles.avatarAssistant}`}>🙏</div>
              <div className={`${styles.bubble} ${styles.bubbleAssistant}`}>
                <p>{t("chat.greeting1")}</p>
                <p style={{ marginTop: "0.5rem" }}>{t("chat.greeting2")}</p>
              </div>
            </div>
            <div className={styles.quickReplies}>
              {[
                t("chat.quick1"),
                t("chat.quick2"),
                t("chat.quick3"),
                t("chat.quick4"),
              ].map((reply, i) => (
                <button key={i} onClick={() => handleSend(reply)} className={styles.quickBtn}>
                  {reply}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Chat Messages */}
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`${styles.row} ${msg.role === "user" ? styles.rowUser : styles.rowAssistant}`}
            >
              {msg.role === "assistant" && (
                <div className={`${styles.avatar} ${styles.avatarAssistant}`}>🙏</div>
              )}
              <div className={`${styles.bubble} ${msg.role === "user" ? styles.bubbleUser : styles.bubbleAssistant}`}>
                {msg.role === "assistant" ? (
                  <div
                    className={styles.markdown}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                  />
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
              {msg.role === "user" && (
                <div className={`${styles.avatar} ${styles.avatarUser}`}>👤</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing */}
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${styles.row} ${styles.rowAssistant}`}
          >
            <div className={`${styles.avatar} ${styles.avatarAssistant}`}>🙏</div>
            <div className={`${styles.bubble} ${styles.bubbleAssistant} ${styles.typingBubble}`}>
              <Loader2 className={styles.spinner} />
              <span className={styles.typingText}>{t("chat.thinking")}</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.inputWrapper}>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className={styles.inputForm}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            disabled={isLoading}
            className={styles.input}
          />
          <button type="submit" disabled={!input.trim() || isLoading} className={styles.sendBtn}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
