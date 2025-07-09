import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { rooms } from './rooms.ts'

export const questions = pgTable('questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  roomId: uuid('room_id')
    .notNull()
    .references(() => rooms.id),
  question: text('question').notNull(),
  answer: text('answer'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
