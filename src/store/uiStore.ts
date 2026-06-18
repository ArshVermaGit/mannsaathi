import { create } from 'zustand'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

interface UIState {
  activeModal: string | null
  modalData: Record<string, any>
  mobileNavOpen: boolean
  toasts: Toast[]
  
  openModal: (id: string, data?: Record<string, any>) => void
  closeModal: () => void
  toggleMobileNav: () => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIState>()((set) => ({
  activeModal: null,
  modalData: {},
  mobileNavOpen: false,
  toasts: [],
  
  openModal: (id, data = {}) => set({ activeModal: id, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: {} }),
  toggleMobileNav: () => set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
  
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }]
  })),
  
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  }))
}))
