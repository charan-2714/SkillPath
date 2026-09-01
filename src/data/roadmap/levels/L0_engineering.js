// src/data/roadmap/levels/L0_engineering.js

export const engineeringFoundation = {
  id: 'L0',
  title: 'Engineering Foundation',
  shortTitle: 'Engineering',
  description: 'Core engineering skills every developer must have before specializing.',
  domain: 'Foundation',
  color: 'indigo',
  colorClass: 'bg-indigo-500',
  textClass: 'text-indigo-700',
  bgClass: 'bg-indigo-50',
  borderClass: 'border-indigo-200',
  subjects: [
    {
      id: 'eng-fundamentals',
      title: 'Engineering Fundamentals',
      description: 'How computers work, binary, memory, and computational thinking',
      topics: [
        {
          id: 'eng-how-computers-work',
          title: 'How Computers Work',
          description: 'CPU, memory, storage, I/O, and how programs execute',
          priority: 'core',
          tags: ['fundamentals', 'computer science'],
          estimatedHours: 4,
          whatToLearn: [
            { id: 'c1', title: 'CPU and instruction execution cycle' },
            { id: 'c2', title: 'RAM vs persistent storage' },
            { id: 'c3', title: 'Binary, hex, and number systems' },
            { id: 'c4', title: 'Operating system basics' },
            { id: 'c5', title: 'Processes vs threads' },
          ],
          practice: [
            { id: 'p1', title: 'Bitwise operations exercise', description: 'Implement bitwise AND, OR, XOR using Python', difficulty: 'easy' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'Explain the difference between a process and a thread.', difficulty: 'medium' },
            { id: 'iq2', question: 'What happens when you run a program?', difficulty: 'easy' },
          ],
          resources: [
            { id: 'r1', title: 'CS50x Introduction to Computer Science', url: 'https://cs50.harvard.edu/x/', type: 'Course' },
          ],
        },
        {
          id: 'eng-cli-basics',
          title: 'Command Line Interface',
          description: 'Navigating and working efficiently in the terminal',
          priority: 'core',
          tags: ['CLI', 'terminal', 'productivity'],
          estimatedHours: 6,
          whatToLearn: [
            { id: 'c1', title: 'File system navigation (cd, ls, pwd)' },
            { id: 'c2', title: 'File operations (cp, mv, rm, mkdir)' },
            { id: 'c3', title: 'Pipes and redirection' },
            { id: 'c4', title: 'Environment variables' },
            { id: 'c5', title: 'Shell scripting basics' },
            { id: 'c6', title: 'Grep, sed, awk' },
          ],
          practice: [
            { id: 'p1', title: 'File organizer script', description: 'Write a shell script to organize files by extension', difficulty: 'easy' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'What is the difference between > and >> in bash?', difficulty: 'easy' },
          ],
          resources: [],
        },
        {
          id: 'eng-git-basics',
          title: 'Git Version Control',
          description: 'Track changes, collaborate, and manage code history with Git',
          priority: 'core',
          tags: ['git', 'version control', 'collaboration'],
          estimatedHours: 8,
          whatToLearn: [
            { id: 'c1', title: 'Git init, add, commit' },
            { id: 'c2', title: 'Branching and merging' },
            { id: 'c3', title: 'Remote repositories' },
            { id: 'c4', title: 'Pull requests and code review' },
            { id: 'c5', title: 'Resolving merge conflicts' },
            { id: 'c6', title: 'Git rebase vs merge' },
            { id: 'c7', title: '.gitignore' },
          ],
          practice: [
            { id: 'p1', title: 'Git flow simulation', description: 'Create a repo, make feature branches, merge them', difficulty: 'easy' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'What is the difference between git merge and git rebase?', difficulty: 'medium' },
            { id: 'iq2', question: 'How do you undo the last commit?', difficulty: 'easy' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
