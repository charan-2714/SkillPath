// src/data/roadmap/levels/L2_git_linux.js
export const gitLinuxLevel = {
  id: 'L2',
  title: 'Git & Linux',
  shortTitle: 'Git & Linux',
  description: 'Version control and command line essentials.',
  domain: 'Foundation',
  color: 'violet',
  colorClass: 'bg-violet-500',
  textClass: 'text-violet-700',
  bgClass: 'bg-violet-50',
  borderClass: 'border-violet-200',
  subjects: [
    {
      id: 'git-advanced',
      title: 'Advanced Git',
      description: 'Branching strategies, hooks, and professional workflows',
      topics: [
        {
          id: 'git-branching-strategies',
          title: 'Branching Strategies',
          description: 'Git flow, trunk-based development, and team workflows',
          priority: 'core',
          tags: ['git', 'workflow'],
          estimatedHours: 4,
          whatToLearn: [
            { id: 'c1', title: 'Git flow: main, develop, feature, release, hotfix' },
            { id: 'c2', title: 'Trunk-based development' },
            { id: 'c3', title: 'Conventional commits' },
            { id: 'c4', title: 'Semantic versioning' },
            { id: 'c5', title: 'Git hooks' },
          ],
          practice: [
            { id: 'p1', title: 'Git flow simulation', description: 'Simulate a full git flow release cycle', difficulty: 'medium' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'Explain git flow and when you would use it.', difficulty: 'medium' },
          ],
          resources: [],
        },
        {
          id: 'git-internals',
          title: 'Git Internals',
          description: 'How git works under the hood',
          priority: 'important',
          tags: ['git', 'internals'],
          estimatedHours: 3,
          whatToLearn: [
            { id: 'c1', title: 'Objects: blobs, trees, commits' },
            { id: 'c2', title: 'References and HEAD' },
            { id: 'c3', title: 'Pack files' },
            { id: 'c4', title: 'Reflog' },
          ],
          practice: [],
          interviewQuestions: [
            { id: 'iq1', question: 'What happens internally when you run git commit?', difficulty: 'hard' },
          ],
          resources: [],
        },
      ],
    },
    {
      id: 'linux-cli',
      title: 'Linux & CLI',
      description: 'Linux system administration and shell scripting',
      topics: [
        {
          id: 'linux-file-system',
          title: 'Linux File System',
          description: 'Linux filesystem structure, permissions, and operations',
          priority: 'core',
          tags: ['linux', 'filesystem'],
          estimatedHours: 5,
          whatToLearn: [
            { id: 'c1', title: 'FHS (Filesystem Hierarchy Standard)' },
            { id: 'c2', title: 'File permissions (chmod, chown)' },
            { id: 'c3', title: 'Symbolic and hard links' },
            { id: 'c4', title: 'find, locate commands' },
            { id: 'c5', title: 'Disk usage (df, du)' },
          ],
          practice: [
            { id: 'p1', title: 'Permission setup', description: 'Set appropriate permissions for a project structure', difficulty: 'easy' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'Explain Linux file permissions.', difficulty: 'easy' },
          ],
          resources: [],
        },
        {
          id: 'shell-scripting',
          title: 'Shell Scripting',
          description: 'Bash scripting for automation',
          priority: 'important',
          tags: ['bash', 'shell', 'automation'],
          estimatedHours: 8,
          whatToLearn: [
            { id: 'c1', title: 'Variables and environment' },
            { id: 'c2', title: 'Control flow (if, for, while)' },
            { id: 'c3', title: 'Functions in bash' },
            { id: 'c4', title: 'Error handling with set -e' },
            { id: 'c5', title: 'Pipes and process substitution' },
            { id: 'c6', title: 'Cron jobs' },
          ],
          practice: [
            { id: 'p1', title: 'Backup script', description: 'Write a bash script to backup files with timestamps', difficulty: 'medium' },
          ],
          interviewQuestions: [],
          resources: [],
        },
      ],
    },
  ],
};
