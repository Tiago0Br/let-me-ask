import { useMutation, useQueryClient } from '@tanstack/react-query'
import { env } from '@/env'
import type { CreateQuestionRequest } from './types/create-question-request'
import type { CreateQuestionResponse } from './types/create-question-response'
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response'

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

    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        'get-room-questions',
        roomId,
      ])

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      }

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-room-questions', roomId],
        (oldData) => {
          if (!oldData) return oldData

          return {
            result: [newQuestion, ...oldData.result],
          }
        }
      )

      return { newQuestion, questions }
    },

    onSuccess: (data, _, context) => {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-room-questions', roomId],
        (questions) => {
          if (!questions || !context.newQuestion) return questions

          const updatedQuestions = questions.result.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...question,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              }
            }
            return question
          })

          return {
            result: updatedQuestions,
          }
        }
      )
    },

    onError: (_, __, context) => {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-room-questions', roomId],
          context.questions
        )
      }
    },
  })
}
