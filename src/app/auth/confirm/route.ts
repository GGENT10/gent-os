import type { EmailOtpType } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

import { isEmailAllowed } from "@/lib/auth/access"
import { createClient } from "@/lib/supabase/server"

function safeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard"
  }

  return value
}

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash")
  const type = request.nextUrl.searchParams.get("type") as EmailOtpType | null
  const next = safeNextPath(request.nextUrl.searchParams.get("next"))

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.search = ""

  if (tokenHash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    })

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!isEmailAllowed(user?.email)) {
        await supabase.auth.signOut()
        redirectTo.pathname = "/login"
        redirectTo.searchParams.set("error", "not_allowed")
        return NextResponse.redirect(redirectTo)
      }

      return NextResponse.redirect(redirectTo)
    }
  }

  redirectTo.pathname = "/login"
  redirectTo.searchParams.set("error", "auth")
  return NextResponse.redirect(redirectTo)
}
