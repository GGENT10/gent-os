import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import { getServerEnv } from "@/lib/env"
import * as schema from "@/db/schema"

type GlobalWithDb = typeof globalThis & {
  __gentOsSql?: postgres.Sql
}

const globalForDb = globalThis as GlobalWithDb

export function getDb() {
  const env = getServerEnv()

  globalForDb.__gentOsSql ??= postgres(env.databaseUrl, {
    max: 5,
    prepare: false,
  })

  return drizzle(globalForDb.__gentOsSql, { schema })
}

export type Db = ReturnType<typeof getDb>
