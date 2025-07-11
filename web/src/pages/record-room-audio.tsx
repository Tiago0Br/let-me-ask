import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { env } from '@/env'

type RecordRoomAudioProps = {
  roomId: string
}

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

export function RecordRoomAudio() {
  const { roomId } = useParams<RecordRoomAudioProps>()
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()
    formData.append('file', audio, 'audio.webm')

    const response = await fetch(`${env.VITE_API_URL}/rooms/${roomId}/audio`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      toast.success('Gravação enviada com sucesso.')
    }
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      toast.error('Navegador não suporta gravação de áudio')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        const audio = new Blob([event.data], { type: 'audio/webm' })

        uploadAudio(audio)
      }
    }

    recorder.current.onstart = () => {
      toast.success('Gravação iniciada.')
    }

    recorder.current.onstop = () => {
      setIsRecording(false)
      toast.success('Gravação finalizada.')
    }

    recorder.current.start()
  }

  return (
    <div className="flex flex-col gap-3 h-screen items-center justify-center">
      <Button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Parar' : 'Iniciar'} Gravação
      </Button>
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  )
}
