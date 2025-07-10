import { useNavigate, useParams } from 'react-router-dom'

type RoomDetailsProps = {
  roomId: string
}

export function RoomDetails() {
  const navigate = useNavigate()
  const { roomId } = useParams<RoomDetailsProps>()

  if (!roomId) {
    navigate('/', { replace: true })
    return
  }

  return (
    <div>
      <h1>Detalhes da sala: {roomId}</h1>
    </div>
  )
}
