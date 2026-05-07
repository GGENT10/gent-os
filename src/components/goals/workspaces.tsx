import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Car,
  Check,
  FileText,
  GraduationCap,
  Languages,
  Library,
  ListChecks,
  NotebookPen,
  PenLine,
  Route,
  Sparkles,
  Timer,
} from "lucide-react"

import type { Goal } from "@/data/me-os"

export function GoalWorkspace({ goal }: { goal: Goal }) {
  switch (goal.slug) {
    case "spanish-to-b2":
      return <SpanishWorkspace goal={goal} />
    case "georgia-drivers-license":
      return <DriversWorkspace goal={goal} />
    case "us-education-immigration":
      return <StrategyWorkspace goal={goal} />
    case "reading-system":
      return <ReadingWorkspace goal={goal} />
  }
}

function WorkspaceFrame({
  goal,
  eyebrow,
  title,
  icon,
  children,
}: {
  goal: Goal
  eyebrow: string
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4 text-[#E1E0CC]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/goals"
          className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-[#101010] px-3 py-2 text-sm text-primary/68 transition hover:bg-primary hover:text-black"
        >
          <ArrowLeft className="size-4" />
          command map
        </Link>
        <div className="grid grid-cols-2 overflow-hidden rounded-full border border-primary/12 text-xs uppercase tracking-[0.14em]">
          <span className="border-r border-primary/12 px-3 py-2 text-primary/58">
            {goal.status}
          </span>
          <span className="bg-primary px-3 py-2 text-black">P{goal.priority}</span>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[1.75rem] bg-black text-[#E1E0CC] shadow-[0_34px_120px_rgba(0,0,0,0.58)]">
        <EditorialField />
        <div className="relative grid gap-8 p-5 md:p-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-primary text-black">
                {icon}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary/50">
                  {eyebrow}
                </p>
                <p className="mt-1 text-sm text-primary/45">{goal.category}</p>
              </div>
            </div>
            <h1 className="max-w-5xl text-6xl font-medium leading-[0.84] tracking-[-0.07em] md:text-8xl">
              {title}
            </h1>
          </div>
          <div className="rounded-2xl border border-primary/14 bg-[#101010]/70 p-4 backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary/45">
              north star
            </p>
            <p className="mt-4 font-serif text-3xl italic leading-tight">
              {goal.northStar}
            </p>
            <Progress value={goal.progress} tone="light" className="mt-6" />
          </div>
        </div>
      </section>

      {children}
    </div>
  )
}

function SpanishWorkspace({ goal }: { goal: Goal }) {
  return (
    <WorkspaceFrame
      goal={goal}
      eyebrow="language atelier"
      title="Spanish as muscle, not wish."
      icon={<Languages className="size-6" />}
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface>
          <SectionHead eyebrow="grammar press" title="Weak area board" />
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {goal.metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              ["Present subjunctive", 34],
              ["Sentence transformations", 22],
              ["10-minute speaking", 18],
              ["Active vocabulary", 42],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-primary/12 bg-black/38 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-lg">{label}</p>
                  <span className="font-mono text-xs text-primary/54">{value}%</span>
                </div>
                <Progress value={Number(value)} className="mt-4" />
              </div>
            ))}
          </div>
        </Surface>

        <div className="grid gap-4">
          <ActionPanel
            icon={<Timer className="size-5" />}
            eyebrow="next block"
            title="45 minutes"
            lines={[
              "20m formation drills",
              "20m sentence transformations",
              "5m spoken recap",
            ]}
          />
          <EventLog goal={goal} />
        </div>
      </div>
    </WorkspaceFrame>
  )
}

function DriversWorkspace({ goal }: { goal: Goal }) {
  return (
    <WorkspaceFrame
      goal={goal}
      eyebrow="license bureau"
      title="A clean path to the exam."
      icon={<Car className="size-6" />}
    >
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Surface>
          <SectionHead eyebrow="runway" title="Stages" />
          <div className="mt-7 space-y-4">
            {goal.modules.map((module, index) => (
              <div
                key={module}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
              >
                <div className="grid size-11 place-items-center rounded-full border border-primary/14 bg-black">
                  {index < 2 ? <Check className="size-5" /> : <Route className="size-5" />}
                </div>
                <div className="h-px bg-primary/14" />
                <div className="min-w-[160px] rounded-2xl border border-primary/12 bg-black/38 p-3">
                  <p className="text-lg">{module}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-primary/48">
                    stage 0{index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Surface>

        <div className="grid gap-4 md:grid-cols-2">
          <ActionPanel
            icon={<FileText className="size-5" />}
            eyebrow="documents"
            title="Readiness"
            lines={["ID verified", "Medical form missing", "Exam booking open"]}
          />
          <ActionPanel
            icon={<ListChecks className="size-5" />}
            eyebrow="theory"
            title="Mock test"
            lines={["Coverage: 12%", "Next: full mock", "Blocker: requirement check"]}
          />
          <div className="md:col-span-2">
            <EventLog goal={goal} />
          </div>
        </div>
      </div>
    </WorkspaceFrame>
  )
}

function StrategyWorkspace({ goal }: { goal: Goal }) {
  return (
    <WorkspaceFrame
      goal={goal}
      eyebrow="strategy dossier"
      title="Make the U.S. path legible."
      icon={<GraduationCap className="size-6" />}
    >
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Surface>
          <SectionHead eyebrow="decision room" title="Second gap year?" />
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ["SAT upside", "Highest leverage variable."],
              ["Financial aid", "Needs target school bands."],
              ["Visa realism", "Separate viable path from fantasy."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-primary/12 bg-black/38 p-4">
                <Sparkles className="size-5 text-primary/62" />
                <p className="mt-8 text-2xl">{title}</p>
                <p className="mt-3 text-sm leading-6 text-primary/58">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {["For", "Against", "Unknown"].map((column) => (
              <div key={column} className="min-h-44 rounded-2xl border border-primary/12 bg-black/38 p-4">
                <p className="font-serif text-3xl italic">{column}</p>
                <p className="mt-4 text-sm leading-6 text-primary/58">
                  Evidence goes here before the decision hardens.
                </p>
              </div>
            ))}
          </div>
        </Surface>

        <div className="grid gap-4">
          <ActionPanel
            icon={<CalendarDays className="size-5" />}
            eyebrow="SAT runway"
            title="14 weeks"
            lines={["Baseline", "Math push", "Reading/Writing", "Full tests"]}
          />
          <EventLog goal={goal} />
        </div>
      </div>
    </WorkspaceFrame>
  )
}

function ReadingWorkspace({ goal }: { goal: Goal }) {
  return (
    <WorkspaceFrame
      goal={goal}
      eyebrow="library desk"
      title="Reading that compounds."
      icon={<Library className="size-6" />}
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Surface>
          <SectionHead eyebrow="shelf system" title="Four surfaces" />
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {["Wishlist", "Currently reading", "Finished", "Notes"].map((label) => (
              <div key={label} className="min-h-52 rounded-2xl border border-primary/12 bg-black/38 p-4">
                <BookOpen className="size-5 text-primary/62" />
                <p className="mt-20 font-serif text-4xl italic leading-none">
                  {label}
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-primary/48">
                  empty / ready
                </p>
              </div>
            ))}
          </div>
        </Surface>

        <div className="grid gap-4">
          <ActionPanel
            icon={<NotebookPen className="size-5" />}
            eyebrow="first note"
            title="Why this book matters"
            lines={[
              "Connect reading to active goals",
              "Capture margin notes",
              "Turn quotes into decisions",
            ]}
          />
          <EventLog goal={goal} />
        </div>
      </div>
    </WorkspaceFrame>
  )
}

function Surface({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-[1.5rem] border border-primary/10 bg-[#101010] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.4)] md:p-6">
      {children}
    </section>
  )
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="border-b border-primary/10 pb-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-primary/45">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-5xl italic leading-none text-[#E1E0CC]">
        {title}
      </h2>
    </div>
  )
}

function MetricCard({
  label,
  value,
  sublabel,
}: {
  label: string
  value: string
  sublabel: string
}) {
  return (
    <div className="rounded-2xl border border-primary/12 bg-black/38 p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-primary/48">
        {label}
      </p>
      <p className="mt-5 font-serif text-5xl italic leading-none">{value}</p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-primary/48">
        {sublabel}
      </p>
    </div>
  )
}

function ActionPanel({
  icon,
  eyebrow,
  title,
  lines,
}: {
  icon: React.ReactNode
  eyebrow: string
  title: string
  lines: string[]
}) {
  return (
    <Surface>
      <div className="flex items-start justify-between gap-4 border-b border-primary/10 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary/45">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-5xl italic leading-none">{title}</h2>
        </div>
        <div className="text-primary/62">{icon}</div>
      </div>
      <div className="mt-5 divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/12 bg-black/38">
        {lines.map((line, index) => (
          <div key={line} className="grid grid-cols-[auto_1fr] gap-3 p-3">
            <span className="font-serif text-2xl italic leading-none">
              0{index + 1}
            </span>
            <p className="text-sm leading-6 text-primary/64">{line}</p>
          </div>
        ))}
      </div>
    </Surface>
  )
}

function EventLog({ goal }: { goal: Goal }) {
  return (
    <Surface>
      <div className="flex items-center justify-between border-b border-primary/10 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary/45">
            evidence
          </p>
          <h2 className="mt-1 font-serif text-5xl italic leading-none">Log</h2>
        </div>
        <PenLine className="size-5 text-primary/62" />
      </div>
      <div className="mt-5 divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/12 bg-black/38">
        {goal.events.map((event) => (
          <article key={event.title} className="p-3">
            <p className="text-sm font-medium text-[#E1E0CC]">{event.title}</p>
            <p className="mt-2 text-xs leading-5 text-primary/56">{event.detail}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary/42">
              {event.type} / {event.time}
            </p>
          </article>
        ))}
      </div>
    </Surface>
  )
}

function Progress({
  value,
  tone = "dark",
  className,
}: {
  value: number
  tone?: "dark" | "light"
  className?: string
}) {
  return (
    <div className={className}>
      <div className="h-2 rounded-full bg-primary/14 p-[2px]">
        <div
          className={tone === "light" ? "h-full rounded-full bg-primary" : "h-full rounded-full bg-[#E1E0CC]"}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-primary/55">{value}% current signal</p>
    </div>
  )
}

function EditorialField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="bg-noise absolute inset-0 opacity-[0.13]" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(222,219,200,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(222,219,200,0.10) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute bottom-6 right-8 font-serif text-[11rem] italic leading-none text-primary/[0.04]">
        OS
      </div>
    </div>
  )
}
