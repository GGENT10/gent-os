import type { ComponentType } from "react"

export type GoalSlug =
  | "spanish-to-b2"
  | "georgia-drivers-license"
  | "us-education-immigration"
  | "reading-system"

export type GoalTheme = {
  accent: string
  accentSoft: string
  surface: string
  line: string
}

export type Goal = {
  slug: GoalSlug
  title: string
  label: string
  category: string
  status: "active" | "watching" | "planning"
  progress: number
  priority: number
  description: string
  northStar: string
  currentSignal: string
  nextAction: string
  lastEvent: string
  modules: string[]
  metrics: Array<{
    label: string
    value: string
    sublabel: string
  }>
  events: Array<{
    title: string
    detail: string
    time: string
    type: string
  }>
  theme: GoalTheme
}

export const goals: Goal[] = [
  {
    slug: "spanish-to-b2",
    title: "Spanish to B2",
    label: "Language Lab",
    category: "Learning",
    status: "active",
    progress: 28,
    priority: 1,
    description:
      "Build Spanish ability through grammar, speaking, listening, reading, and active vocabulary.",
    northStar: "Hold a clear B2-level conversation without switching languages.",
    currentSignal: "Grammar momentum is forming. Subjunctive is the weak area.",
    nextAction: "Run a 45 minute block on present subjunctive transformations.",
    lastEvent: "Lesson 3 completed, subjunctive marked as unstable.",
    modules: ["Grammar", "Speaking", "Listening", "Vocabulary", "Reading"],
    metrics: [
      { label: "Active vocabulary", value: "184", sublabel: "words" },
      { label: "Weekly rhythm", value: "3/5", sublabel: "sessions" },
      { label: "Weak area", value: "Subj.", sublabel: "grammar" },
    ],
    events: [
      {
        title: "Lesson 3 finished",
        detail: "45 minute session, subjunctive felt unclear.",
        time: "Today",
        type: "study_session",
      },
      {
        title: "A2 grammar review opened",
        detail: "Initial sequence created around verbs and sentence patterns.",
        time: "2d ago",
        type: "progress_update",
      },
    ],
    theme: {
      accent: "text-white",
      accentSoft: "bg-white/10",
      surface: "from-white/12",
      line: "border-white/30",
    },
  },
  {
    slug: "georgia-drivers-license",
    title: "Georgia Driver's License",
    label: "Exam Runway",
    category: "Personal",
    status: "planning",
    progress: 16,
    priority: 2,
    description:
      "Study requirements, documents, theory, practice, booking, and exam readiness.",
    northStar: "Pass the theory exam and move into practical readiness cleanly.",
    currentSignal: "Requirements are known enough to begin document collection.",
    nextAction: "Create the document checklist and start theory prep schedule.",
    lastEvent: "Theory preparation path drafted.",
    modules: ["Requirements", "Documents", "Theory", "Practice", "Booking"],
    metrics: [
      { label: "Documents", value: "1/5", sublabel: "ready" },
      { label: "Theory", value: "12%", sublabel: "coverage" },
      { label: "Booking", value: "Open", sublabel: "not set" },
    ],
    events: [
      {
        title: "Theory prep started",
        detail: "First mock exam milestone added to the runway.",
        time: "1d ago",
        type: "progress_update",
      },
      {
        title: "Requirements module opened",
        detail: "Document and exam requirements need verification.",
        time: "3d ago",
        type: "manual_note",
      },
    ],
    theme: {
      accent: "text-white",
      accentSoft: "bg-white/10",
      surface: "from-white/12",
      line: "border-white/30",
    },
  },
  {
    slug: "us-education-immigration",
    title: "U.S. / Education / Immigration",
    label: "Strategy Room",
    category: "Immigration",
    status: "active",
    progress: 22,
    priority: 1,
    description:
      "Track U.S. universities, SAT, financial aid, visas, essays, and long-term move strategy.",
    northStar: "Create the strongest realistic path toward studying and building in the U.S.",
    currentSignal: "SAT focus and second gap year decision need a real memo.",
    nextAction: "Write a decision memo: second gap year, SAT upside, and target school bands.",
    lastEvent: "Second gap year entered as serious scenario.",
    modules: ["SAT", "Universities", "Essays", "Financial Aid", "Visa"],
    metrics: [
      { label: "SAT runway", value: "14w", sublabel: "draft" },
      { label: "School list", value: "0/20", sublabel: "built" },
      { label: "Decision", value: "Gap?", sublabel: "open" },
    ],
    events: [
      {
        title: "Second gap year scenario",
        detail: "Decision should be tested against SAT upside and financial aid.",
        time: "Today",
        type: "decision",
      },
      {
        title: "Visa paths module opened",
        detail: "Needs realistic options and probability notes.",
        time: "4d ago",
        type: "strategy",
      },
    ],
    theme: {
      accent: "text-white",
      accentSoft: "bg-white/10",
      surface: "from-white/12",
      line: "border-white/30",
    },
  },
  {
    slug: "reading-system",
    title: "Reading System",
    label: "Library Desk",
    category: "Reading",
    status: "watching",
    progress: 10,
    priority: 3,
    description:
      "Manage wishlist, active reading, finished books, notes, quotes, discussions, and connections.",
    northStar: "Turn reading into durable thinking that compounds into life decisions.",
    currentSignal: "The shelf exists. It needs the first active book and note.",
    nextAction: "Add the first active book and write why it matters now.",
    lastEvent: "Initial reading system opened.",
    modules: ["Wishlist", "Active", "Finished", "Notes", "Quotes"],
    metrics: [
      { label: "Wishlist", value: "0", sublabel: "books" },
      { label: "Active", value: "0", sublabel: "books" },
      { label: "Notes", value: "0", sublabel: "captured" },
    ],
    events: [
      {
        title: "Reading workspace created",
        detail: "Ready for wishlist and first active book.",
        time: "Today",
        type: "manual_note",
      },
    ],
    theme: {
      accent: "text-white",
      accentSoft: "bg-white/10",
      surface: "from-white/12",
      line: "border-white/30",
    },
  },
]

export const recentDecisions = [
  {
    title: "Second gap year is a serious path",
    body: "Treat SAT improvement as the central variable before deciding.",
    goal: "U.S. / Education / Immigration",
    time: "Today",
  },
  {
    title: "Spanish needs grammar evidence",
    body: "Subjunctive should become an explicit weak-area track, not vague frustration.",
    goal: "Spanish to B2",
    time: "Today",
  },
]

export function getGoal(slug: string) {
  return goals.find((goal) => goal.slug === slug)
}

export type GoalWorkspaceComponent = ComponentType<{ goal: Goal }>
