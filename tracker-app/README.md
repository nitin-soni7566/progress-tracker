# Path to Senior Full-Stack — Progress Tracker

A checklist app for tracking progress through a full-stack learning curriculum. Check off skills as you learn them, expand any item to see exactly what to study, and watch your "rank" go up as you complete more of the roadmap. Progress is saved automatically in your browser (no backend, no login).

## Tech stack

| Tool | What it's for |
|---|---|
| [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) | Building the UI, with types to catch mistakes early |
| [Vite](https://vite.dev) | Runs the dev server and builds the production files |
| [Tailwind CSS](https://tailwindcss.com) | Styling using utility classes instead of separate CSS files |
| [shadcn/ui](https://ui.shadcn.com) | Pre-built UI pieces (buttons, badges, collapsible panels, progress bars) |

## Getting started

```bash
npm install    # install dependencies (only needed once)
npm run dev    # start the dev server, then open the URL it prints
```

Other useful commands:

```bash
npm run build      # type-check and build for production (output goes to dist/)
npm run preview    # preview the production build locally
npm run typecheck  # run the TypeScript compiler without building
npm run lint       # check the code for common mistakes
```

## New to React/TypeScript? Start here

If this is your first time in a codebase like this, a few terms will come up a lot:

- **Component** — a function that returns UI (written in JSX, which looks like HTML mixed into JavaScript/TypeScript). Every file in `components/` exports one. Example: `Hero.tsx` is the function `Hero()` that renders the top banner.
- **Props** — the "arguments" you pass into a component, e.g. `<Hero doneCount={5} streak={2} />`. In TypeScript, a component declares what props it accepts with an `interface`, right above the component itself (look for `interface HeroProps { ... }`).
- **State** — data that can change while the app is running (like which items are checked off). Managed with React's `useState`. When state changes, the component re-renders automatically.
- **Hook** — any function starting with `use` (`useState`, `useEffect`, or our own `useProgress`). Hooks are how components get state, side effects (like reading/writing `localStorage`), and shared logic.
- **Type** — TypeScript's way of describing the *shape* of data (e.g. "a `CurriculumItem` always has an `id`, a `t`, an `s`, and a `learn` array of strings"). If you pass the wrong shape of data somewhere, TypeScript flags it in your editor before you even run the code — that's the whole point.

A good reading order for this codebase:
1. `src/features/tracker/types.ts` — the shapes of the data (start here, it's short)
2. `src/features/tracker/data/curriculum.ts` — the actual curriculum content, typed against those shapes
3. `src/features/tracker/hooks/useProgress.ts` — how checked/unchecked state is tracked and saved
4. `src/features/tracker/components/` — the UI pieces, smallest first: `SaveNote.tsx` → `Footer.tsx` → `ChecklistItem.tsx` → `PhaseCard.tsx` → `Hero.tsx`
5. `src/features/tracker/pages/TrackerPage.tsx` — where everything gets wired together

## Project structure

```
src/
├── components/ui/            # shadcn/ui components (buttons, badges, etc.)
├── features/tracker/
│   ├── components/           # this app's own UI pieces (Hero, PhaseCard, ...)
│   ├── hooks/useProgress.ts  # checklist state + localStorage persistence
│   ├── data/curriculum.ts    # the curriculum content
│   ├── pages/TrackerPage.tsx # assembles the components into the full page
│   └── types.ts              # shared TypeScript types for this feature
├── lib/utils.ts              # small helper used by shadcn components
└── App.tsx                   # the app's entry component
```

Everything under `features/tracker/` is specific to this one feature. If the app ever grows a second feature, anything reused by both would move up into a shared `components/common/`, `hooks/`, or `types/` folder at the `src/` level.

## Editing the curriculum

All of the checklist content lives in one file: `src/features/tracker/data/curriculum.ts`. Each item looks like this:

```ts
{
  id: "db-index",                              // must be unique
  t: "Indexing & query plans",                  // title
  s: "EXPLAIN ANALYZE, when indexes help/hurt",  // short subtitle
  learn: [
    "B-tree vs hash indexes, ...",              // bullet points shown when expanded
    "Read an EXPLAIN ANALYZE plan, ...",
  ],
},
```

Add, remove, or edit items directly in that array — the UI (percentages, ranks, phase counts) updates automatically since everything is calculated from this list.
