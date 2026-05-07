# Me OS Project Context

## One Sentence

Me OS is a private personal operating system for one person: a structured life database, custom workspace environment, and AI operator that turns raw life input into durable state, evidence, decisions, and next actions.

## User Context

The first user is George: 18, based in Tbilisi, founder/engineer, ambitious about the U.S., education, immigration, finance, investing, health, Spanish, a Georgian driver's license, reading, StockFlow, and long-term career/life leverage.

This is not a consumer productivity product. It is not being optimized for generic users, onboarding funnels, or team collaboration. It is a private command center for one high-agency person with multiple long-running life arcs.

## Product Philosophy

Me OS should not feel like a todo app with a chatbot. It should feel like a private instrument panel for a life.

The product exists because normal apps split life into disconnected silos:

- notes in one place
- tasks in another
- goals somewhere else
- health data elsewhere
- finance in spreadsheets
- AI conversations with no durable state

Me OS should unify these into one personal state system.

The central idea:

```txt
User says what happened or what they are thinking
-> AI understands the user's life context
-> AI calls typed tools
-> database state changes
-> custom workspaces reflect the change
-> future AI has better context
```

The AI is not a generic chatbot. It is the operator/interface for the OS.

## Core Product Principle

Everything important should become durable state.

Casual text is allowed at the input layer, but the system should prefer structured outputs:

- progress becomes a goal event
- decisions become decision records or journal entries
- study sessions become evidence
- weak areas become tracked signals
- milestones become explicit
- money and health eventually become time-series metrics
- books become notes, quotes, discussions, and connections

The app should preserve the raw message, but it should not stop there.

## Core Primitives

The system should start with a small set of primitives that can support many modules.

### Goals

Big life workspaces, not tasks.

Examples:

- Spanish to B2
- Georgia Driver's License
- U.S. / Education / Immigration Strategy
- Reading System
- later: Finance, Health, StockFlow, Fitness, Career

Goals need custom UI and behavior. They are not generic cards forever.

### Events

Evidence of what actually happened.

This is one of the most important primitives. Plans are predictions; events are reality.

Examples:

- Studied Spanish for 45 minutes
- Finished lesson 3
- Struggled with subjunctive
- Completed first mock theory test
- Decided to seriously consider a second gap year
- Read 40 pages
- Updated financial target

Events should include type, source, timestamp, goal linkage, optional milestone linkage, and metadata.

### Milestones

Concrete progress targets inside goals.

Milestones should be useful, but they should not dominate the product. Evidence and decisions are more alive than milestone checklists.

### Modules

Modules are domain-specific areas inside a workspace.

Important: modules are not generic tabs. A module can have custom UI, custom tools, custom data structures, and custom interaction patterns.

Examples:

- Spanish Grammar module can look like a language lab
- U.S. Strategy module can look like a decision dossier
- Reading Notes can look like a desk or margin annotation system
- Finance can look like a capital map
- Health can look like body telemetry

The codebase should support custom modules through a registry/pattern, not force everything into one layout.

### Journal Entries

General context, reflections, plans, strategy, and life notes.

Journal entries can be linked to goals but do not have to be. They are useful for semantic memory later.

### Decisions

Decisions deserve first-class treatment, even if initially stored as events or journal entries.

A decision should capture:

- what was decided
- why
- what evidence mattered
- what assumptions are active
- when to revisit it
- which goals it affects

The U.S./education/immigration path especially needs decision logs.

### Metrics

Numbers over time.

Examples:

- Spanish study minutes
- SAT practice scores
- net worth
- portfolio value
- sleep/recovery/HRV
- reading pages
- workouts

Metrics should come later after the first AI-to-state loop works.

### Reviews

AI-generated synthesis over a period of state.

Examples:

- weekly review
- monthly finance brief
- Spanish weak-area review
- health/productivity correlation brief
- education strategy memo

Reviews should be generated from structured state, not vague chat history.

## Custom Workspace Architecture

The app should use a shared database substrate plus custom renderers.

Bad approach:

```txt
Every goal uses the same generic dashboard page with the same cards.
```

Better approach:

```txt
goals table stores shared metadata
goal_events stores evidence
milestones stores progress targets
workspace registry maps goal slug -> custom React workspace
each workspace chooses its own layout, modules, tools, and visual language
```

Example:

```ts
const workspaceRegistry = {
  "spanish-to-b2": SpanishWorkspace,
  "georgia-drivers-license": DriversLicenseWorkspace,
  "us-education-immigration": StrategyWorkspace,
  "reading-system": ReadingWorkspace,
}
```

The shared shell should know the goal exists. The workspace decides how the goal feels.

## Visual Direction

Current pivot: black and white editorial.

Avoid:

- green operational UI
- grey SaaS panels
- blue gradients
- generic dashboard cards
- childish productivity styling
- over-rounded soft widgets
- motivational wellness app look

Use:

- black/white contrast
- serif headings
- italic serif moments
- editorial hierarchy
- sharp borders
- dense but elegant layouts
- strong typographic scale
- monochrome diagrams/tables/indexes
- pages that feel designed, not assembled from cards

Tone:

- private
- serious
- founder/operator
- literary but functional
- high agency
- minimal but not empty

## Tech Stack

Use the existing Next.js project.

Core stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui as needed
- Framer Motion later for transitions
- Supabase Auth
- Supabase Postgres
- Drizzle ORM
- Vercel AI SDK
- OpenAI provider initially
- Zod for validation
- pgvector later

Hosting:

- Vercel for app
- Supabase for database/auth/storage/functions

Do not start with:

- VPS
- microservices
- MCP
- external agent protocol
- heavy embeddings layer
- WHOOP integration
- finance market data

MCP may come later if the app should expose tools to Claude Desktop, Cursor, or other external agents. For now, use direct server-side typed tools through the app.

## Next.js Version Notes

This project uses Next 16. Read local docs in `node_modules/next/dist/docs/` before relying on old App Router assumptions.

Important known implications:

- `middleware` has been renamed/deprecated in favor of `proxy.ts`
- dynamic `params` are promises and must be awaited
- route handlers use Web Request/Response
- authorization must happen inside server functions/routes, not only at the proxy layer

## Security Model

Security matters because this app stores sensitive life context.

For MVP:

- single-user private app
- Supabase Auth
- only approved email can access
- no public signups
- protected app routes
- server-side `requireUser()`
- every query scoped by `user_id`
- no secrets in client code
- no service role key in browser
- no arbitrary SQL exposed to AI
- no arbitrary database mutation exposed to AI
- every AI mutation logged

AI security:

- AI can only call typed tools
- tools validate inputs with Zod
- tools re-check current user
- tools verify ownership before mutation
- tools write audit records
- destructive or high-impact actions eventually require confirmation

RLS:

- Use Supabase RLS where practical.
- Do not rely only on RLS if using Drizzle with privileged DB credentials.
- The server data access layer must still scope by `user_id`.

## Data Access Approach

Use Supabase Auth for identity and sessions.

Use Drizzle as the main server-side data access layer.

Use a small server-side data access layer instead of placing raw queries everywhere:

```txt
/src/db
  schema.ts
  client.ts
  seed.ts

/src/server
  auth.ts
  queries/
  tools/
```

The DAL should:

- run only server-side
- check authorization
- return safe data objects
- avoid passing raw database rows to client components when not needed

## Initial Database Model

MVP tables:

- profiles
- goals
- goal_modules
- milestones
- goal_events
- journal_entries
- ai_conversations
- ai_messages
- ai_tool_calls

Recommended additions:

- `goal_events.metadata jsonb`
- `journal_entries.goal_id nullable` or a join table
- `ai_messages.parts jsonb` for AI SDK UI message parts
- `ai_tool_calls.status`
- `ai_tool_calls.error`
- `ai_tool_calls.tool_call_id`

Future tables:

- decisions
- metrics
- metric_points
- books
- book_notes
- reading_sessions
- finance_accounts
- finance_snapshots
- portfolio_positions
- money_goals
- health_metrics
- documents
- document_chunks
- embeddings

## AI Operator

The AI operator should:

- know the user's active goals
- understand recent events and decisions
- call typed tools when the user reports progress or decisions
- summarize what changed
- suggest next action
- avoid vague motivation
- avoid silent important mutations
- maintain audit trail

Initial tools:

- createGoalEvent
- updateMilestoneProgress
- createMilestone
- createJournalEntry
- summarizeGoalContext

Later tools:

- createGoal
- createGoalModule
- updateGoalStatus
- createDecision
- createBook
- updateBookProgress
- createBookNote
- createFinanceEntry
- updatePortfolioPosition
- logHealthReflection
- generateWeeklyReview

## MVP Acceptance Flow

Flow 1:

```txt
User: I studied Spanish for 45 minutes today, finished lesson 3, and struggled with subjunctive.
```

Expected:

- message is stored
- AI identifies Spanish to B2
- AI creates goal event
- AI may update related milestone
- AI responds with what changed
- Spanish workspace shows the event
- weak area/next focus is visible

Flow 2:

```txt
User: I decided that for the U.S. education path I should seriously consider a second gap year and focus on SAT.
```

Expected:

- message is stored
- AI identifies U.S. / Education / Immigration Strategy
- AI creates decision journal entry or goal event
- AI suggests concrete next milestone
- strategy workspace shows the decision

## Build Order

Recommended order:

1. Full project context and design direction
2. Strong frontend shell and custom workspace pattern
3. Supabase Auth and route protection
4. Drizzle schema and migrations
5. Seed data
6. Database-backed goals/workspaces
7. Journal and events
8. AI chat UI
9. AI route with typed tools
10. Tool call audit log
11. Acceptance flow testing
12. UI tightening around real state

Later:

- finance
- books as full module
- health/WHOOP
- semantic memory
- weekly reviews
- external integrations
- MCP

## Product Modules

### Spanish to B2

Should feel like a language lab.

Needs:

- current level
- grammar modules
- speaking/listening/reading/vocabulary tracks
- study sessions
- weak areas
- evidence log
- AI tutor interactions
- resources
- next focused block

### Georgia Driver's License

Should feel like an exam runway/bureau.

Needs:

- requirements
- documents
- theory prep
- mock tests
- booking
- blockers
- exam status
- evidence log

### U.S. / Education / Immigration Strategy

Should feel like a strategy room/dossier.

Needs:

- schools
- SAT
- financial aid
- essays
- visa paths
- decision logs
- assumptions
- strategic memos
- deadlines
- AI discussions

### Reading System

Should feel like a library desk.

Needs:

- wishlist
- current reading
- finished books
- notes
- quotes
- discussions
- why each book matters
- connections to goals

### Finance

Later. Should feel like a capital map.

Needs:

- cash/savings
- stocks
- crypto
- net worth
- allocation
- money goals
- market data later

### Health

Later. Should feel like body telemetry.

Needs:

- WHOOP OAuth
- sleep
- recovery
- strain
- HRV
- RHR
- workouts
- trends and correlations

## Non-Goals For Now

Do not build:

- finance first
- WHOOP first
- embeddings first
- a generic todo app
- a generic notes app
- a generic SaaS dashboard
- MCP first
- a plugin system before the core loop works
- multi-user support
- public signup

## Definition Of Good

The product is working when one sentence from life changes the system.

Not:

```txt
User talks to chatbot. Chatbot replies.
```

But:

```txt
User reports reality.
AI records evidence.
Workspace changes.
Future AI knows.
Next action becomes sharper.
```

## Open Questions

- Should decisions be first-class immediately or represented as event/journal entries first?
- Should the app support manual event creation before AI tools?
- How much confirmation should AI need before updating milestones?
- Should finance/health/book modules be separate top-level routes, goal workspaces, or both?
- Should the first live database version use seed data tied to George's real Supabase profile automatically?
- Should the AI chat persist one ongoing conversation or many named conversations?

## Current Priority

Create a strong project foundation:

1. Full context document
2. black/white editorial UI
3. custom workspace registry
4. database/auth next
5. AI core loop after structured state exists

