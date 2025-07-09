import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createRoomRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string().min(3),
          description: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, description } = request.body

      const result = await db
        .insert(schema.rooms)
        .values({
          name,
          description,
        })
        .returning()

      const createdRoom = result[0]

      if (!createdRoom) {
        throw new Error('Room not created')
      }

      return reply.status(201).send({
        roomId: createdRoom.id,
      })
    }
  )
}
