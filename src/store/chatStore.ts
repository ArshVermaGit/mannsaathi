import { create } from 'zustand'
import type { ChatMessage } from '@/types/chat'
import { v4 as uuid } from 'uuid'

interface ChatState {
  conversationId: string
  messages: ChatMessage[]
  isLoading: boolean
  quickReplies: string[]
  language: 'en' | 'hi'
  
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  setLoading: (loading: boolean) => void
  setQuickReplies: (replies: string[]) => void
  clearQuickReplies: () => void
  setLanguage: (lang: 'en' | 'hi') => void
  newConversation: () => void
}

export const useChatStore = create<ChatState>()((set) => ({
  conversationId: uuid(),
  messages: [],
  isLoading: false,
  quickReplies: [],
  language: 'hi',   // default Hindi for Indian users
  
  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      { ...message, id: uuid(), timestamp: new Date() }
    ],
    quickReplies: []  // clear after any message
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  setQuickReplies: (replies) => set({ quickReplies: replies }),
  clearQuickReplies: () => set({ quickReplies: [] }),
  setLanguage: (lang) => set({ language: lang }),
  
  newConversation: () => set({
    conversationId: uuid(),
    messages: [],
    isLoading: false,
    quickReplies: []
  })
}))
