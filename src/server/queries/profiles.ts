import { eq } from "drizzle-orm"

import { getDb } from "@/db/client"
import { profiles } from "@/db/schema"
import { requireUser } from "@/server/auth"

export async function getCurrentProfile() {
  const user = await requireUser()
  const db = getDb()

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, user.id))

  return profile ?? null
}
