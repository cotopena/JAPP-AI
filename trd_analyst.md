# TRD Analyst - Local-First AI Analyst Prototype (Build Window: January 2022, 2-Week Demo Sprint)

## Project snapshot
- Built over two weeks as a local-first demo for structured decision support.
- Objective: convert open-ended business or market questions into auditable, reusable analysis artifacts instead of generic AI responses.
- Operating model: human-in-the-loop review at intake, plan approval, and final output validation.

## Core workflow
- `ticket`: structure the question, define scope, constraints, acceptance criteria, and evidence requirements.
- `plan`: break work into an execution path with explicit assumptions, source priorities, and checks.
- `report`: produce sourced analysis with risks, confidence, and recommendation clarity.

## Key implementation details
- Prompt-orchestrated command set:
  - Intake and scope: `/Users/coto/Documents/Code Projects/trd-analyst/12-factor-prompt/commands/create_ticket.md`
  - Plan generation: `/Users/coto/Documents/Code Projects/trd-analyst/12-factor-prompt/commands/create_plan.md`
  - Execution/reporting: `/Users/coto/Documents/Code Projects/trd-analyst/12-factor-prompt/commands/implement_plan.md`
- Workflow policy and source controls:
  - `/Users/coto/Documents/Code Projects/trd-analyst/12-factor-prompt/tooling.config.json`
- Artifact storage:
  - `/Users/coto/Documents/Code Projects/trd-analyst/Documents/Tickets`
  - `/Users/coto/Documents/Code Projects/trd-analyst/Documents/Plans`
  - `/Users/coto/Documents/Code Projects/trd-analyst/Documents/Reports`

## Why this matters
- Demonstrates fast prototype execution with production-style process controls.
- Shows repeatable research operations using ID/counter tracking and `pending`/`latest` pointers.
- Keeps expert judgment central while using AI to accelerate research throughput and consistency.
- Provides a local-first baseline that can later be adapted into internal web applications if scaling needs emerge.

## Resume-ready bullets
- Built a local-first AI Analyst prototype over a 2-week demo sprint that turns open-ended questions into structured, auditable research outputs.
- Designed a prompt-orchestrated workflow (`ticket -> plan -> report`) with scoped constraints, acceptance criteria, source-quality tiers, and artifact tracking to produce decision-ready analysis.
- Implemented reproducible research ops using Markdown artifacts, ID/counter tracking, `pending`/`latest` pointers, and primary-source-first evidence rules.

## Target role language
- Decision Intelligence Analyst
- Market Intelligence Analyst
- Strategic Research Analyst
- Scenario Planning Analyst
- Risk Intelligence Analyst
- Competitive Intelligence Analyst
- AI Operations Analyst
- Investment/Business Research Analyst

## ATS keywords
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
