import Link from "next/link"
import {
  ArrowUpRight,
  Brain,
  CalendarDays,
  CircleDot,
  MessageSquare,
  PenLine,
  Quote,
} from "lucide-react"

import { goals, recentDecisions } from "@/data/gent-os"

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"

export function Dashboard() {
  const recentEvents = goals.flatMap((goal) =>
    goal.events.map((event) => ({ ...event, goal: goal.title, slug: goal.slug }))
  )

  return (
    <div className="space-y-4 text-[#E1E0CC]">
      <section className="grid min-h-[calc(100vh-132px)] gap-4 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-black text-[#E1E0CC] shadow-[0_34px_120px_rgba(0,0,0,0.62)]">
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-45"
            src={heroVideo}
          />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/90" />
          <EditorialGrid />

          <div className="relative flex min-h-[640px] flex-col justify-between p-5 md:p-8 xl:min-h-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary/54">
                  private index / today
                </p>
                <h1 className="mt-6 max-w-5xl font-serif text-7xl italic leading-[0.86] text-[#E1E0CC] md:text-8xl xl:text-[9rem]">
                  What moved?
                </h1>
              </div>
              <span className="hidden rounded-full bg-primary px-4 py-2 text-xs font-medium text-black md:inline-flex">
                live draft
              </span>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              <IndexMetric label="active rooms" value="04" />
              <IndexMetric label="evidence" value={String(recentEvents.length).padStart(2, "0")} />
              <IndexMetric label="decisions" value="02" />
            </div>

            <div className="mt-10 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-2xl border border-primary/14 bg-black/42 p-4 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary/42">
                  operator prompt
                </p>
                <p className="mt-5 font-serif text-3xl italic leading-tight text-[#E1E0CC]">
                  The OS should make reality harder to ignore.
                </p>
                <p className="mt-5 text-sm leading-7 text-primary/54">
                  The next build is not decoration. It is structure: auth,
                  database, events, and AI tools that write real state.
                </p>
              </div>

              <div className="grid gap-2">
                {goals.map((goal, index) => (
                  <Link
                    key={goal.slug}
                    href={`/goals/${goal.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-primary/12 bg-[#101010]/72 p-3 transition hover:border-primary/34 hover:bg-primary hover:text-black"
                  >
                    <span className="font-serif text-4xl italic leading-none">
                      0{index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-lg leading-tight">{goal.title}</p>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-current/18">
                        <div
                          className="h-full rounded-full bg-current"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                    <ArrowUpRight className="size-4 opacity-45 transition group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <Panel title="AI input" eyebrow="typed operator" icon={MessageSquare}>
            <div className="rounded-2xl border border-primary/12 bg-black/50 p-4">
              <p className="font-serif text-3xl italic leading-tight text-[#E1E0CC]">
                &quot;I studied Spanish for 45 minutes today...&quot;
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs uppercase tracking-[0.14em]">
                <span className="rounded-full border border-primary/14 px-3 py-2 text-primary/58">
                  create event
                </span>
                <span className="rounded-full bg-primary px-3 py-2 text-black">
                  update state
                </span>
              </div>
            </div>
          </Panel>

          <Panel title="Evidence" eyebrow="what actually happened" icon={CircleDot}>
            <div className="divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/12 bg-black/42">
              {recentEvents.slice(0, 5).map((event) => (
                <Link
                  key={`${event.slug}-${event.title}`}
                  href={`/goals/${event.slug}`}
                  className="grid grid-cols-[1fr_auto] gap-4 p-3 transition hover:bg-primary hover:text-black"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{event.title}</p>
                    <p className="mt-1 truncate text-xs opacity-60">{event.goal}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase opacity-55">
                    {event.time}
                  </span>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Decisions" eyebrow="open loops" icon={PenLine}>
            <div className="space-y-2">
              {recentDecisions.map((decision) => (
                <article
                  key={decision.title}
                  className="rounded-2xl border border-primary/12 bg-black/42 p-3"
                >
                  <p className="text-sm font-medium text-[#E1E0CC]">{decision.title}</p>
                  <p className="mt-2 text-xs leading-5 text-primary/55">
                    {decision.body}
                  </p>
                </article>
              ))}
            </div>
          </Panel>
        </div>
      </section>
    </div>
  )
}

function Panel({
  title,
  eyebrow,
  icon: Icon,
  children,
}: {
  title: string
  eyebrow: string
  icon: typeof Brain
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[1.5rem] border border-primary/10 bg-[#101010] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.4)]">
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-primary/10 pb-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary/42">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-4xl italic leading-none text-[#E1E0CC]">
            {title}
          </h2>
        </div>
        <Icon className="size-5 text-primary/62" />
      </div>
      {children}
    </section>
  )
}

function IndexMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-primary/14 bg-black/42 p-4 backdrop-blur-md">
      <p className="text-[10px] uppercase tracking-[0.22em] text-primary/42">
        {label}
      </p>
      <p className="mt-5 font-serif text-6xl italic leading-none text-[#E1E0CC]">
        {value}
      </p>
    </div>
  )
}

function EditorialGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(222,219,200,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(222,219,200,0.10) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      <Quote className="absolute bottom-8 right-8 size-32 text-primary/[0.045]" />
      <CalendarDays className="absolute right-8 top-8 size-20 text-primary/[0.055]" />
    </div>
  )
}

export function ModulePlaceholder({
  title,
  eyebrow,
  description,
}: {
  title: string
  eyebrow: string
  description: string
}) {
  return (
    <section className="relative grid min-h-[calc(100vh-132px)] place-items-center overflow-hidden rounded-[1.75rem] bg-[#101010] p-5 text-center shadow-[0_34px_120px_rgba(0,0,0,0.55)]">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(222,219,200,0.12), transparent 34%), linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.5))",
        }}
      />
      <div className="relative max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary/48">
          {eyebrow}
        </p>
        <h1 className="mt-5 font-serif text-7xl italic leading-[0.88] text-[#E1E0CC] md:text-8xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-primary/58">
          {description}
        </p>
        <div className="mx-auto mt-8 grid max-w-md grid-cols-2 overflow-hidden rounded-full border border-primary/12 text-xs uppercase tracking-[0.14em]">
          <span className="border-r border-primary/12 p-3 text-primary/58">
            designed next
          </span>
          <span className="bg-primary p-3 text-black">not generic</span>
        </div>
      </div>
    </section>
  )
}
