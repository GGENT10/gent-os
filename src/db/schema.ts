import { sql } from "drizzle-orm"
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

export const authSchema = pgSchema("auth")

export const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey(),
})

export const goalStatus = pgEnum("goal_status", [
  "active",
  "paused",
  "completed",
  "archived",
])

export const milestoneStatus = pgEnum("milestone_status", [
  "planned",
  "active",
  "done",
  "skipped",
])

export const aiMessageRole = pgEnum("ai_message_role", [
  "system",
  "user",
  "assistant",
  "tool",
])

export const aiToolCallStatus = pgEnum("ai_tool_call_status", [
  "pending",
  "running",
  "succeeded",
  "failed",
  "cancelled",
])

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}

const metadata = jsonb("metadata")
  .$type<Record<string, unknown>>()
  .notNull()
  .default(sql`'{}'::jsonb`)

export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  ...timestamps,
})

export const goals = pgTable(
  "goals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    status: goalStatus("status").notNull().default("active"),
    horizon: text("horizon"),
    progress: integer("progress").notNull().default(0),
    metadata,
    ...timestamps,
  },
  (table) => [
    uniqueIndex("goals_user_slug_idx").on(table.userId, table.slug),
    index("goals_user_status_idx").on(table.userId, table.status),
  ],
)

export const goalModules = pgTable(
  "goal_modules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    goalId: uuid("goal_id")
      .notNull()
      .references(() => goals.id, { onDelete: "cascade" }),
    key: text("key").notNull(),
    title: text("title").notNull(),
    kind: text("kind").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    metadata,
    ...timestamps,
  },
  (table) => [
    uniqueIndex("goal_modules_goal_key_idx").on(table.goalId, table.key),
    index("goal_modules_user_goal_idx").on(table.userId, table.goalId),
  ],
)

export const milestones = pgTable(
  "milestones",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    goalId: uuid("goal_id")
      .notNull()
      .references(() => goals.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    status: milestoneStatus("status").notNull().default("planned"),
    dueAt: timestamp("due_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    sortOrder: integer("sort_order").notNull().default(0),
    metadata,
    ...timestamps,
  },
  (table) => [
    index("milestones_user_goal_idx").on(table.userId, table.goalId),
    index("milestones_user_status_idx").on(table.userId, table.status),
  ],
)

export const goalEvents = pgTable(
  "goal_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    goalId: uuid("goal_id")
      .notNull()
      .references(() => goals.id, { onDelete: "cascade" }),
    milestoneId: uuid("milestone_id").references(() => milestones.id, {
      onDelete: "set null",
    }),
    happenedAt: timestamp("happened_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    kind: text("kind").notNull(),
    title: text("title").notNull(),
    body: text("body"),
    metadata,
    ...timestamps,
  },
  (table) => [
    index("goal_events_user_happened_idx").on(table.userId, table.happenedAt),
    index("goal_events_goal_happened_idx").on(table.goalId, table.happenedAt),
  ],
)

export const journalEntries = pgTable(
  "journal_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    goalId: uuid("goal_id").references(() => goals.id, { onDelete: "set null" }),
    entryDate: timestamp("entry_date", { withTimezone: true }).notNull().defaultNow(),
    title: text("title"),
    body: text("body").notNull(),
    metadata,
    ...timestamps,
  },
  (table) => [
    index("journal_entries_user_date_idx").on(table.userId, table.entryDate),
    index("journal_entries_goal_idx").on(table.goalId),
  ],
)

export const aiConversations = pgTable(
  "ai_conversations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    title: text("title").notNull().default("Untitled conversation"),
    isPinned: boolean("is_pinned").notNull().default(false),
    metadata,
    ...timestamps,
  },
  (table) => [index("ai_conversations_user_updated_idx").on(table.userId, table.updatedAt)],
)

export const aiMessages = pgTable(
  "ai_messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => aiConversations.id, { onDelete: "cascade" }),
    role: aiMessageRole("role").notNull(),
    content: text("content"),
    parts: jsonb("parts").$type<unknown[]>().notNull().default(sql`'[]'::jsonb`),
    metadata,
    ...timestamps,
  },
  (table) => [
    index("ai_messages_conversation_created_idx").on(
      table.conversationId,
      table.createdAt,
    ),
    index("ai_messages_user_created_idx").on(table.userId, table.createdAt),
  ],
)

export const aiToolCalls = pgTable(
  "ai_tool_calls",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    conversationId: uuid("conversation_id").references(() => aiConversations.id, {
      onDelete: "cascade",
    }),
    messageId: uuid("message_id").references(() => aiMessages.id, {
      onDelete: "set null",
    }),
    toolCallId: text("tool_call_id").notNull(),
    toolName: text("tool_name").notNull(),
    status: aiToolCallStatus("status").notNull().default("pending"),
    input: jsonb("input").$type<Record<string, unknown>>().notNull(),
    output: jsonb("output").$type<Record<string, unknown> | null>(),
    error: text("error"),
    metadata,
    ...timestamps,
  },
  (table) => [
    uniqueIndex("ai_tool_calls_tool_call_id_idx").on(table.toolCallId),
    index("ai_tool_calls_user_status_idx").on(table.userId, table.status),
  ],
)

export const appAuditEvents = pgTable(
  "app_audit_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    actor: text("actor").notNull(),
    action: text("action").notNull(),
    subjectTable: text("subject_table"),
    subjectId: uuid("subject_id"),
    metadata,
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("app_audit_events_user_created_idx").on(table.userId, table.createdAt),
  ],
)

export const journalGoals = pgTable(
  "journal_goals",
  {
    journalEntryId: uuid("journal_entry_id")
      .notNull()
      .references(() => journalEntries.id, { onDelete: "cascade" }),
    goalId: uuid("goal_id")
      .notNull()
      .references(() => goals.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.journalEntryId, table.goalId] }),
    index("journal_goals_user_idx").on(table.userId),
  ],
)
