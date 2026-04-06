# Project Guidelines

## Scope

- Follow the product and delivery requirements in [docs/plans/2026-04-06-social-calendar-design.md](docs/plans/2026-04-06-social-calendar-design.md).
- Build only the MVP for a social media content calendar generator.
- Keep the product frontend-only and Chinese-first.
- Do not add a backend, database, authentication, export flows, or real-time hotspot integrations unless the user explicitly asks.

## Stack

- Use React + Vite + TypeScript.
- Use Tailwind CSS v4 for styling.
- Use shadcn/ui for base UI components.
- Keep content generation rule-driven with local data files; do not depend on remote model calls.

## Architecture

- Keep domain types in `src/types`.
- Keep static datasets such as holidays, industry hotspot templates, and presets in `src/data`.
- Keep deterministic generation logic in `src/logic`.
- Keep UI components thin; business rules should not live inside presentational components.
- Prefer small focused modules over large multi-purpose files.

## Product Rules

- Inputs must include niche, audience, style, and period.
- Period must support only `1周` or `1月`.
- Each generated entry must include date, title, direction, type, hotspot, difficulty, and pillar.
- Content types must cover `干货`、`互动`、`故事`、`热点借势` with reasonable distribution.
- If the selected range overlaps a configured holiday, at least one relevant hotspot entry should be scheduled.
- Difficulty must be rule-based and limited to `低`、`中`、`高`.
- Unknown niches should still produce usable generic content pillars instead of failing.

## UX

- Keep the interface simple, modern, and mobile-friendly.
- Prefer shadcn/ui primitives before creating custom controls.
- Avoid heavy animation and avoid decorative complexity that does not improve readability.
- Keep generated Chinese copy concise and actionable; this tool outputs planning guidance, not final publish-ready copy.

## Build And Verify

- If the app has not been scaffolded yet, start from the design document before adding features.
- After implementation, validate the main flow with both preset examples.
- Expected project commands after scaffolding are `npm install`, `npm run dev`, and `npm run build`.
- Treat a successful build and correct generation for both `1周` and `1月` as the minimum verification bar.

## Conventions

- Favor minimal dependencies and straightforward state management.
- Prefer deterministic rules over random generation.
- Keep comments brief and only where logic is not obvious.
- Update documentation when changing scope, architecture, or usage.