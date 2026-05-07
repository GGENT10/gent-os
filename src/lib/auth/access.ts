const defaultAllowedEmail = "georgegent@proton.me"

export function parseAllowedEmails(value: string | undefined) {
  const emailList = value?.trim() ? value : defaultAllowedEmail

  return new Set(
    emailList
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  )
}

export function isEmailAllowed(
  email: string | null | undefined,
  allowedEmails = parseAllowedEmails(process.env.SUPABASE_AUTH_ALLOWED_EMAILS),
) {
  if (allowedEmails.size === 0) {
    return false
  }

  return Boolean(email && allowedEmails.has(email.toLowerCase()))
}

export function getAllowedEmailList() {
  return parseAllowedEmails(process.env.SUPABASE_AUTH_ALLOWED_EMAILS)
}
