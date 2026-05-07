"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function ActiveLink({
  href,
  className,
  activeClassName,
  children,
  ariaLabel,
}: {
  href: string
  className: string
  activeClassName: string
  children: React.ReactNode
  ariaLabel?: string
}) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(className, active && activeClassName)}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  )
}

export function RouteTitle({
  fallback,
  titles,
}: {
  fallback: string
  titles: Array<{ href: string; label: string }>
}) {
  const pathname = usePathname()
  const title =
    titles.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
      ?.label ?? fallback

  return (
    <h1 className="truncate font-serif text-2xl italic leading-none text-[#E1E0CC] md:text-3xl">
      {title}
    </h1>
  )
}
