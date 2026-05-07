import { KeyRound, Mail, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { signInWithMagicLink } from "./actions"

type LoginPageProps = {
  searchParams?: Promise<{
    email?: string
    error?: string
    next?: string
    sent?: string
  }>
}

const errorCopy = {
  auth: "Supabase could not send that link. Check the project keys and Auth email settings.",
  invalid_email: "Enter a valid email address.",
  missing_config: "Supabase environment variables are not configured yet.",
  not_allowed: "That email is not approved for this private workspace.",
} as const

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {}
  const error = params.error
    ? errorCopy[params.error as keyof typeof errorCopy] ?? "Something went wrong."
    : null

  return (
    <main className="grid min-h-screen place-items-center bg-black px-4 py-12 text-[#E1E0CC]">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary/46">
              Private access
            </p>
            <h1 className="mt-2 font-serif text-5xl italic leading-[0.88]">
              Gent OS
            </h1>
          </div>
          <div className="grid size-12 place-items-center rounded-full bg-primary text-black">
            <ShieldCheck className="size-5" />
          </div>
        </div>

        <form
          action={signInWithMagicLink}
          className="rounded-[1.35rem] border border-primary/12 bg-[#101010] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
        >
          <input name="next" type="hidden" value={params.next ?? "/dashboard"} />
          <div className="rounded-[1rem] bg-black p-4">
            <div className="flex items-center gap-2 text-sm text-primary">
              <KeyRound className="size-4" />
              Magic link
            </div>
            <p className="mt-3 text-sm leading-6 text-primary/58">
              Sign in with the approved email for this single-user workspace.
            </p>
          </div>

          <label
            className="mt-4 block text-[10px] uppercase tracking-[0.2em] text-primary/50"
            htmlFor="email"
          >
            Email
          </label>
          <div className="mt-2 flex gap-2">
            <Input
              autoComplete="email"
              className="h-11 rounded-full border-primary/14 bg-black/70 px-4 text-[#E1E0CC]"
              defaultValue={params.email ?? ""}
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
            <Button className="h-11 rounded-full px-4" type="submit">
              <Mail className="size-4" />
              Send
            </Button>
          </div>

          {params.sent ? (
            <p className="mt-4 rounded-lg border border-primary/12 bg-primary/8 px-3 py-2 text-sm text-primary">
              Check your inbox for the sign-in link.
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </main>
  )
}
