export interface GetRoomsApiResponse {
  result: {
    id: string
    name: string
    questionsCount: number
    createdAt: string
  }[]
}
