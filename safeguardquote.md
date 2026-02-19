# Safeguard Quote - SafeGuard Impact (CTO Build Summary)

## Scope and ownership
- Sole creator of the Safeguard Quote platform, responsible for architecture, implementation, and delivery across the stack.
- Built the full monorepo: React/Vite frontend, FastAPI backend, Postgres/Supabase data layer, automation assets, and tooling.

## Product vision and architecture
- Designed the quote-to-contract workflow for impact windows and doors.
- Implemented tokenized access for reps and homeowners with RLS-enforced Postgres policies.
- Built request context middleware, CORS controls, and centralized config for environment-driven deployments.
- Added observability with request IDs, structured logs, and Prometheus metrics.

## Rep experience (internal)
- GoHighLevel intake webhook that creates homeowners and draft quotes, then issues rep links.
- Rep workspace with builder, price options, and publish flows.
- Quote item CRUD with measurements, swing, decorations, handle options, privacy, mullbar, low-E, and engineering add-ons.
- Measure locks and quote stage locks to prevent edits after contract milestones.
- Quote markups with homeowner visibility controls and validation.
- Price options engine with coverage status, bucketed size fallback, and package labels.
- Publish and refresh proposal snapshots while keeping stable homeowner links.

## Homeowner experience (public)
- Public proposal portal with package selection, item and add-on toggles, and add-on options (colors, options).
- Proposal versioning to create, update, apply, and delete versions with package switching controls.
- Discount management with presets and metadata handling.
- Financing calculators with APR, term, down payment, and lender selection.
- Opening photo gallery with per-item photos and download-all archives.
- Contract request flow with expiring links, resend logic, and lock state handling.
- Contract details capture (HOA, notes) with auto-save behavior.

## Contracts and signing
- Custom HTML contract templates and hosted signing UI.
- In-house signature capture with audit artifacts.
- Playwright-driven PDF generation for unsigned and signed contracts.
- Secure storage of contract artifacts in private buckets with retention rules.
- Legacy DocuSign Connect webhook handling for envelope events.

## Pricing, catalog, and data pipeline
- Catalog seed pipeline for sizes, add-ons, and package templates.
- SalesPro pricebook normalization pipeline with typed snapshot formats and mapping rules.
- Size bounds generation and validation utilities for pricing integrity.
- Pricebook coverage API with summary and drilldown modes to surface missing sizes.
- Package template copier for proposal packages A-E with validation and labeling.
- Backfill tooling for package expansion and historical data updates.

## Integrations and automation
- Postmark integration for contract and proposal email delivery.
- n8n ops handoff workflow with callback status reporting.
- Integration event logging for webhooks and automation visibility.

## Backend engineering
- FastAPI service with async psycopg pooling and Pydantic schemas.
- RLS-aware DB access layer with token scoping and internal bypass paths.
- Storage utilities for signed URLs, uploads, and deletes.
- Opening photo processing with validation, conversion, and thumbnail generation.
- Metrics endpoints for Prometheus-compatible monitoring.

## Frontend engineering
- React/Vite SPA with typed API client, route shells, and tokenized navigation.
- Rep builder UI for measurement input and markup management.
- Homeowner proposal UI with interactive pricing, financing, and contract tooling.
- Shared components (modals, badges), utilities (money, finance, tokens), and styling system.
- Mock fixtures and API client coverage for local development and demos.

## Quality and tooling
- Pytest suites covering pricing, proposals, contracts, photos, catalog, and CORS.
- Vitest and Testing Library tests for rep and public flows.
- Docker Compose stack with migrations and seed workflows.
- Scripts for migration status, pricebook normalization, catalog seeding, and backfills.
