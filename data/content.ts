export type Project = {
  id: string;
  category: string;
  name: string;
  description: string;
  bullets: string[];
  stack: string[];
  accentColor: string;
  url: string;
};

export type StackItem = {
  name: string;
  category: "frontend" | "ai" | "backend" | "infra";
};

export type TimelineEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  duration: string;
  location: string;
  isCurrent: boolean;
  bullets: string[];
  skills: string[];
  dotColor: string;
};

export const projects: Project[] = [
  {
    id: "aeon",
    category: "AI · Legal Tech · Live",
    name: "Aeon Legal Tech",
    description:
      "AI-powered legal document automation platform serving law firms, enterprises, and banking institutions. Cuts document drafting from hours to minutes with compliance-aware generation.",
    bullets: [
      "Enterprise-grade AI that generates compliant first drafts without training on user data",
      "SOC-compliant security infrastructure with end-to-end encryption",
      "Targets law firms, banks & Fortune 500 legal departments",
    ],
    stack: ["React", "Python", "AI / LLM", "AWS"],
    accentColor: "#4ecdc4",
    url: "https://aeonlegaltech.com",
  },
  {
    id: "lumino",
    category: "Data · Enterprise · Analytics · Live",
    name: "Lumino",
    description:
      "Enterprise intelligence platform for grant-making organizations. Replaces spreadsheet chaos with data-driven grant intelligence, financial forecasting, and portfolio risk analysis.",
    bullets: [
      "Grant analytics with geographic & cause segmentation, grantee performance metrics",
      "Financial forecasting & proforma modeling with portfolio risk assessment",
      "Built on React 19, FastAPI, PostgreSQL — deployed on AWS ECS with Terraform",
    ],
    stack: ["React 19", "FastAPI", "PostgreSQL", "Terraform", "AWS ECS"],
    accentColor: "#111111",
    url: "https://www.luminoinsight.com",
  },
];

export const stackItems: StackItem[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Claude API", category: "ai" },
  { name: "AWS Bedrock", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "Python", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "AWS Lambda", category: "infra" },
  { name: "PostgreSQL", category: "infra" },
  { name: "DynamoDB", category: "infra" },
  { name: "Docker", category: "infra" },
  { name: "Terraform", category: "infra" },
];

export const stackCategoryStyles: Record<
  StackItem["category"],
  { bg: string; text: string; border: string }
> = {
  frontend: { bg: "#111111", text: "#ffffff", border: "#111111" },
  ai: { bg: "#ff6b6b", text: "#ffffff", border: "#ff6b6b" },
  backend: { bg: "#4ecdc4", text: "#ffffff", border: "#4ecdc4" },
  infra: { bg: "#f0f0ee", text: "#555555", border: "#e0e0de" },
};

export const timelineEntries: TimelineEntry[] = [
  {
    id: "l2",
    role: "Associate Software Engineer — L2",
    company: "Yotta Tech Ports",
    period: "Apr 2025 – Present",
    duration: "1 yr 2 mos",
    location: "Hyderabad, India",
    isCurrent: true,
    bullets: [
      "Building YottaBuilder — AI platform with multi-agent orchestration, RAG pipelines & knowledge graphs",
      "Owning backend services, cloud infrastructure & CI/CD pipelines for production systems",
      "Leading full feature delivery from requirement analysis through deployment",
    ],
    skills: ["Claude API", "FastAPI", "React", "AWS", "Python"],
    dotColor: "#ff6b6b",
  },
  {
    id: "ase",
    role: "Associate Software Engineer",
    company: "Yotta Tech Ports",
    period: "Jun 2023 – Mar 2025",
    duration: "1 yr 10 mos",
    location: "Hyderabad, India",
    isCurrent: false,
    bullets: [
      "Developed & maintained full-stack features across multiple production systems",
      "Built REST APIs, data models & AWS integrations for Aeon Legal Tech and Lumino",
    ],
    skills: ["Python", "React", "PostgreSQL", "AWS"],
    dotColor: "#4ecdc4",
  },
  {
    id: "intern",
    role: "Project Intern",
    company: "Yotta Tech Ports",
    period: "Dec 2022 – May 2023",
    duration: "6 mos",
    location: "Hyderabad, India",
    isCurrent: false,
    bullets: [
      "Full-stack development using Python, React, and PostgreSQL — first production code",
    ],
    skills: ["Python", "React", "PostgreSQL"],
    dotColor: "#888888",
  },
];
