const timelineData = [
  {
    year: "2017-2021",
    title: "Sales Leadership at Scale",
    subtitle: "Mendiola Group, VP of Sales",
    meta: "Grew annual sales from 300 to 6,000 and expanded team from 10 to 50 reps",
    summary:
      "Built repeatable revenue systems before moving into software engineering. This period built my operating style: measurable execution, clear process ownership, and team-wide consistency.",
    highlights: [
      "Exceeded quota by 80% and earned promotion to VP of Sales in year one.",
      "Scaled leadership capacity by managing and training 12 team leaders.",
      "Improved close rates through structured multi-channel sales playbooks."
    ]
  },
  {
    year: "2019-2022",
    title: "Technical Sales in AEC",
    subtitle: "TOPO UAV, Account Executive",
    meta: "100% YoY growth with 90% retention and 32 photogrammetry projects won",
    summary:
      "Worked closely with contractors, engineers, and building management teams on highly technical 3D visualization and LiDAR-related projects. Strengthened domain fluency in construction workflows.",
    highlights: [
      "Built repeat business loops where 40% of revenue came from referrals and existing clients.",
      "Delivered complex visuals for high-profile structures in South Florida.",
      "Combined technical solution framing with consistent commercial execution."
    ]
  },
  {
    year: "2021-2023",
    title: "Virtual Roofing Sales Systems",
    subtitle: "Roof1303.com, Sales Executive and Sales Manager",
    meta: "Closed the first 83 online roof sales before product finalization",
    summary:
      "Helped operationalize virtual roof sales and early team scaling while evolving from frontline selling into repeatable process design and forecasting ownership.",
    highlights: [
      "Migrated sales operations from Trello into Salesforce for better visibility.",
      "Hired and coached a 4-person team to a 40% close rate.",
      "Connected pipeline reporting and budget oversight to growth targets."
    ]
  },
  {
    year: "2022",
    title: "Local-First AI Analyst Prototype",
    subtitle: "Structured decision support workflow",
    meta: "Delivered as a 2-week demo sprint with auditable research controls",
    summary:
      "Built TRD Analyst as a prompt-orchestrated `ticket -> plan -> report` system that transforms broad questions into scoped, reviewable outputs with evidence and confidence framing.",
    highlights: [
      "Added source-quality tiers, acceptance criteria, and artifact pointer tracking.",
      "Enforced human review gates at scope, plan, and recommendation stages.",
      "Designed for local-first operation with a migration path to internal web apps."
    ]
  },
  {
    year: "2023-2024",
    title: "Reehash Product Build Phase",
    subtitle: "Co-Founder and CEO, Product Execution",
    meta: "Delivered 25% sales lift for contractor clients while reducing overhead by 50%",
    summary:
      "Led development of a virtual sales platform and built a companion interactive 3D impact-window presentation product using React, Three.js, and Blender-authored assets.",
    highlights: [
      "Implemented AI-assisted rebuttal support and second-attempt video workflows.",
      "Built scroll-synchronized 3D storytelling with real-time product customization.",
      "Standardized delivery through a `ticket -> plan -> implement -> validate` workflow."
    ]
  },
  {
    year: "2025-Present",
    title: "Safeguard Platform Delivery",
    subtitle: "Founder + full-stack consultant",
    meta: "Shipped quote-to-contract and partner referral systems for impact-window operations",
    summary:
      "Built production-oriented systems across frontend, backend, and data layers, including secure tokenized flows, RLS policy design, workflow automation, and operational documentation.",
    highlights: [
      "Owned full quote-to-contract lifecycle with PDF signing and audit support.",
      "Delivered partner referral platform using React, FastAPI, and Supabase.",
      "Established QA coverage across unit/integration/E2E suites (18 test files)."
    ]
  },
  {
    year: "2026-Present",
    title: "QuoteNclose Multi-Tenant SaaS",
    subtitle: "Full-stack engineering + finance systems",
    meta: "Built tenant-scoped quoting/contracts platform plus docs-first financial governance",
    summary:
      "Current work combines product engineering and strategic finance systems: secure multi-tenant architecture, pricing engines, contract automation, webhook hardening, and investor-grade scenario governance.",
    highlights: [
      "Implemented route + backend RBAC, tenant isolation, and redirect hardening.",
      "Built e-sign + webhook pipelines with HMAC verification and idempotent retries.",
      "Added automated coverage across 26 test files and codified delivery workflows."
    ]
  }
];

const orderedTimelineData = [...timelineData].sort(
  (a, b) => parseTimelineStartYear(b.year) - parseTimelineStartYear(a.year)
);

function parseTimelineStartYear(yearLabel) {
  const match = yearLabel.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

const projectData = [
  {
    name: "QuoteNclose Multi-Tenant SaaS",
    summary:
      "Built a contractor quoting and contract-signing platform with tenant-aware routing, Convex RBAC, pricing engines, document generation, and embedded e-sign workflows.",
    outcome:
      "Delivered secure end-to-end quote and contract lifecycle with deterministic failure handling and 26 test files across critical modules.",
    tags: ["Next.js", "TypeScript", "Convex", "RBAC", "Webhook Security"],
    repoUrl: null,
    demoUrl: null
  },
  {
    name: "Strategic Intelligence and Finance System",
    summary:
      "Private docs-first operating system for business planning, assumptions governance, evidence tracing, and 3-year financial scenario modeling.",
    outcome:
      "Created investor-ready governance with ticketed scenario controls, before/after archives, KPI deltas, and auditable changelog discipline.",
    tags: ["Financial Modeling", "Governance", "Scenario Analysis", "Documentation Ops"],
    repoUrl: null,
    demoUrl: null
  },
  {
    name: "Safeguard Quote Platform",
    summary:
      "Built the full quote-to-contract lifecycle for impact windows and doors with secure homeowner and rep experiences, proposal controls, and signed artifact handling.",
    outcome:
      "Delivered operationally-ready workflows with tokenized access patterns, pricing/proposal versioning, and reliability-focused logging + metrics.",
    tags: ["Product", "Full Stack", "Postgres", "RLS", "Automation"],
    repoUrl: null,
    demoUrl: null
  },
  {
    name: "Safeguard Partner Referral Platform",
    summary:
      "Shipped a full-stack partner-growth product with public referral intake, authenticated partner dashboards, admin lifecycle management, and policy-enforced data access.",
    outcome:
      "Implemented robust auth/session handling, deep-link safety, analytics segmentation, and 18 test files across Python + Vitest + Playwright.",
    tags: ["React", "FastAPI", "Supabase", "Pytest", "Playwright"],
    repoUrl: null,
    demoUrl: null
  },
  {
    name: "Reehash 3D Presentation Platform",
    summary:
      "Created a scroll-driven 3D web experience that explains impact-window engineering through interactive visuals and personalized rep-guided sales flows.",
    outcome:
      "Delivered a reusable contractor presentation asset with synchronized camera/section logic and runtime material customization controls.",
    tags: ["Three.js", "React", "TypeScript", "Blender", "Zustand"],
    repoUrl: null,
    demoUrl: null
  },
  {
    name: "TRD Analyst (Local-First AI Analyst)",
    summary:
      "Two-week prototype that structures open-ended questions into analyst-grade tickets, plans, and sourced reports with explicit quality gates.",
    outcome:
      "Improved research consistency and auditability through deterministic workflow artifacts and human-in-the-loop decision checkpoints.",
    tags: ["AI Workflow", "Research Ops", "Prompt Engineering", "Local-first"],
    repoUrl: null,
    demoUrl: null
  },
  {
    name: "Job Application AI Generator",
    summary:
      "CLI workflow that creates role-specific application folders, copies tailored templates, and updates job tracking artifacts automatically.",
    outcome: "Turned a manual process into a consistent one-command workflow.",
    tags: ["Automation", "Python", "CLI", "Workflow"],
    repoUrl: null,
    demoUrl: null
  }
];

const timelineList = document.querySelector("#timeline-list");
const timelineDetail = document.querySelector("#timeline-detail");
const projectFilters = document.querySelector("#project-filters");
const projectGrid = document.querySelector("#project-grid");

function renderTimeline() {
  timelineList.innerHTML = orderedTimelineData
    .map(
      (item, idx) => `
        <li>
          <button type="button" class="timeline-item" data-index="${idx}" aria-pressed="false">
            <span class="year">${item.year}</span>
            <span class="title">${item.title}</span>
            <span class="subtitle">${item.subtitle}</span>
          </button>
        </li>
      `
    )
    .join("");

  timelineList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (!button) return;
    setActiveTimeline(Number(button.dataset.index));
  });

  setActiveTimeline(0);
}

function setActiveTimeline(index) {
  const selected = orderedTimelineData[index];
  const buttons = timelineList.querySelectorAll("button[data-index]");

  buttons.forEach((button) => {
    const isActive = Number(button.dataset.index) === index;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  timelineDetail.innerHTML = `
    <h3>${selected.title}</h3>
    <p class="detail-meta">${selected.year} - ${selected.meta}</p>
    <p class="detail-body">${selected.summary}</p>
    <ul class="detail-list">
      ${selected.highlights.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
}

const filterOptions = [
  "All",
  ...Array.from(new Set(projectData.flatMap((project) => project.tags)))
];

let activeFilter = "All";

function renderFilterButtons() {
  projectFilters.innerHTML = filterOptions
    .map(
      (filter) =>
        `<button type="button" data-filter="${filter}" class="${
          filter === activeFilter ? "active" : ""
        }" role="tab" aria-selected="${filter === activeFilter}">${filter}</button>`
    )
    .join("");
}

function handleFilterClick(event) {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;

  activeFilter = button.dataset.filter;
  renderFilterButtons();
  renderProjects();
}

function renderProjects() {
  const filtered =
    activeFilter === "All"
      ? projectData
      : projectData.filter((project) => project.tags.includes(activeFilter));

  projectGrid.innerHTML = filtered
    .map(
      (project) => `
        <article class="project-card">
          <h3>${project.name}</h3>
          <p class="project-summary">${project.summary}</p>
          <ul class="project-stack">
            ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
          </ul>
          <p class="project-outcome"><strong>Outcome:</strong> ${project.outcome}</p>
          <div class="project-links">
            ${renderProjectLinks(project)}
          </div>
        </article>
      `
    )
    .join("");

  if (!filtered.length) {
    projectGrid.innerHTML =
      "<p>No projects match this filter yet. Add one in script.js.</p>";
  }
}

function renderProjectLinks(project) {
  const links = [];

  if (project.repoUrl) {
    links.push(
      `<a href="${project.repoUrl}" target="_blank" rel="noreferrer">Repository</a>`
    );
  }

  if (project.demoUrl) {
    links.push(
      `<a href="${project.demoUrl}" target="_blank" rel="noreferrer">Case Study</a>`
    );
  }

  if (!links.length) {
    return '<span class="project-private">Private build. Walkthrough available on request.</span>';
  }

  return links.join("");
}

function setupRevealAnimation() {
  const reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

renderTimeline();
projectFilters.addEventListener("click", handleFilterClick);
renderFilterButtons();
renderProjects();
setupRevealAnimation();
