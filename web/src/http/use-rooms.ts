import { useQuery } from '@tanstack/react-query'
import type { GetRoomsApiResponse } from './types/get-rooms-api-response'

export function useRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`)
      const result: GetRoomsApiResponse = await response.json()

      return result
    },
  })
}
