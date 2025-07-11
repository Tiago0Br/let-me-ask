import { pgTable, text, timestamp, uuid, vector } from 'drizzle-orm/pg-core'
import { rooms } from './rooms.ts'

export const audioChunks = pgTable('audio_chunks', {
  id: uuid('id').defaultRandom().primaryKey(),
  roomId: uuid('room_id')
    .references(() => rooms.id)
    .notNull(),
  transcription: text('transcription').notNull(),
  embeddings: vector({ dimensions: 768 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
