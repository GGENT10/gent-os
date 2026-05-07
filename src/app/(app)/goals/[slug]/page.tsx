import { notFound } from "next/navigation"

import { GoalWorkspace } from "@/components/goals/workspaces"
import { getGoal } from "@/data/gent-os"

export default async function GoalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const goal = getGoal(slug)

  if (!goal) {
    notFound()
  }

  return <GoalWorkspace goal={goal} />
}
