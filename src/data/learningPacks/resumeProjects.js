// src/data/learningPacks/resumeProjects.js
// Canonical Learning Pack: Resume, Portfolio & Production Projects

export const resumeProjectsPack = {
  id: 'pack-resume-projects',
  slug: 'resume-projects',
  title: 'Resume & Production Projects',
  category: 'Career & Interview',
  difficulty: 'Beginner to Intermediate',
  priority: 'High',
  estimatedHours: 25,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-10',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-28',
  description: 'ATS-optimized resume engineering, technical skill framing, GitHub portfolio showcase, live deployment, README documentation, and end-to-end software project development lifecycle.',
  targetUsers: 'Students, job applicants, and engineers crafting resumes and standout portfolio projects.',
  prerequisites: ['At least one completed or in-progress coding project'],
  tags: ['resume', 'ats', 'portfolio', 'github', 'projects', 'deployment', 'placements'],
  relatedPacks: ['pack-interview-prep', 'pack-git-tools', 'pack-web-fundamentals'],
  relatedTemplates: ['full-stack-developer', 'ai-ml-engineer', 'software-developer-placement'],
  careerRelevance: 'The primary asset that gets you past automated ATS resume screening and lands interview callbacks.',
  learningOutcomes: [
    'Build a clean, 1-page ATS-compliant resume that passes parsing algorithms with high match scores',
    'Write high-impact resume bullet points using the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]"',
    'Structure GitHub repositories with professional READMEs, architecture diagrams, and live demo links',
    'Deploy web applications to production cloud platforms (Vercel, Render, AWS, Railway) with automated CI/CD',
    'Execute the 10-step project lifecycle: Idea -> Requirements -> Design -> Code -> Git -> Deploy -> Document -> Resume',
  ],
  subjects: [
    {
      id: 'rp-s1-resume-engineering',
      title: 'ATS Resume Engineering & Skill Framing',
      description: 'ATS parser mechanics, single-page resume layout, action verbs, XYZ bullet point formula, and LinkedIn optimization.',
      order: 1,
      topics: [
        {
          id: 'rp-t1-ats-resume-structure',
          title: 'ATS-Friendly Formatting & Structure',
          description: 'Single column layouts, readable typography, avoiding tables/graphics in ATS, and standard section headers.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['resume', 'ats', 'formatting'],
          learningItems: [
            { id: 'rp-li-1', title: 'How Applicant Tracking Systems (ATS) parse resumes (plain text extraction, section tokens, keyword density)', type: 'concept' },
            { id: 'rp-li-2', title: 'Standard 1-Page Layout: Header -> Education -> Technical Skills -> Projects -> Experience / Internships -> Achievements', type: 'concept' },
            { id: 'rp-li-3', title: 'Technical Skills categorization: Languages, Frameworks/Libraries, Developer Tools, Databases, Cloud/DevOps', type: 'implementation' },
            { id: 'rp-li-4', title: 'Common ATS Red Flags to Avoid: multi-column tables, text boxes, images, non-standard section titles, headers/footers', type: 'concept' },
          ],
          practice: [
            { id: 'rp-pr-1', title: 'Build ATS Resume in Markdown / LaTeX / Google Docs', description: 'Create an ATS-compliant 1-page software engineering resume with zero formatting warnings.', difficulty: 'easy', type: 'reading' },
          ],
          assessments: [
            { id: 'rp-as-1', question: 'Why do multi-column resume tables and graphical skill bars fail during automated ATS parsing?', difficulty: 'easy', type: 'interview' },
          ],
        },
        {
          id: 'rp-t2-xyz-bullet-points',
          title: 'Writing High-Impact Bullet Points (Google XYZ Formula)',
          description: 'The "Accomplished [X] measured by [Y] by doing [Z]" formula, action verbs, and quantifying outcomes.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['bullet-points', 'xyz-formula', 'impact'],
          learningItems: [
            { id: 'rp-li-5', title: 'The Google XYZ Formula: Action Verb + Technical Action [Z] + Business Context [X] + Quantifiable Metric [Y]', type: 'concept' },
            { id: 'rp-li-6', title: 'Weak vs Strong bullet points (e.g. "Made a chat app in React" vs "Engineered real-time chat application using React, WebSockets, and Redis, achieving <50ms message latency for 500 concurrent users")', type: 'concept' },
            { id: 'rp-li-7', title: 'Quantifying achievements without real production metrics (benchmark queries per second, latency reductions, test coverage %)', type: 'implementation' },
          ],
          practice: [
            { id: 'rp-pr-2', title: 'Transform 6 Weak Bullets into XYZ Bullets', description: 'Rewrite 6 vague project descriptions into high-impact, metrics-driven bullet points.', difficulty: 'easy', type: 'reading' },
          ],
          assessments: [
            { id: 'rp-as-2', question: 'How do you quantify impact in a personal academic project where you do not have live commercial user metrics?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'rp-s2-project-portfolio-lifecycle',
      title: 'Project Lifecycle, GitHub & Live Deployment',
      description: 'End-to-end project lifecycle (Idea to Resume), GitHub README documentation, and Cloud deployment.',
      order: 2,
      topics: [
        {
          id: 'rp-t3-project-lifecycle-readme',
          title: 'The 10-Step Project Lifecycle & Professional READMEs',
          description: 'Idea -> Specs -> Architecture -> Git Commits -> Deployment -> Documentation -> Resume entry.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['project-lifecycle', 'readme', 'github', 'architecture'],
          learningItems: [
            { id: 'rp-li-8', title: 'The 10-Step Engineering Project Lifecycle: Problem -> Spec -> High-Level Design -> API Contract -> Git Workflow -> Unit Test Smoke -> Deployment -> Documentation -> Resume Bullet -> Interview Defense', type: 'concept' },
            { id: 'rp-li-9', title: 'Writing an exceptional GitHub README: Banner, Features, Architecture Diagram (Mermaid/ASCII), Tech Stack Badges, Quickstart Steps, API Specs', type: 'implementation' },
            { id: 'rp-li-10', title: 'Clean Git commit hygiene for public repositories (conventional commits: feat:, fix:, docs:, refactor:)', type: 'implementation' },
          ],
          practice: [
            { id: 'rp-pr-3', title: 'Craft a Production README with Architecture Diagram', description: 'Create an open-source grade README.md with setup instructions, architecture diagram, and feature gifs.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'rp-as-3', question: 'What are the essential sections every recruiter and hiring manager looks for when opening your GitHub project repository?', difficulty: 'easy', type: 'interview' },
          ],
        },
        {
          id: 'rp-t4-cloud-deployment',
          title: 'Live Cloud Deployment & Portfolio Showcase',
          description: 'Deploying full stack apps to Vercel/Render/Railway, environment secrets, and custom domains.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['deployment', 'vercel', 'render', 'cloud'],
          learningItems: [
            { id: 'rp-li-11', title: 'Deploying frontend SPAs to Vercel / Netlify with automated GitHub continuous deployment', type: 'implementation' },
            { id: 'rp-li-12', title: 'Deploying backend APIs and databases (PostgreSQL/MongoDB) on Render, Railway, or AWS Free Tier', type: 'implementation' },
            { id: 'rp-li-13', title: 'Securing cloud environment variables and database connection strings in production', type: 'concept' },
            { id: 'rp-li-14', title: 'Linking live production demos and Swagger API docs directly on resume and LinkedIn portfolio', type: 'implementation' },
          ],
          practice: [
            { id: 'rp-pr-4', title: 'Deploy Full Stack App with Live HTTPS URL', description: 'Deploy a frontend + backend app with live SSL URL and connect it to your GitHub portfolio.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'rp-as-4', question: 'Why does having a live working URL on your resume dramatically increase interview conversion rates compared to GitHub repo links alone?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
  ],
};
