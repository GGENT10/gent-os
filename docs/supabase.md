# Supabase Setup

This app uses Supabase Auth for identity and Drizzle/Postgres for server-side data access.

## Environment

Copy `.env.example` into `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `SUPABASE_AUTH_ALLOWED_EMAILS`

Do not add a service-role key to any `NEXT_PUBLIC_` variable. The app currently does not need a service-role key.

## Auth

The login page uses email magic links. In Supabase Auth email templates, make magic links and confirmation links point at:

```txt
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

Set the Supabase Site URL to `NEXT_PUBLIC_SITE_URL`, and add local and production redirect URLs in the Auth URL configuration.

`SUPABASE_AUTH_ALLOWED_EMAILS` is the app-level private access allowlist. It defaults to `georgegent@proton.me` if unset so the deployed app fails closed for this single-user MVP. Local Supabase config disables signups by default, so create the first user through Supabase Auth before signing in.

## Database

The first schema lives in `supabase/migrations/20260506214001_initial_me_os_schema.sql`, created with the Supabase CLI.

The schema enables RLS on every public table and scopes rows by `auth.uid()`. The server data layer still scopes by the current user; RLS is defense in depth, not the only boundary.

Useful local commands:

```bash
npx supabase start
npx supabase migration up
npx supabase migration list --local
```
