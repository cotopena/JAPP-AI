const timelineData = [
  {
    year: "2018",
    title: "Revenue Operations Foundation",
    subtitle: "Sales and process execution",
    meta: "Scaled pipeline execution and process consistency",
    summary:
      "Built a strong operations backbone by turning messy workflows into repeatable systems. This period shaped my bias for measurable outcomes and practical tooling.",
    highlights: [
      "Standardized deal and follow-up workflows to reduce task leakage.",
      "Built reporting habits that made weekly performance trends visible.",
      "Collaborated cross-functionally to align execution with revenue goals."
    ]
  },
  {
    year: "2021",
    title: "Automation Mindset",
    subtitle: "Internal tools and productivity scripts",
    meta: "Reduced repetitive manual work through scriptable workflows",
    summary:
      "Started replacing manual tracking and copy-paste tasks with scripted tools. The focus was speed, fewer errors, and cleaner handoffs between people.",
    highlights: [
      "Created script-driven templates for repetitive document workflows.",
      "Moved critical process data into centralized, reusable structures.",
      "Cut turnaround time on recurring tasks with simple automation."
    ]
  },
  {
    year: "2022",
    title: "Local-First AI Analyst Prototype",
    subtitle: "Structured decision support workflow",
    meta: "Built as a 2-week demo for auditable research operations",
    summary:
      "Created a repeatable AI analyst workflow that turns broad questions into scoped tickets, executable plans, and sourced reports. The design kept human experts in the loop while accelerating research speed and consistency.",
    highlights: [
      "Implemented a prompt-orchestrated `ticket -> plan -> report` pipeline.",
      "Added source-quality tiers, artifact tracking, and acceptance criteria controls.",
      "Defined a local-first operating model with a migration path to internal web apps."
    ]
  },
  {
    year: "2024",
    title: "Software Engineering Execution",
    subtitle: "Full-stack product building",
    meta: "Delivered end-to-end solutions from problem framing to release",
    summary:
      "Transitioned into full software delivery with a product lens: understand user needs, design resilient systems, ship in iterations, and validate results.",
    highlights: [
      "Implemented features across frontend, backend, and database layers.",
      "Structured work into reproducible plans, tickets, and verification steps.",
      "Prioritized maintainability and future change over short-term hacks."
    ]
  },
  {
    year: "Now",
    title: "AI-Accelerated Engineering",
    subtitle: "Quality at speed",
    meta: "Using AI as leverage while keeping engineering standards high",
    summary:
      "Current focus is combining AI-assisted execution with clear architecture, strong testing habits, and high-signal communication so teams move faster without losing rigor.",
    highlights: [
      "Use AI to accelerate scaffolding, debugging, and delivery loops.",
      "Maintain strict review quality around correctness and regressions.",
      "Design systems and workflows that other teams can confidently reuse."
    ]
  }
];

const projectData = [
  {
    name: "Job Application AI Generator",
    summary:
      "CLI workflow that creates role-specific application folders, copies tailored templates, and updates a tracking pipeline automatically.",
    outcome: "Turned a manual process into a repeatable one-command workflow.",
    tags: ["Automation", "Python", "CLI"],
    repoUrl: "https://github.com/",
    demoUrl: "#"
  },
  {
    name: "TRD Analyst (Local-First AI Analyst)",
    summary:
      "2-week prototype that structures open-ended questions into analyst-grade tickets, plans, and sourced reports using a human-in-the-loop workflow.",
    outcome:
      "Delivered faster, more consistent, and auditable decision-support outputs without sacrificing expert oversight.",
    tags: ["AI", "Decision Support", "Research Ops"],
    repoUrl: "https://github.com/",
    demoUrl: "#"
  },
  {
    name: "Safeguard Quote Delivery Flow",
    summary:
      "Structured roadmap-to-release workflow with scoped tickets, implementation checkpoints, and manual verification patterns.",
    outcome: "Improved delivery predictability and reduced scope drift.",
    tags: ["Product", "Full Stack", "Execution"],
    repoUrl: "https://github.com/",
    demoUrl: "#"
  },
  {
    name: "Finance Scenario Engine",
    summary:
      "Scenario modeling workflow for pricing, commissions, burn, and runway to support operational decision-making.",
    outcome: "Enabled faster go/no-go decisions with consistent assumptions.",
    tags: ["Data", "Modeling", "Decision Support"],
    repoUrl: "https://github.com/",
    demoUrl: "#"
  },
  {
    name: "Career Trajectory Portfolio",
    summary:
      "This interactive site showcasing engineering growth, project proof, and delivery principles through a dynamic user interface.",
    outcome: "Created a polished personal brand asset optimized for recruiters and hiring teams.",
    tags: ["Frontend", "JavaScript", "Design"],
    repoUrl: "https://github.com/",
    demoUrl: "#"
  }
];

const timelineList = document.querySelector("#timeline-list");
const timelineDetail = document.querySelector("#timeline-detail");
const projectFilters = document.querySelector("#project-filters");
const projectGrid = document.querySelector("#project-grid");

function renderTimeline() {
  timelineList.innerHTML = timelineData
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
  const selected = timelineData[index];
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
            <a href="${project.repoUrl}" target="_blank" rel="noreferrer">Repository</a>
            <a href="${project.demoUrl}" target="_blank" rel="noreferrer">Case Study</a>
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
