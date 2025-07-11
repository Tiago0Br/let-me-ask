import { useMutation, useQueryClient } from '@tanstack/react-query'
import { env } from '@/env'
import type { CreateQuestionRequest } from './types/create-question-request'
import type { CreateQuestionResponse } from './types/create-question-response'

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ question }: CreateQuestionRequest) => {
      const response = await fetch(`${env.VITE_API_URL}/rooms/${roomId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      const result: CreateQuestionResponse = await response.json()

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-room-questions', roomId] })
    },
  })
}
