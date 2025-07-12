import { reset, seed } from 'drizzle-seed'
import { client, db } from './connection.ts'
import { schema } from './schema/index.ts'

const schemasToSeed = {
  rooms: schema.rooms,
  questions: schema.questions,
}

await reset(db, schema)
await seed(db, schemasToSeed).refine((f) => {
  return {
    rooms: {
      count: 10,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
        createdAt: f.date({ maxDate: new Date(), minDate: new Date('2025-01-01') }),
      },
    },
    questions: {
      count: 30,
      columns: {
        createdAt: f.date({ maxDate: new Date(), minDate: new Date('2025-01-01') }),
      },
    },
  }
})

await client.end()
