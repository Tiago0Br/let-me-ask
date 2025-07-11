import { count, desc, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const getRoomsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/rooms',
    {
      schema: {
        querystring: z.object({
          limit: z.coerce.number().default(5),
          offset: z.coerce.number().default(0),
        }),
      },
    },
    async (request) => {
      const { limit, offset } = request.query

      console.log(limit, offset)

      const result = await db
        .select({
          id: schema.rooms.id,
          name: schema.rooms.name,
          questionsCount: count(schema.questions.id),
          createdAt: schema.rooms.createdAt,
        })
        .from(schema.rooms)
        .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
        .groupBy(schema.rooms.id, schema.rooms.name)
        .orderBy(desc(schema.rooms.createdAt))
        .limit(limit)
        .offset(offset)

      return {
        result,
      }
    }
  )
}
