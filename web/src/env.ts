import { z } from 'zod/v4'

export const _env = z.object({
  VITE_API_URL: z.url({ error: 'VITE_API_URL must be a valid URL' }),
})

const result = _env.safeParse(import.meta.env)

if (!result.success) {
  throw new Error(`Invalid environment variables: ${result.error.message}`)
}

export const env = result.data
