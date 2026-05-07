import { AppShell } from "@/components/app-shell/app-shell"
import { requireUser } from "@/server/auth"

export default async function PrivateAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()

  return <AppShell userEmail={user.email}>{children}</AppShell>
}
