# MintPay Support + Admin System

Drop these files into your project (same paths). They form one connected system.

## The pieces
- `components/support-widget.tsx`  — floating chat bubble on the site. Mount it once
  (already mounted in landing-page.tsx via `<SupportWidget />`).
- `app/api/support/route.ts`       — user side: POST starts/continues a thread, GET polls for replies.
- `app/admin/page.tsx`             — the dashboard at /admin (login + inbox + reply).
- `app/api/admin/login/route.ts`   — POST logs in (sets a signed cookie), DELETE logs out.
- `app/api/support/admin/route.ts` — admin side: GET lists threads, POST sends a reply. Auth-guarded.
- `lib/server/support-store.ts`    — where threads live (memory + JSON file).
- `lib/server/admin-auth.ts`       — cookie signing + credential check.
- `lib/server/email.ts`            — sendSupportAlert (new msg -> admin inbox) + sendSupportReply (reply -> customer).

## How a message flows
1. Visitor types in the widget -> POST /api/support -> createThread()/addMessage() in the store
   -> sendSupportAlert() emails SUPPORT_EMAIL so you're notified even if /admin is closed.
2. You open /admin, log in (Chris / Chris222), see the thread (unread badge).
3. You reply -> POST /api/support/admin -> addMessage(admin) -> sendSupportReply() emails the customer.
4. The visitor's widget polls GET /api/support?thread=ID every 3s and shows your reply.

## Env vars (set in .env.local and on your host)
    SUPPORT_EMAIL=support@mintpay.com      # where new-message alerts go
    ADMIN_USER=Chris
    ADMIN_PASSWORD=Chris222                # CHANGE for production
    ADMIN_SECRET=<long-random-string>      # signs the admin cookie — CHANGE for production
    SUPPORT_DATA_DIR=/tmp/mintpay-support  # thread storage dir
    RESEND_API_KEY=re_...                  # for the email alerts/replies
    EMAIL_FROM=MintPay <onboarding@resend.dev>

## IMPORTANT — storage on serverless (Vercel)
The store is memory + a temp file. On Vercel, instances don't share memory and the
filesystem is ephemeral, so the in-app thread history can reset between requests.
The EMAIL copy of every message always goes through, so you never lose a message —
but for reliable in-dashboard history on Vercel, back the store with a small DB
(Upstash Redis / Vercel KV). On a long-running server (Render, Railway, VPS, `next start`)
it persists fine as-is.
