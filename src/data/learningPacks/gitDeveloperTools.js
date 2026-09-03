// src/data/learningPacks/gitDeveloperTools.js
// Canonical Learning Pack: Git & Developer Tools

export const gitDeveloperToolsPack = {
  id: 'pack-git-tools',
  slug: 'git-developer-tools',
  title: 'Git & Developer Tools',
  category: 'Technical Skills',
  difficulty: 'Beginner to Intermediate',
  priority: 'High',
  estimatedHours: 25,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-10',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Complete version control with Git & GitHub (branching, merge conflicts, interactive rebasing, PR workflows) and modern developer tooling (VS Code, terminal mastery, environment variables, DevTools, debugging).',
  targetUsers: 'All developers, engineers, students, and automation specialists.',
  prerequisites: ['Basic command line familiarity'],
  tags: ['git', 'github', 'version-control', 'vscode', 'terminal', 'debugging', 'devtools', 'placements'],
  relatedPacks: ['pack-programming-fundamentals', 'pack-web-fundamentals', 'pack-resume-projects'],
  relatedTemplates: ['full-stack-developer', 'ai-ml-engineer', 'backend-developer', 'python-automation-developer'],
  careerRelevance: 'Mandatory daily workflow in 100% of software engineering teams and open-source projects.',
  learningOutcomes: [
    'Execute core Git commands: init, clone, add, commit, status, log, diff, and stash',
    'Master branching strategies: Feature branching, Trunk-Based Development, and GitFlow',
    'Resolve complex 3-way merge conflicts and perform interactive rebasing with confidence',
    'Collaborate on GitHub with Pull Requests, code review feedback, tags, and semantic versioning',
    'Leverage VS Code extensions, terminal command pipelines, environment variables, and browser DevTools',
  ],
  subjects: [
    {
      id: 'git-s1-core-version-control',
      title: 'Git Version Control & Branching',
      description: 'The 3 Git trees, staging, commits, branch management, merge strategies, and rebasing.',
      order: 1,
      topics: [
        {
          id: 'git-t1-fundamentals',
          title: 'Git Architecture, Staging & Basic Commands',
          description: 'Working Directory, Staging Area (Index), Git Repository, commits, and diff inspection.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['git', 'commits', 'staging', 'diff'],
          learningItems: [
            { id: 'git-li-1', title: 'The 3 Tree Architecture: Working Directory -> Staging Area (Index) -> Git Repository (.git folder)', type: 'concept' },
            { id: 'git-li-2', title: 'Core commands: git init, git clone, git status, git add, git commit -m, git log --oneline --graph', type: 'implementation' },
            { id: 'git-li-3', title: 'Inspecting differences with git diff (unstaged), git diff --staged, and git show <commit-hash>', type: 'implementation' },
            { id: 'git-li-4', title: 'Configuring .gitignore files, ignoring build artifacts, and untracking cached files (git rm --cached)', type: 'concept' },
          ],
          practice: [
            { id: 'git-pr-1', title: 'Git Local Workflow Hands-on Simulation', description: 'Initialize a repo, make atomic commits, and inspect change diffs across staging areas.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'git-as-1', question: 'What is the purpose of the Git Staging Area (Index) and why not commit directly from the working directory?', difficulty: 'easy', type: 'interview' },
          ],
        },
        {
          id: 'git-t2-branching-merging-rebasing',
          title: 'Branching, Merge Conflicts, Rebase & Stashing',
          description: 'Branch creation, fast-forward vs 3-way merge, conflict resolution, git rebase, and git stash.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['branching', 'merging', 'rebase', 'conflicts', 'stash'],
          learningItems: [
            { id: 'git-li-5', title: 'Branching mechanics: git branch, git switch / checkout -b, and HEAD pointer movements', type: 'concept' },
            { id: 'git-li-6', title: 'Fast-Forward Merge vs Non-Fast-Forward 3-Way Merge (git merge --no-ff)', type: 'concept' },
            { id: 'git-li-7', title: 'Resolving Merge Conflicts: reading conflict markers (<<<<<<< HEAD, =======, >>>>>>> branch)', type: 'implementation' },
            { id: 'git-li-8', title: 'Linear history with Git Rebase (git rebase main) vs Git Merge', type: 'concept' },
            { id: 'git-li-9', title: 'Temporarily stashing uncommitted changes with git stash, git stash pop, git stash apply', type: 'implementation' },
            { id: 'git-li-10', title: 'Undoing changes safely: git restore, git revert (creates compensating commit) vs git reset (--soft, --mixed, --hard)', type: 'concept' },
          ],
          practice: [
            { id: 'git-pr-2', title: 'Simulate and Resolve 3-Way Merge Conflict', description: 'Create two conflicting branches modifying the same file lines and resolve the merge conflict cleanly.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'git-as-2', question: 'Explain the difference between `git merge` and `git rebase`. When should you never rebase a shared branch?', difficulty: 'medium', type: 'interview' },
            { id: 'git-as-3', question: 'What is the difference between `git reset --soft`, `git reset --mixed`, and `git reset --hard`?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'git-s2-github-collaboration',
      title: 'GitHub Collaboration & Pull Requests',
      description: 'Remotes, GitHub workflows, Pull Requests, Code Reviews, Releases, and Semantic Versioning.',
      order: 2,
      topics: [
        {
          id: 'git-t3-remotes-pr-workflow',
          title: 'Remotes, Forking, Pull Requests & Code Review',
          description: 'git remote, push/pull, upstream tracking, PR templates, code review comments, and GitHub Actions CI triggers.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['github', 'pull-requests', 'code-review', 'collaboration'],
          learningItems: [
            { id: 'git-li-11', title: 'Managing remotes: git remote add origin, git fetch, git pull origin main, git push -u origin feature-branch', type: 'implementation' },
            { id: 'git-li-12', title: 'GitHub PR lifecycle: Creating descriptive PRs, linking issues (#123), and requesting reviewers', type: 'implementation' },
            { id: 'git-li-13', title: 'Reviewing code: inline comments, approving vs requesting changes, and squashing commits on merge', type: 'concept' },
            { id: 'git-li-14', title: 'Git Tags, Releases, and Semantic Versioning (SemVer: MAJOR.MINOR.PATCH)', type: 'concept' },
          ],
          practice: [
            { id: 'git-pr-3', title: 'Create Open-Source Style Pull Request', description: 'Fork a repository, create a clean feature branch, push commits, and open a structured PR with description.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'git-as-4', question: 'What is the difference between `git fetch` followed by `git merge` versus `git pull`?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'git-s3-dev-tools-environment',
      title: 'Developer Tooling & Terminal Mastery',
      description: 'VS Code productivity, Terminal CLI pipelines, Environment variables, PATH, and Browser DevTools.',
      order: 3,
      topics: [
        {
          id: 'git-t4-terminal-vscode-devtools',
          title: 'Terminal Mastery, Environment Variables & DevTools',
          description: 'Unix pipes, grep/awk, export PATH, .env files, VS Code shortcuts, and Chrome DevTools debugging.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['terminal', 'cli', 'environment-variables', 'devtools', 'vscode'],
          learningItems: [
            { id: 'git-li-15', title: 'Terminal fluency: navigation, pipes (|), output redirection (>, >>), and search (grep, find)', type: 'implementation' },
            { id: 'git-li-16', title: 'Environment variables: export VAR=value, reading $PATH, and using .env files for secrets management', type: 'concept' },
            { id: 'git-li-17', title: 'VS Code essential extensions (ESLint, Prettier, GitLens, Python/Debugger), keybindings, and multi-cursor editing', type: 'implementation' },
            { id: 'git-li-18', title: 'Browser DevTools: Elements inspector, Console, Network tab (HAR logs, waterfalls), Application tab (cookies/storage), and Sources tab (conditional breakpoints)', type: 'implementation' },
          ],
          practice: [
            { id: 'git-pr-4', title: 'Debug Network & Storage in Chrome DevTools', description: 'Inspect XHR/Fetch payloads, analyze latency waterfalls, and debug a frontend breakpoint.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'git-as-5', question: 'How does the operating system use the $PATH environment variable when you execute a command in the terminal?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
  ],
};
