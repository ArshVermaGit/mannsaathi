import { useMutation } from '@tanstack/react-query'
import { useSymptomStore } from '@/store/symptomStore'
import type { SymptomInput } from '@/types/symptom'

export function useAnalyzeSymptoms() {
  const setResult = useSymptomStore(state => state.setResult)

  return useMutation({
    mutationFn: (input: SymptomInput) => 
      fetch('/api/symptoms/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      }).then(r => {
        if (!r.ok) throw new Error('Analysis failed')
        return r.json()
      }),
    onSuccess: (data) => {
      setResult(data)
    }
  })
}
