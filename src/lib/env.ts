import { z } from "zod"

const publicSupabaseSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
})

const serverSchema = publicSupabaseSchema.extend({
  DATABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
  SUPABASE_AUTH_ALLOWED_EMAILS: z.string().optional(),
})

function formatEnvError(error: z.ZodError) {
  return error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ")
}

export function getPublicSupabaseEnv() {
  const parsed = publicSupabaseSchema.safeParse(process.env)

  if (!parsed.success) {
    throw new Error(`Missing Supabase public environment: ${formatEnvError(parsed.error)}`)
  }

  return {
    url: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: parsed.data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  }
}

export function getServerEnv() {
  const parsed = serverSchema.safeParse(process.env)

  if (!parsed.success) {
    throw new Error(`Missing server environment: ${formatEnvError(parsed.error)}`)
  }

  return {
    databaseUrl: parsed.data.DATABASE_URL,
    siteUrl: parsed.data.NEXT_PUBLIC_SITE_URL,
    supabaseUrl: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
    supabasePublishableKey: parsed.data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    allowedEmails: parsed.data.SUPABASE_AUTH_ALLOWED_EMAILS,
  }
}
