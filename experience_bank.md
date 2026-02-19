# Experience Bank

Use this file as the full inventory of your experience and achievements. Add extra details that you want to remember even if they do not appear on the resume.

## QuoteNclose (Full-Stack Engineer, Independent Project, 02/2026 - Present)
- Stack: Next.js 16, React 19, TypeScript, Convex, Clerk, Vitest, Playwright, Render, Vercel.
- Built a multi-tenant SaaS platform for contractor quoting and contract signing, covering tenant-aware routing, role-based access control, pricing engines, document generation, embedded e-signature workflows, and admin operations.
- Designed subdomain-based multi-tenant architecture for tenant isolation across app routes and backend data access.
- Implemented deterministic tenant resolution and apex-domain post-sign-in redirects with host/path allowlisting to reduce redirect abuse risk.
- Built deny-by-default route protection with explicit public-route allowlists and role-gated admin paths.
- Implemented backend RBAC enforcement (`owner`, `admin`, `rep`) in Convex with feature flags for safe rollout and rollback.
- Added membership lifecycle management (list/add/update/remove) with last-owner safeguards to prevent admin lockout.
- Modeled a tenant-scoped data layer with 10 core entities (`tenants`, `users`, `memberships`, `customers`, `quotes`, `openings`, `photos`, `contracts`, `contractAuditEvents`, `templates`) and targeted indexes.
- Built quote creation and editing flows for `windows_doors` and `roofing` quote types.
- Implemented a windows/doors builder with inline editing, quantity/dimension capture, completeness scoring, and per-opening photo management.
- Integrated secure file upload flows for opening photos via storage upload URLs and backend authorization checks.
- Built a roofing pricing workflow with material-specific rates and optional flat-extension calculations.
- Implemented a catalog-driven windows/doors pricing engine using generated formula/package/add-on datasets and robust input validation.
- Added quote total patching logic so pricing updates stay synchronized with quote records.
- Built contract lifecycle logic (`draft -> review -> sent -> signed -> archived`) with transition validation and deterministic failure modes.
- Implemented template versioning and active-template selection for contract rendering.
- Built contract preview generation for review-state contracts with dynamic, tenant-aware HTML rendering.
- Developed an authenticated HTML-to-PDF renderer microservice (Node + Express + Playwright) with timeout and payload-size guards.
- Integrated PDF generation into contract workflows with idempotent commit semantics and storage metadata tracking.
- Integrated SignatureAPI for envelope creation and embedded signing ceremony URLs in both admin and public signing flows.
- Implemented public-token signing routes for external signer access without exposing tenant internals.
- Engineered webhook verification for signed completions using HMAC plus timestamp validation and timing-safe comparisons.
- Added webhook idempotency/deduplication and retry logic for provider readiness races before final signed PDF fetch.
- Persisted contract audit events to support traceability of webhook receipt, completion application, and signed PDF storage.
- Built tenant admin consoles for contracts and users, including status filtering, constrained actions, and clear empty/error states.
- Added structured telemetry events for RBAC decisions, quote operations, pricing, contracts, and webhook execution.
- Wrote and maintained automated tests across auth/rbac, pricing engines, contract lifecycle/signing/webhooks, route policy, and admin UI behavior (26 test files).
- Defined deployment and environment workflows across Convex + Vercel app runtime and Render-hosted PDF service.
- Created and maintained a 12-factor prompt/agent workflow (ticket -> plan -> implementation -> verification -> PR docs) with linting scripts for process quality.

### Modular Bullet Library (Pick by Job Type)

#### Full-Stack / Product Engineer
- Built a full-stack contractor SaaS from tenant routing through quoting, contracts, and embedded e-sign completion.
- Delivered end-to-end user flows: quote creation, opening-level customization, pricing, contract preview, send/sign, and post-sign persistence.
- Designed admin experiences for membership management and contract operations with role-aware controls and deterministic UX states.
- Implemented server actions and backend mutations/queries with strict tenant scoping and consistent error surfaces.

#### Backend Engineer
- Designed a multi-tenant, indexed Convex schema and access patterns for tenant-scoped reads/writes.
- Implemented dual-layer authorization (route + backend) to enforce least privilege and reduce bypass risk.
- Built idempotent contract PDF/signing pipelines to avoid duplicate side effects during retries or replayed events.
- Created webhook ingestion architecture with signature verification, event normalization, dedupe keys, retries, and audit logs.
- Implemented catalog-based pricing computation with validation and typed error mapping for safe downstream handling.

#### Security / Platform Engineer
- Hardened webhook and service auth using HMAC signature validation, timestamp freshness checks, and timing-safe token comparisons.
- Implemented redirect hardening with strict host/path validation and deterministic tenant selection logic.
- Added feature flags for gradual RBAC rollout and quick rollback without code removal.
- Enforced tenant-bound data access in all major backend modules and surfaced structured forbidden events for observability.

#### DevEx / Process
- Established a repeatable engineering workflow with machine-lintable ticket/plan/verification command specs.
- Added process lint scripts to enforce documentation and workflow quality gates.
- Standardized environment and deployment documentation for local dev, preview, and production execution paths.

### ATS Keywords
- Multi-tenant SaaS
- RBAC
- Authorization
- Next.js
- React
- TypeScript
- Convex
- Clerk
- Server Actions
- Webhook Security
- HMAC
- Idempotency
- Event Deduplication
- E-signature
- PDF Rendering
- Playwright
- Express
- Observability
- Structured Logging
- Pricing Engine
- Workflow Automation

### Metrics Placeholders to Personalize Later
- Replaced manual quoting process with digital workflow across [X] quote types.
- Reduced quote turnaround time by [X%] or [X hours].
- Supported [X] tenants / [X] internal users / [X] contracts signed.
- Increased successful first-pass contract signing completion to [X%].
- Reduced authorization-related production issues to [X] after RBAC rollout.

## SafeGuard Impact (Founder and Product Lead, 01/2025 - Present)
- Sole creator of the Safeguard Quote platform, owning architecture, implementation, and delivery across frontend, backend, database, and tooling.
- Built the full quote-to-contract lifecycle for impact windows and doors with rep and homeowner experiences.
- Implemented tokenized access patterns, RLS-enforced Postgres policies, request context middleware, and environment-driven deployment controls.
- Delivered pricing and proposal capabilities including item configuration, package options, discounts, financing calculators, and proposal versioning.
- Built contract workflows with hosted signing, PDF generation, secure artifact storage, and audit-focused handling.
- Integrated GoHighLevel webhook intake, Postmark email delivery, and n8n operational handoff automation.
- Added observability and reliability tooling including structured logs, request IDs, Prometheus metrics, and test coverage across critical flows.
- Additional details:
  - 

## SafeGuard Impact - Partner Referral Platform (Full-Stack Developer / Context Engineer, Consultant, 2025 - Present)
- Type: Product build + operations + process design.
- Stack: React, TypeScript, Vite, Tailwind, React Query, Supabase (Auth + Postgres + RLS), FastAPI, Python, Pydantic, Pytest, Vitest, Playwright, Sentry, Postmark/MailDev.
- Built and shipped a full-stack referral platform for SafeGuard's partner program, covering homeowner lead capture, partner onboarding, partner dashboards, and admin operations.
- Owned architecture and implementation across frontend, backend, and database design, including secure auth flows, role-based permissions, data modeling, QA automation, and deployment/readiness documentation.
- Designed a monorepo architecture with a React/Vite frontend (`apps/web`) and FastAPI backend (`apps/server`) backed by Supabase/Postgres.
- Implemented end-to-end referral flows: public invite links, homeowner referral submission, partner invite resolution, authenticated partner dashboards, and an admin control center.
- Built secure backend APIs with role-based access checks and validation rules, including admin-only endpoints and partner-scoped data access.
- Modeled and implemented database schema with enums, indexes, triggers, and Row-Level Security (RLS) policies for partner and referral records.
- Implemented admin workflow for referral lifecycle management (status, deal amount, close date, notes) plus admin privilege management with self-demotion guardrails.
- Built partner analytics with direct vs first-degree indirect referral segmentation and persistent date-range filtering with UTC normalization.
- Added deep-link routing and sanitization logic to safely support campaign/share links while blocking unsafe redirect payloads.
- Improved auth/session resilience with a process-level Supabase lock strategy, timeout handling, token namespace cleanup, and retry behavior.
- Added performance and reliability enhancements including data prefetch/warmup, keepalive health checks, retry/backoff behavior, and client telemetry hooks.
- Established automated QA coverage across unit, integration, and E2E layers (18 test files across Python + Vitest + Playwright).
- Wrote operations-focused documentation for auth setup, onboarding, rollout verification, UI QA, marketing handoff, and deployment safety checks.
- Created reusable, structured engineering workflows (brainstorm -> ticket -> implementation plan -> validation -> manual verification) to improve AI-assisted and human collaboration quality.

### Modular Bullet Library (Pick by Job Type)

#### Software Developer / Full-Stack
- Built a production-oriented full-stack app using React/TypeScript, FastAPI, and Supabase.
- Implemented REST APIs for public submissions, partner dashboards, and admin workflows with strict auth and input validation.
- Designed a Postgres schema with RLS, indexed query paths, and trigger-based timestamp hygiene.
- Developed robust session/auth flows (email/password, OAuth, verification gating, reset/recovery handling).
- Delivered admin tooling for partner management and referral pipeline operations.
- Implemented reusable frontend data/filter hooks and React Query caching/prefetch patterns.
- Added automated tests for critical routes, date-window logic, referral segmentation, auth recovery, and deep-link safety.
- Documented deployment and operational runbooks to reduce regression risk.

#### Context Engineer / AI-First Developer
- Built a structured context-to-delivery workflow system with explicit command playbooks for brainstorming, ticketing, planning, implementation, and manual verification.
- Designed deterministic prompt/process contracts (naming rules, acceptance criteria templates, guardrails, handoff artifacts) to reduce ambiguity in AI-assisted execution.
- Standardized engineering context packaging (code pointers, scope constraints, verification checklists) for high-signal collaboration between human and AI contributors.
- Applied context-engineering principles in product code via typed contracts, strict validation boundaries, and recoverable error states.
- Embedded observability and operational feedback loops (telemetry messages, retries, timeout diagnostics) to improve agent and human debugging quality.
- Produced documentation that bridges product, engineering, and operations contexts so execution remains consistent across environments and contributors.

#### AI Consulting / Business Consulting
- Translated business referral and partner-growth goals into a working digital workflow with measurable operational controls.
- Designed role boundaries and approval mechanics (partner vs admin capabilities, admin request queue, promotion/demotion governance).
- Reduced operational risk by defining email/auth deliverability setup, redirect safety policies, rollout checklists, and post-deploy QA processes.
- Created shared reference docs that aligned engineering, marketing, and partner operations on invite links, referral handling, and support procedures.
- Built a maintainable foundation for scaling partner onboarding and referral attribution while preserving data security and auditability.
- Combined technical delivery with process consulting to improve execution clarity, handoffs, and change management.

### ATS Keywords
- full-stack
- React
- TypeScript
- FastAPI
- Python
- Supabase
- Postgres
- RLS
- Auth
- OAuth
- API design
- admin tooling
- data modeling
- QA automation
- Playwright
- Vitest
- Pytest
- observability
- Sentry
- context engineering
- AI-assisted development
- technical consulting
- business process design

## Reehash.com (Co-Founder and CEO, 05/2023 - 12/2024)
- Spearheaded software development of a virtual sales platform for the roofing industry and expanded it to impact windows and painting.
- Integrated AI-powered tools to assist sales reps in handling rebuttals and complex questions during live video calls.
- Implemented an automated second-attempt strategy via online video calls to reclaim lost leads.
- Increased total sales for contractor clients by 25% through rehash efforts and reduced overhead costs by 50%.
- Delivered branded quotes and financing options aligned with each contractor's branding and homeowner needs.
- Additional details:
  - 

## Reehash.com - Interactive 3D Impact Window & Door Presentation Platform (Software Developer / Product Engineer, Project Build During Reehash Tenure)
- Stack: React, TypeScript, Vite, Three.js, React Three Fiber, Drei, Zustand, Blender, GLB/DRACO assets.
- Built an interactive web presentation that explains hurricane-rated impact windows and doors through a scroll-driven 3D story instead of static slides; this is now used by some contractors as a primary presentation tool.
- Designed and shipped a multi-stage product flow (`setup -> intro -> interactive experience`) to personalize rep delivery and improve transitions to homeowner conversations.
- Implemented a 9-section scroll-synchronized 3D narrative where camera movement, model states, and HTML content stay in lockstep.
- Built keyframe-based camera interpolation and per-section animation logic for smooth scene progression.
- Self-taught Blender during delivery to create and prepare 3D assets, then integrated Blender-authored models into the React + Three.js runtime.
- Established model naming/export contracts so Blender parts could be controlled programmatically from React Three Fiber code.
- Integrated GLB assets with DRACO decoding, including model cloning and object-level transformation pipelines for runtime control.
- Implemented real-time customization controls (glass tint, Low-E coating, frame colors) by wiring UI state directly to Three.js material updates.
- Added an interactive A/C usage simulation driven by temperature inputs and Low-E toggles to support benefit-based sales discussions.
- Implemented contextual sales-assist panels including homeowner score capture and objection follow-up prompts.
- Delivered responsive branded overlays and presentation-safe UI behavior for desktop and mobile sessions.
- Documented and enforced an AI-first `12-factor-prompt` workflow (`ticket -> plan -> implement -> validate -> commit`) with tooling defaults and lint checks for consistent implementation quality.

### Modular Bullet Library (Pick by Job Type)

#### Software Developer / Frontend Engineer
- Developed a React + TypeScript + R3F application that converts product engineering concepts into interactive 3D storytelling.
- Implemented scroll-driven scene orchestration across camera rigging, model transitions, and synchronized narrative sections.
- Built centralized Zustand state to drive both UI controls and 3D material behavior in real time.
- Optimized 3D runtime behavior through GLB loading patterns, scene cloning, and asset preloading.
- Delivered a mobile-aware interface with adaptive overlays, panel behavior, and readable narrative cards.

#### Context Engineer / AI-First Developer
- Designed deterministic behavior from multiple context signals (scroll position, user selections, and session inputs).
- Built explicit asset naming/state contracts between 3D content and frontend logic to reduce ambiguity in agent-assisted changes.
- Authored and used a `12-factor-prompt` workflow to standardize planning, implementation, validation, and commits.
- Added prompt-linting and tool-priority conventions to improve implementation consistency and reduce agent drift.
- Maintained context documentation artifacts that make project intent reusable for future contributors and AI agents.

#### AI Consulting / Solutions Consulting
- Converted domain-heavy construction and performance concepts into a guided visual conversation tool for homeowner meetings.
- Built personalized presentation flows (homeowner details, prior quote context) with live objection-handling support.
- Embedded decision-support interactions (finish comparisons, energy usage simulation, score capture) for consultative selling.
- Balanced technical depth with buyer comprehension using plain-language narrative sections tied to 3D visual proof points.

#### Business Consulting / Product Strategy
- Translated business goals (trust, differentiation, stronger close conversations) into concrete product features and UX flow.
- Created a repeatable narrative framework that explains homeowner value progressively instead of only listing technical specs.
- Instrumented qualitative feedback capture ("what kept us from being a 10?") to support continuous process improvement.
- Delivered a reusable product asset for demos, rep onboarding, and proposal support contexts.

### ATS Keywords
- React
- TypeScript
- Three.js
- React Three Fiber
- Zustand
- Vite
- Blender
- 3D web
- Interactive storytelling
- Product visualization
- Scroll-driven animation
- State management
- Technical communication
- Consultative UX
- AI-first workflow
- Context engineering
- Prompt operations
- Agentic development
- Sales enablement tools
- Decision-support UI
- Customer-facing prototypes

## TRD Analyst - Local-First AI Analyst Prototype (Independent Project, 01/2022, 2-Week Demo Sprint)
- Built a local-first AI Analyst prototype over a 2-week demo sprint that turns open-ended questions into structured, auditable research outputs.
- Designed a prompt-orchestrated workflow (`ticket -> plan -> report`) with scoped constraints, acceptance criteria, source-quality tiers, and artifact tracking.
- Implemented reproducible research operations with Markdown artifacts, ID/counter tracking, and `pending`/`latest` pointers across tickets, plans, and reports.
- Established primary-source-first evidence rules plus assumptions, risks, and confidence sections to keep outputs decision-ready.
- Kept experts in the loop by requiring human review at scope definition, plan approval, and final recommendation stages.
- Designed the workflow to run locally first for privacy and speed, with a migration path for future internal web app use if needed.

### Modular Bullet Library (Pick by Job Type)

#### Decision Intelligence / Market Intelligence
- Built a local AI decision-support workflow that converts raw questions into analyst-grade tickets, validated plans, and cited reports.
- Standardized research delivery into repeatable artifacts so stakeholders could review assumptions, risks, and confidence before acting.
- Increased analysis consistency by enforcing scoped constraints, evidence tiers, and acceptance criteria per request.

#### AI Operations / Knowledge Operations
- Implemented prompt-engineered workflow orchestration (`ticket -> plan -> report`) with deterministic artifact handoffs.
- Created reproducible research ops using Markdown deliverables, ID counters, and `pending`/`latest` pointer conventions.
- Applied primary-source-first policy controls to reduce low-quality citations and improve auditability.

#### Consulting / Strategy
- Translated ambiguous business questions into structured scenario analyses with explicit assumptions and decision criteria.
- Built a human-in-the-loop model where experts validate scope and outputs, keeping speed gains without sacrificing judgment.
- Delivered a local-first prototype approach that organizations can operationalize quickly before investing in full platform builds.

### ATS Keywords
- Local-first AI
- Prompt Engineering
- AI Workflow Orchestration
- Structured Decision Support
- Scenario Modeling
- Research Automation
- Evidence-based Reporting
- Human-in-the-loop AI
- Knowledge Operations
- Analyst Copilot Systems

## Roof1303.com (Sales Executive and Sales Manager, 10/2021 - 05/2023)
- Prospected and closed the first 83 online roof sales using virtual web-based demos before product finalization.
- Organized the sales pipeline in Trello and migrated to Salesforce to improve efficiency.
- Recruited and trained a high-performing sales team of four, achieving a 40% lead closure rate.
- Oversaw sales forecasting, budget oversight, and process optimization to meet financial objectives.
- Additional details:
  - 

## TOPO UAV, LLC (Account Executive, 01/2019 - 12/2022)
- Achieved 100% year-on-year sales growth from 2019 to 2022 through targeted outreach.
- Maintained 90% client retention with 40% of business from repeat customers and referrals.
- Secured 32 photogrammetry projects, boosting revenue through short-term engagements.
- Delivered 3D visualizations for notable structures including W Marriott Miami Beach and St Regis Bal Harbour.
- Collaborated with contractors, engineers, and building management firms on post-Champlain Towers evaluations using LiDAR.
- Additional details:
  - 

## Mendiola Group, Inc (VP of Sales, 09/2017 - 09/2021)
- Exceeded sales quotas by 80% from 2017 to 2018, leading to promotion to VP of Sales in 2018.
- Built and executed a sales funnel that grew annual sales from 300 in 2017 to 6,000 by 2021.
- Expanded the sales team from 10 to 50 reps by managing and training 12 team leaders.
- Increased closing percentage by 80% in 2020 through targeted strategies and multiple sales channels.
- Additional details:
  - 

## StubHub (Sales Executive, 02/2017 - 09/2017)
- Led Europe and Latin America sales from March to September by encouraging VIP client ticket bundles.
- Maintained the highest repeat customer rate with proactive, continuous communication.
- Championed the "Fan Connection" strategy to build trust with potential buyers.
- Additional details:
  - 

## WeeklySpoon, LLC (Digital Project Manager, 02/2014 - 01/2016)
- Developed client relationships and business plans with Gantt charts to streamline teams.
- Implemented marketing strategies across Google Analytics, AdWords, SEO, SEM, email, and Facebook Ads Manager.
- Coordinated tasks across developers, designers, and account managers to ensure on-time delivery.
- Additional details:
  - 

## Balboa Bank and Trust (Summer Analyst, 07/2012 - 08/2012)
- Supported CFO projects by creating expense reports, forecasts, budgets, and operational plans.
- Maintained a 99.9% success rate for executive services by memorizing preferences.
- Additional details:
  - 
