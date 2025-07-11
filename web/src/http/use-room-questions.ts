import { useQuery } from '@tanstack/react-query'
import { env } from '@/env'
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response'

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-room-questions', roomId],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/rooms/${roomId}/questions`)
      const result: GetRoomQuestionsResponse = await response.json()

      return result
    },
  })
}
