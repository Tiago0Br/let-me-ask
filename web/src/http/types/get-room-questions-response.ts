export interface GetRoomQuestionsResponse {
  result: {
    id: string
    question: string
    answer?: string | null
    createdAt: string
    isGeneratingAnswer?: boolean
  }[]
}
