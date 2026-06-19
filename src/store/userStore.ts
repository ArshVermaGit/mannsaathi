import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserPreferences {
  language: 'en' | 'hi'
  locationCity: string | null
  locationPermissionGranted: boolean
  hasCompletedOnboarding: boolean
  hasSelectedLanguage: boolean
  lastCheckDate: string | null
  streakDays: number
  
  setLanguage: (lang: 'en' | 'hi') => void
  setHasSelectedLanguage: (value: boolean) => void
  setLocation: (city: string) => void
  completeOnboarding: () => void
  recordCheck: () => void
}

export const useUserStore = create<UserPreferences>()(
  persist(
    (set, get) => ({
      language: 'hi',
      locationCity: null,
      locationPermissionGranted: false,
      hasCompletedOnboarding: false,
      hasSelectedLanguage: false,
      lastCheckDate: null,
      streakDays: 0,
      
      setLanguage: (lang) => set({ language: lang }),
      setHasSelectedLanguage: (value) => set({ hasSelectedLanguage: value }),
      
      setLocation: (city) => set({ 
        locationCity: city,
        locationPermissionGranted: true
      }),
      
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      
      recordCheck: () => set((state) => {
        const today = new Date().toISOString().split('T')[0]
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        
        const newStreak = state.lastCheckDate === yesterday 
          ? state.streakDays + 1 
          : 1
          
        return { lastCheckDate: today, streakDays: newStreak }
      })
    }),
    { name: 'mannsaathi-user-prefs' }
  )
)
