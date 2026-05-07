"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  BarChart3,
  BookOpen,
  Brain,
  CircleUserRound,
  Command,
  HeartPulse,
  Home,
  Landmark,
  MessageSquare,
  PenLine,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react"

import { goals } from "@/data/me-os"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/goals", label: "Goals", icon: Activity },
  { href: "/journal", label: "Journal", icon: PenLine },
  { href: "/books", label: "Books", icon: BookOpen },
  { href: "/finance", label: "Finance", icon: Landmark },
  { href: "/health", label: "Health", icon: HeartPulse },
  { href: "/ai", label: "AI", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
]

const romanNumerals = ["I", "II", "III", "IV"]

export function AppShell({
  children,
  userEmail,
}: {
  children: React.ReactNode
  userEmail?: string
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen overflow-hidden bg-black text-[#E1E0CC]">
      <div className="bg-noise pointer-events-none fixed inset-0 opacity-[0.11]" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 8%, rgba(222,219,200,0.12), transparent 28%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.055), transparent 30%), linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.72))",
        }}
      />

      <div className="relative flex min-h-screen p-3 sm:p-4 lg:p-5">
        <aside className="hidden w-[292px] shrink-0 overflow-hidden rounded-[1.6rem] border border-primary/10 bg-[#101010]/95 text-[#E1E0CC] shadow-[0_30px_110px_rgba(0,0,0,0.55)] lg:block">
          <div className="flex h-full flex-col p-4">
            <Link
              href="/dashboard"
              className="block rounded-[1.25rem] bg-black p-4 transition hover:bg-[#161616]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-5xl font-medium leading-[0.85] tracking-[-0.08em] text-[#E1E0CC]">
                    Me OS
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-primary/46">
                    Private operating index
                  </p>
                </div>
                <div className="grid size-10 place-items-center rounded-full bg-primary text-black">
                  <Command className="size-5" />
                </div>
              </div>
            </Link>

            <nav className="mt-5 space-y-1.5">
              {navItems.map((item, index) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between rounded-full px-3 py-2.5 text-sm text-primary/54 transition hover:bg-primary/8 hover:text-[#E1E0CC]",
                      active && "bg-primary text-black hover:bg-primary hover:text-black"
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon className="size-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <span className="font-mono text-[10px] opacity-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-7 border-t border-primary/10 pt-5">
              <p className="px-3 text-[10px] uppercase tracking-[0.22em] text-primary/38">
                Open work
              </p>
              <div className="mt-3 space-y-2">
                {goals.slice(0, 4).map((goal, index) => (
                  <Link
                    key={goal.slug}
                    href={`/goals/${goal.slug}`}
                    className="block rounded-2xl border border-primary/10 bg-[#171717] p-3 text-primary/62 transition hover:border-primary/28 hover:bg-[#212121] hover:text-[#E1E0CC]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="min-w-0 truncate text-sm">{goal.title}</span>
                      <span className="font-serif text-xl italic leading-none">
                        {romanNumerals[index]}
                      </span>
                    </div>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-primary/12">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto rounded-[1.25rem] border border-primary/12 bg-black p-4">
              <div className="flex items-center gap-2 text-[#E1E0CC]">
                <ShieldCheck className="size-4 text-primary" />
                <span className="text-sm">Private mode</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-primary/48">
                Four active systems, two open decisions, all evidence waiting to
                become durable state.
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 lg:pl-4">
          <TopBar pathname={pathname} userEmail={userEmail} />
          <div className="mx-auto w-full max-w-[1680px] pb-24 pt-3 lg:pt-4">
            {children}
          </div>
        </main>
      </div>

      <MobileDock pathname={pathname} />
    </div>
  )
}

function TopBar({
  pathname,
  userEmail,
}: {
  pathname: string
  userEmail?: string
}) {
  const title =
    navItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
      ?.label ?? "Me OS"

  return (
    <header className="sticky top-3 z-40 rounded-[1.35rem] border border-primary/10 bg-[#101010]/82 px-3 py-3 text-[#E1E0CC] shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:px-5 lg:top-5 lg:px-5">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-black lg:hidden"
            aria-label="Dashboard"
          >
            <Command className="size-5" />
          </Link>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary/46">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
            <h1 className="truncate text-2xl leading-none tracking-[-0.04em] text-[#E1E0CC] md:text-3xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="hidden min-w-[320px] max-w-xl flex-1 items-center gap-3 rounded-full border border-primary/10 bg-black/55 px-4 py-2.5 text-primary/42 md:flex">
          <Search className="size-4 shrink-0 text-primary/68" />
          <span className="truncate text-sm">Search memory, goals, decisions</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs text-black sm:flex">
            <BarChart3 className="size-4" />
            4 active systems
          </div>
          <button
            className="grid size-10 place-items-center rounded-full border border-primary/12 bg-black/60 text-primary transition hover:bg-primary hover:text-black"
            aria-label="AI brief"
          >
            <Brain className="size-4" />
          </button>
          <form action="/auth/signout" method="post">
            <button
              className="grid size-10 place-items-center rounded-full border border-primary/12 bg-black/60 text-primary transition hover:bg-primary hover:text-black"
              aria-label="Sign out"
              title={userEmail ? `Signed in as ${userEmail}` : "Sign out"}
              type="submit"
            >
              <CircleUserRound className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}

function MobileDock({ pathname }: { pathname: string }) {
  const mobileItems = navItems.slice(0, 5)

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-6 rounded-full border border-primary/12 bg-[#101010]/92 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.62)] backdrop-blur-xl lg:hidden">
      {mobileItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "grid size-10 place-items-center rounded-full text-primary/48",
              active && "bg-primary text-black"
            )}
            aria-label={item.label}
          >
            <Icon className="size-4" />
          </Link>
        )
      })}
      <Link
        href="/ai"
        className={cn(
          "grid size-10 place-items-center rounded-full text-primary/48",
          pathname.startsWith("/ai") && "bg-primary text-black"
        )}
        aria-label="AI"
      >
        <MessageSquare className="size-4" />
      </Link>
    </nav>
  )
}
