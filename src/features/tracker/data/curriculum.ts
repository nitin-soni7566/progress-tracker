import type { CurriculumPhase, Rank } from "../types";

export const CURRICULUM: CurriculumPhase[] = [
  {
    id: "p1", name: "Backend Depth", meta: "4–6 weeks · highest leverage",
    items: [
      {
        id: "db-index", t: "Indexing & query plans", s: "EXPLAIN ANALYZE, when indexes help/hurt",
        learn: [
          "B-tree vs hash indexes, and how composite index column order changes what queries they can serve",
          "Read an EXPLAIN ANALYZE plan: seq scan vs index scan vs index-only scan, cost vs actual time",
          "Covering indexes — when a query can be answered from the index alone",
          "Why every index slows down writes — don't index columns you never filter/sort/join on",
          "Practice: find a slow query in a real project, add an index, prove the improvement with before/after timings",
        ],
      },
      {
        id: "db-nplus1", t: "N+1 problem & query tuning", s: "eager vs lazy loading, joins",
        learn: [
          "Spot N+1 patterns in ORM code (a loop that triggers one query per row)",
          "Fix with eager loading — select_related/prefetch_related (Django), joinedload/selectinload (SQLAlchemy), include (Prisma)",
          "Understand the join-vs-separate-query tradeoff eager loading makes under the hood",
          "Profile actual query counts per request (Django Debug Toolbar, SQLAlchemy echo, or query logging)",
        ],
      },
      {
        id: "db-tx", t: "Transactions & isolation levels", s: "ACID, locking, deadlocks",
        learn: [
          "ACID properties and what each one actually guarantees",
          "Isolation levels — read committed, repeatable read, serializable — and which anomalies each prevents",
          "Row-level locking, and how two transactions can deadlock each other",
          "Practice: wrap a multi-step write (e.g. transfer between two rows) in a transaction with rollback on failure",
        ],
      },
      {
        id: "db-pool", t: "Connection pooling", s: "why it matters under load",
        learn: [
          "Why opening a new DB connection per request collapses under concurrent load",
          "How a pool (PgBouncer, or your framework's built-in pool) reuses connections — min/max size, timeouts",
          "Symptoms of pool exhaustion and how to diagnose them from logs/metrics",
        ],
      },
      {
        id: "redis", t: "Redis caching", s: "cache-aside, TTLs, invalidation",
        learn: [
          "Cache-aside pattern: read cache → miss → read DB → write cache",
          "Choosing sane TTLs and an invalidation strategy so stale data doesn't linger",
          "Core data structures — strings, hashes, sorted sets — and when each fits",
          "Cache stampede: why many clients missing at once can hammer the DB, and how locking/jitter prevents it",
        ],
      },
      {
        id: "celery", t: "Task queues (Celery)", s: "background jobs, RabbitMQ/Redis broker",
        learn: [
          "Producer/consumer model and the role of the broker (Redis or RabbitMQ)",
          "Writing idempotent tasks so retries don't double-apply side effects",
          "Retry policies, timeouts, and dead-letter/failure handling",
          "Scheduling periodic jobs with Celery beat",
        ],
      },
      {
        id: "restdesign", t: "API design done right", s: "pagination, versioning, rate limiting",
        learn: [
          "Cursor pagination vs offset pagination — and why cursors hold up better on large, changing datasets",
          "Versioning strategies (URL, header) and how to evolve an API without breaking clients",
          "Rate limiting algorithms — token bucket vs sliding window",
          "Consistent resource naming and a predictable error response shape",
        ],
      },
      {
        id: "auth", t: "Auth deeply", s: "OAuth2, JWT vs sessions, refresh, RBAC",
        learn: [
          "OAuth2 flows in depth — authorization code flow with PKCE for browser/mobile clients",
          "JWT structure and signing, and where JWTs are the wrong tool (revocation is hard)",
          "Sessions vs tokens tradeoffs, and refresh-token rotation to limit stolen-token damage",
          "Role-based access control (RBAC) design — roles, permissions, least privilege",
        ],
      },
      {
        id: "pytest", t: "Real testing in pytest", s: "fixtures, mocking, integration tests",
        learn: [
          "Fixtures and fixture scopes (function/module/session) to avoid duplicated setup",
          "Mocking external services (payment APIs, email) without mocking your own DB",
          "Integration tests that hit a real (or test) database, not just unit tests with everything faked",
          "Writing assertions that catch real bugs, not just chasing a coverage percentage",
        ],
      },
    ]
  },
  {
    id: "p2", name: "Systems & Production", meta: "4–6 weeks · mid → senior",
    items: [
      {
        id: "docker", t: "Docker & docker-compose", s: "images, layers, multi-service local dev",
        learn: [
          "Images and layers — why layer order affects build cache and image size",
          "Writing a multi-stage Dockerfile to keep production images small",
          "docker-compose to run app + DB + Redis together locally with one command",
          "Volumes (persisting data) and networking (services reaching each other by name)",
        ],
      },
      {
        id: "cicd", t: "CI/CD with GitHub Actions", s: "test + build + deploy pipeline",
        learn: [
          "GitHub Actions workflow syntax — jobs, steps, triggers (push, PR)",
          "Running your test suite automatically on every PR before merge",
          "Building and pushing a Docker image as part of the pipeline",
          "Managing secrets (API keys, deploy credentials) safely in CI",
        ],
      },
      {
        id: "cloud", t: "One cloud provider (AWS/GCP)", s: "compute, managed DB, object storage",
        learn: [
          "Pick one provider (AWS or GCP) and stick with it to build depth instead of breadth",
          "Compute basics — EC2/Cloud Run — deploying and exposing a service",
          "A managed database (RDS/Cloud SQL) instead of self-hosting Postgres",
          "Object storage (S3/GCS) for files/uploads, and basic IAM — who can access what",
        ],
      },
      {
        id: "obs", t: "Observability", s: "structured logs, metrics, tracing",
        learn: [
          "Structured (JSON) logging instead of free-text print statements",
          "Basic metrics — request rate, error rate, latency — and a tool like Prometheus to collect them",
          "Distributed tracing concepts — following one request across multiple services",
          "Correlating logs/metrics/traces for the same request (request IDs)",
        ],
      },
      {
        id: "owasp", t: "Security — OWASP Top 10", s: "injection, auth flaws, secrets",
        learn: [
          "Injection attacks — SQL injection, XSS — and why parameterized queries/escaping stop them",
          "Broken authentication and session management pitfalls",
          "Sensitive data exposure — never logging secrets, encrypting data in transit/at rest",
          "Secrets management (env vars, secret managers) instead of hardcoding keys",
          "Dependency scanning for known-vulnerable packages",
        ],
      },
      {
        id: "sysdesign", t: "System design fundamentals", s: "load balancing, scaling, queue vs cache",
        learn: [
          "Load balancing algorithms (round robin, least connections) and why you need one past a single server",
          "Horizontal vs vertical scaling, and which failure modes each trades away",
          "When to reach for a queue (decouple + smooth spikes) vs a cache (avoid recomputation)",
          "CAP theorem basics — consistency vs availability under a network partition",
        ],
      },
    ]
  },
  {
    id: "p3", name: "Frontend for Full-Stack", meta: "6–8 weeks · your new territory",
    items: [
      {
        id: "htmlcss", t: "HTML & CSS fundamentals", s: "layout, flexbox, grid, responsive",
        learn: [
          "Semantic HTML — using the right element for the job, not divs for everything",
          "Flexbox for one-dimensional layout, Grid for two-dimensional layout",
          "The box model (content/padding/border/margin) and why it trips people up",
          "Responsive design — relative units, media queries, mobile-first thinking",
        ],
      },
      {
        id: "js", t: "Modern JavaScript (ES6+)", s: "async/await, modules, the DOM",
        learn: [
          "Promises and async/await — and what's actually happening under the hood (microtask queue)",
          "Closures — why they matter for callbacks and state",
          "ES modules — import/export, and how bundlers use them",
          "DOM manipulation and events — the vanilla APIs React abstracts over",
        ],
      },
      {
        id: "ts", t: "TypeScript", s: "types, generics, safer code",
        learn: [
          "Basic types, interfaces vs type aliases",
          "Generics — writing functions/components that work across types without losing safety",
          "Type narrowing (if checks, discriminated unions) to handle union types correctly",
          "Turning on strict mode and actually fixing what it flags, not suppressing it",
        ],
      },
      {
        id: "react", t: "React", s: "components, hooks, state",
        learn: [
          "Components and props vs state — what belongs where",
          "Core hooks — useState, useEffect, useMemo/useCallback — and when useEffect is actually needed",
          "Lifting state up vs local component state",
          "Controlled inputs and rendering lists correctly (stable keys)",
        ],
      },
      {
        id: "next", t: "Next.js", s: "SSR & API routes — familiar territory",
        learn: [
          "File-based routing and layouts",
          "SSR vs SSG vs client-side rendering, and when each makes sense",
          "API routes — building backend endpoints inside the same app",
          "Data fetching patterns (server components, loaders) for the version you're using",
        ],
      },
      {
        id: "tailwind", t: "Tailwind CSS", s: "styling without fighting CSS",
        learn: [
          "Utility-first workflow — composing styles from small classes instead of writing custom CSS",
          "Responsive prefixes (sm:, md:, lg:) for breakpoint-specific styles",
          "Customizing the theme (colors, spacing) instead of fighting the defaults",
          "Extracting components/@apply when utility soup gets unreadable",
        ],
      },
      {
        id: "consume", t: "Consuming APIs from the frontend", s: "fetch, auth tokens, loading/error states",
        learn: [
          "TanStack Query for all data fetching — useQuery for reads, useMutation for writes",
          "Modeling loading / error / success states explicitly instead of guessing from data shape",
          "Attaching auth tokens to requests and handling 401s (e.g. refresh-and-retry)",
          "Basic retry/backoff for flaky network calls",
        ],
      },
    ]
  },
  {
    id: "p4", name: "Capstone Project", meta: "ongoing · your portfolio piece",
    items: [
      {
        id: "cap-build", t: "Build one full-stack app end to end", s: "Next.js + FastAPI + Postgres + Redis",
        learn: [
          "Pick one real problem worth solving, not a generic todo app",
          "Design the Postgres schema before writing code",
          "Build the FastAPI backend and Next.js frontend against it",
          "Add Redis where it earns its place (caching or session storage), not just to check a box",
        ],
      },
      {
        id: "cap-auth", t: "Wire up auth across the stack", s: "login, protected routes, refresh",
        learn: [
          "Apply what you learned in the Auth item to a real app: login/signup flow",
          "Protected routes on both frontend (redirect if unauthenticated) and backend (reject unauthorized requests)",
          "End-to-end refresh-token flow so sessions survive without forcing re-login constantly",
        ],
      },
      {
        id: "cap-docker", t: "Dockerize the whole thing", s: "one compose file, reproducible",
        learn: [
          "One docker-compose.yml that brings up frontend, backend, Postgres, and Redis together",
          "Environment variables for config instead of hardcoded values",
          "Confirm a teammate could clone the repo and run it with a single command",
        ],
      },
      {
        id: "cap-deploy", t: "Deploy with CI/CD", s: "live URL, automated pipeline",
        learn: [
          "A CI pipeline that runs tests, builds, and deploys on merge to main",
          "Deploy to a real host (Fly.io, Render, or your chosen cloud provider) with a live URL",
          "Basic rollback plan if a deploy breaks production",
        ],
      },
    ]
  },
];

export const RANKS: Rank[] = [
  { at: 0,   name: "API Developer",             note: "where you're starting" },
  { at: 15,  name: "Backend Engineer",          note: "the fundamentals are landing" },
  { at: 35,  name: "Advanced Backend",          note: "you understand the why, not just the how" },
  { at: 55,  name: "Full-Stack Developer",      note: "both sides of the API now" },
  { at: 78,  name: "Senior in Training",        note: "systems thinking is kicking in" },
  { at: 100, name: "Senior Full-Stack Developer", note: "you built it, you shipped it, you own it" },
];

export const RANK_SHORT = ["API Dev", "Backend", "Advanced", "Full-Stack", "Sr. Track", "Senior"];

export const TOTAL_ITEMS = CURRICULUM.reduce((n, p) => n + p.items.length, 0);
