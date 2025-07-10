export interface GetRoomsResponse {
  result: {
    id: string
    name: string
    questionsCount: number
    createdAt: string
  }[]
}
