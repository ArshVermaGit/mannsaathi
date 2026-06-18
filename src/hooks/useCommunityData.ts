import { useQuery } from '@tanstack/react-query'

export function useCommunityData(location: string) {
  return useQuery({
    queryKey: ['community', location],
    queryFn: () => fetch(`/api/community?location=${location}`).then(r => r.json()),
    staleTime: 10 * 60 * 1000   // 10 min
  })
}
