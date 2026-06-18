import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SymptomResult } from '@/types/symptom'

interface SymptomState {
  currentStep: number                    // 0-4
  pathway: string | null                 // 'mental' | 'physical' | 'fatigue' | 'general'
  selectedSymptomIds: string[]
  customText: string
  durationDays: number
  severity: number                       // 1-10
  language: 'en' | 'hi' | 'auto'
  
  isAnalyzing: boolean
  result: SymptomResult | null
  error: string | null
  
  setStep: (step: number) => void
  setPathway: (pathway: string) => void
  toggleSymptom: (id: string) => void
  setCustomText: (text: string) => void
  setDuration: (days: number) => void
  setSeverity: (value: number) => void
  setResult: (result: SymptomResult) => void
  setAnalyzing: (loading: boolean) => void
  reset: () => void
}

export const useSymptomStore = create<SymptomState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      pathway: null,
      selectedSymptomIds: [],
      customText: '',
      durationDays: 1,
      severity: 5,
      language: 'auto',
      isAnalyzing: false,
      result: null,
      error: null,
      
      setStep: (step) => set({ currentStep: step }),
      setPathway: (pathway) => set({ pathway, currentStep: 1 }),
      
      toggleSymptom: (id) => set((state) => ({
        selectedSymptomIds: state.selectedSymptomIds.includes(id)
          ? state.selectedSymptomIds.filter(s => s !== id)
          : [...state.selectedSymptomIds, id]
      })),
      
      setCustomText: (text) => set({ customText: text }),
      setDuration: (days) => set({ durationDays: days }),
      setSeverity: (value) => set({ severity: value }),
      setResult: (result) => set({ result, isAnalyzing: false }),
      setAnalyzing: (loading) => set({ isAnalyzing: loading }),
      
      reset: () => set({
        currentStep: 0, pathway: null, selectedSymptomIds: [],
        customText: '', durationDays: 1, severity: 5,
        isAnalyzing: false, result: null, error: null
      })
    }),
    {
      name: 'mannsaathi-symptom',
      partialize: (state) => ({
        result: state.result,
        pathway: state.pathway
      })
    }
  )
)
