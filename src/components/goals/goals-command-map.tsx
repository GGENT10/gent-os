import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  Car,
  GraduationCap,
  Languages,
  LocateFixed,
  type LucideIcon,
} from "lucide-react"

import { goals, type GoalSlug } from "@/data/gent-os"
import { cn } from "@/lib/utils"

const iconMap: Record<GoalSlug, LucideIcon> = {
  "spanish-to-b2": Languages,
  "georgia-drivers-license": Car,
  "us-education-immigration": GraduationCap,
  "reading-system": BookOpen,
}

const roomMap: Record<
  GoalSlug,
  {
    room: string
    command: string
    artifact: string
    coordinate: string
    position: string
  }
> = {
  "spanish-to-b2": {
    room: "Language atelier",
    command: "Grammar, voice, recall",
    artifact: "Conjugation press",
    coordinate: "A1",
    position: "left-4 top-5 md:left-8 md:top-8",
  },
  "georgia-drivers-license": {
    room: "License bureau",
    command: "Documents, theory, booking",
    artifact: "Exam runway",
    coordinate: "B4",
    position: "right-4 top-28 md:right-10 md:top-24",
  },
  "us-education-immigration": {
    room: "Strategy room",
    command: "SAT, aid, visa realism",
    artifact: "Decision dossier",
    coordinate: "D2",
    position: "left-6 bottom-20 md:left-20 md:bottom-24",
  },
  "reading-system": {
    room: "Library desk",
    command: "Wishlist, notes, durable thought",
    artifact: "Thinking shelf",
    coordinate: "C6",
    position: "right-5 bottom-5 md:right-16 md:bottom-10",
  },
}

export function GoalsCommandMap() {
  const averageProgress = Math.round(
    goals.reduce((total, goal) => total + goal.progress, 0) / goals.length
  )

  return (
    <div className="space-y-4 text-[#E1E0CC]">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#101010] px-5 py-8 shadow-[0_30px_110px_rgba(0,0,0,0.5)] md:px-8 md:py-10">
        <EditorialField />
        <div className="relative grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/46">
              goals / command map
            </p>
            <h1 className="mt-5 max-w-5xl font-serif text-6xl italic leading-[0.9] text-[#E1E0CC] md:text-8xl">
              Four rooms,
              <span className="block">
                one operating floor.
              </span>
            </h1>
          </div>
          <div className="grid gap-4 border-t border-primary/12 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <p className="max-w-xl text-sm leading-7 text-primary/56">
              The goal layer is an atlas: each room has its own instrument,
              pressure, evidence, and next move.
            </p>
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-primary/12 bg-black/36">
              <MapStat label="rooms" value={String(goals.length).padStart(2, "0")} />
              <MapStat label="open" value={String(goals.filter((goal) => goal.status !== "watching").length).padStart(2, "0")} />
              <MapStat label="mean" value={`${averageProgress}%`} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
        <section className="overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[#101010]">
          <div className="border-b border-primary/10 p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/42">
              room index
            </p>
            <h2 className="mt-2 font-serif text-4xl italic leading-none text-[#E1E0CC]">
              Choose a door.
            </h2>
          </div>

          <div className="divide-y divide-primary/10">
            {goals.map((goal, index) => {
              const Icon = iconMap[goal.slug]
              const room = roomMap[goal.slug]

              return (
                <Link
                  key={goal.slug}
                  href={`/goals/${goal.slug}`}
                  className="group grid gap-4 p-5 transition hover:bg-primary hover:text-black md:grid-cols-[auto_1fr] md:p-6"
                >
                  <div className="flex items-start gap-3 md:block">
                    <span className="font-serif text-5xl italic leading-none">
                      0{index + 1}
                    </span>
                    <Icon className="mt-1 size-5 opacity-54 md:mt-5" />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-45">
                          {room.room} / {room.coordinate}
                        </p>
                        <h3 className="mt-2 font-serif text-3xl italic leading-none">
                          {goal.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="size-4 shrink-0 opacity-32 transition group-hover:opacity-100" />
                    </div>
                    <p className="mt-4 text-sm leading-6 opacity-55">
                      {room.command}
                    </p>
                    <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-4">
                      <ProgressStrip value={goal.progress} />
                      <span className="font-mono text-xs opacity-54">
                        {goal.progress}%
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="relative min-h-[720px] overflow-hidden rounded-[1.5rem] border border-primary/10 bg-black shadow-[0_30px_110px_rgba(0,0,0,0.5)]">
          <EditorialField dense />
          <div className="pointer-events-none absolute inset-6 rounded-[1.25rem] border border-primary/10" />
          <div className="pointer-events-none absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px bg-primary/10" />
          <div className="pointer-events-none absolute left-6 right-6 top-1/2 h-px bg-primary/10" />
          <div className="pointer-events-none absolute left-[12%] top-[18%] h-px w-[68%] rotate-6 bg-primary/16" />
          <div className="pointer-events-none absolute left-[18%] top-[58%] h-px w-[62%] -rotate-12 bg-primary/12" />

          <div className="relative min-h-[720px] p-5 md:p-8">
            <div className="pointer-events-none absolute bottom-8 left-8 hidden font-serif text-9xl italic leading-none text-primary/[0.035] md:block">
              atlas
            </div>

            {goals.map((goal, index) => {
              const Icon = iconMap[goal.slug]
              const room = roomMap[goal.slug]

              return (
                <Link
                  key={goal.slug}
                  href={`/goals/${goal.slug}`}
                  className={cn(
                    "group absolute w-[calc(100%-2.5rem)] rounded-2xl border border-primary/14 bg-[#101010]/90 p-4 shadow-[0_30px_110px_rgba(0,0,0,0.72)] backdrop-blur-md transition hover:z-20 hover:-translate-y-1 hover:border-primary/34 hover:bg-[#171717] sm:w-80 md:p-5",
                    room.position
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/42">
                        room 0{index + 1} / {room.artifact}
                      </p>
                      <h3 className="mt-2 font-serif text-3xl italic leading-none text-[#E1E0CC]">
                        {room.room}
                      </h3>
                    </div>
                    <Icon className="size-5 text-primary/58" />
                  </div>

                  <div className="mt-6 grid grid-cols-[auto_1fr] gap-4">
                    <div className="grid size-16 place-items-center rounded-full border border-primary/16 bg-black">
                      <span className="font-serif text-4xl italic leading-none text-[#E1E0CC]">
                        {goal.progress}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm leading-6 text-primary/54">
                        {goal.currentSignal}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    {goal.modules.slice(0, 3).map((module) => (
                      <div
                        key={module}
                        className="flex items-center justify-between border-t border-primary/10 pt-2 text-xs text-primary/46"
                      >
                        <span>{module}</span>
                        <LocateFixed className="size-3 text-primary/34" />
                      </div>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

function EditorialField({ dense = false }: { dense?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-noise absolute inset-0 opacity-[0.12]" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(222,219,200,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(222,219,200,0.04) 1px, transparent 1px)",
          backgroundSize: dense ? "22px 22px" : "34px 34px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-primary/28" />
      <div className="absolute inset-y-0 left-0 w-px bg-primary/20" />
    </div>
  )
}

function MapStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-primary/12 p-4 last:border-r-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/38">
        {label}
      </p>
      <p className="mt-3 font-serif text-4xl italic leading-none text-[#E1E0CC]">
        {value}
      </p>
    </div>
  )
}

function ProgressStrip({ value }: { value: number }) {
  return (
    <div className="h-3 rounded-full bg-current/14 p-[3px]">
      <div
        className="h-full rounded-full bg-current"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}
