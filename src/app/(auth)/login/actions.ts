"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

import { isEmailAllowed } from "@/lib/auth/access"
import { createClient } from "@/lib/supabase/server"

const magicLinkSchema = z.object({
  email: z.email().trim().toLowerCase(),
  next: z.string().optional(),
})

function safeNextPath(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard"
  }

  return value
}

async function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  const headerStore = await headers()
  return headerStore.get("origin") ?? "http://localhost:3000"
}

export async function signInWithMagicLink(formData: FormData) {
  const parsed = magicLinkSchema.safeParse({
    email: formData.get("email"),
    next: formData.get("next")?.toString(),
  })

  if (!parsed.success) {
    redirect("/login?error=invalid_email")
  }

  const { email } = parsed.data
  const next = safeNextPath(parsed.data.next)

  if (!isEmailAllowed(email)) {
    redirect("/login?error=not_allowed")
  }

  const siteUrl = await getSiteUrl()
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/confirm?next=${encodeURIComponent(next)}`,
      shouldCreateUser: false,
    },
  })

  if (error) {
    redirect("/login?error=auth")
  }

  revalidatePath("/", "layout")
  redirect(`/login?sent=1&email=${encodeURIComponent(email)}`)
}
