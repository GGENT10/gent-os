import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function TopographicField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(132deg, transparent 0 18px, rgba(255,255,255,0.075) 19px, transparent 20px), repeating-linear-gradient(28deg, transparent 0 38px, rgba(255,255,255,0.05) 39px, transparent 41px)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-48 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.10), transparent)",
        }}
      />
    </div>
  )
}

export function GlassPanel({
  children,
  className,
  as = "section",
}: {
  children: ReactNode
  className?: string
  as?: "section" | "article" | "div"
}) {
  const Component = as

  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.045] text-white shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25" />
      <div className="relative">{children}</div>
    </Component>
  )
}

export function SectionLabel({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string
  title: string
  action?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 font-serif text-2xl font-normal leading-tight text-white md:text-3xl">
          {title}
        </h2>
      </div>
      {action ? (
        <span className="hidden items-center gap-1 rounded-[8px] border border-white/10 bg-white/[0.06] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 md:inline-flex">
          {action}
          <ArrowUpRight className="size-3" />
        </span>
      ) : null}
    </div>
  )
}

export function SignalPill({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.065] px-3 py-1.5 text-xs text-white/70",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  )
}

export function MetricTrace({
  className,
  accent = "rgba(255,255,255,0.92)",
}: {
  className?: string
  accent?: string
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 160"
      className={cn("h-full min-h-28 w-full overflow-visible", className)}
      preserveAspectRatio="none"
    >
      <path
        d="M0 126H420 M0 92H420 M0 58H420"
        stroke="rgba(255,255,255,0.08)"
        strokeDasharray="7 10"
      />
      <path
        d="M0 114C21 101 32 127 50 119C72 109 76 65 99 77C126 91 134 107 155 85C181 58 189 49 211 67C236 88 244 92 269 78C296 63 306 74 330 64C357 53 365 44 389 55C405 62 412 77 420 74"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
      />
      <path
        d="M0 117C20 103 35 126 51 118C72 108 76 67 98 78C124 91 133 107 155 85C181 58 190 49 211 67C236 88 244 92 269 78C296 63 306 74 330 64C357 53 365 44 389 55C405 62 412 77 420 74"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeDasharray="0 690"
        className="[stroke-dasharray:690] [stroke-dashoffset:0]"
      />
      <path d="M134 160V70H162V160Z" fill="rgba(255,255,255,0.08)" />
      <path d="M314 160V63H343V160Z" fill="rgba(255,255,255,0.08)" />
      <circle cx="155" cy="85" r="4" fill="white" />
      <circle cx="330" cy="64" r="4" fill="white" />
      <path
        d="M48 119C55 132 66 133 72 115"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="3"
      />
    </svg>
  )
}

export function ProgressRail({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  return (
    <div className={cn("h-1 overflow-hidden rounded-full bg-white/10", className)}>
      <div
        className="h-full rounded-full bg-white/75"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}

export function BlueprintLines({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 180"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="none"
    >
      <path
        d="M24 130H338M24 130V48H112V88H178V48H338V130M68 130V88H112M178 88H238V130M260 48V130M24 92H68M298 48V92H338"
        fill="none"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="2"
      />
      <path
        d="M46 64H92M194 65H242M275 106H326M126 104H165"
        stroke="rgba(255,255,255,0.18)"
      />
      <circle cx="112" cy="88" r="6" fill="rgba(255,255,255,0.75)" />
      <circle cx="260" cy="130" r="6" fill="rgba(255,255,255,0.75)" />
    </svg>
  )
}
