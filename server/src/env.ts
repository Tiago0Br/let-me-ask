import { z } from 'zod'

const _envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().startsWith('postgresql://').url(),
})

const _env = _envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
