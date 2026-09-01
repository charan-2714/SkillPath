// src/data/roadmap/levels/L5_playwright.js
export const playwrightLevel = {
  id: 'L5',
  title: 'Playwright Automation',
  shortTitle: 'Playwright',
  description: 'Modern web automation and testing.',
  domain: 'Foundation',
  color: 'green',
  colorClass: 'bg-green-500',
  textClass: 'text-green-700',
  bgClass: 'bg-green-50',
  borderClass: 'border-green-200',
  subjects: [
    {
      id: 'playwright-core',
      title: 'Playwright Core',
      description: 'Browser automation with Playwright',
      topics: [
        {
          id: 'playwright-basics',
          title: 'Playwright Basics',
          description: 'Setting up and writing tests with Playwright',
          priority: 'core',
          tags: ['playwright', 'testing', 'automation'],
          estimatedHours: 8,
          whatToLearn: [
            { id: 'c1', title: 'Playwright installation and configuration' },
            { id: 'c2', title: 'Page navigation and interaction' },
            { id: 'c3', title: 'Locators: getByRole, getByText, getByLabel' },
            { id: 'c4', title: 'Actions: click, fill, select' },
            { id: 'c5', title: 'Assertions with expect()' },
            { id: 'c6', title: 'Screenshots and video recording' },
            { id: 'c7', title: 'Network interception' },
          ],
          practice: [
            { id: 'p1', title: 'Login flow test', description: 'Write a Playwright test for a login/logout flow', difficulty: 'easy' },
            { id: 'p2', title: 'Form automation', description: 'Automate filling and submitting a complex form', difficulty: 'medium' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'What makes Playwright better than Selenium?', difficulty: 'medium' },
            { id: 'iq2', question: 'What is the difference between auto-waiting and explicit waits?', difficulty: 'medium' },
          ],
          resources: [
            { id: 'r1', title: 'Playwright Docs', url: 'https://playwright.dev/', type: 'Documentation' },
          ],
        },
        {
          id: 'playwright-advanced',
          title: 'Advanced Playwright',
          description: 'Page Object Model, fixtures, and CI integration',
          priority: 'important',
          tags: ['playwright', 'pom', 'ci'],
          estimatedHours: 10,
          whatToLearn: [
            { id: 'c1', title: 'Page Object Model pattern' },
            { id: 'c2', title: 'Test fixtures and setup/teardown' },
            { id: 'c3', title: 'Parallel test execution' },
            { id: 'c4', title: 'CI/CD integration' },
            { id: 'c5', title: 'API testing with Playwright' },
            { id: 'c6', title: 'Storage state for authentication' },
          ],
          practice: [
            { id: 'p1', title: 'POM framework', description: 'Build a complete POM-based test framework', difficulty: 'hard' },
          ],
          interviewQuestions: [],
          resources: [],
        },
      ],
    },
  ],
};
