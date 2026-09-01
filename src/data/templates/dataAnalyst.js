// src/data/templates/dataAnalyst.js
export const dataAnalystTemplate = {
  id: 'template-data-analyst',
  name: 'Data Analyst Roadmap',
  description: 'Master data analysis tools: Excel, SQL, Python (Pandas/NumPy), Tableau, PowerBI, and applied statistical modeling.',
  goal: 'Data Analyst Career Transition',
  category: 'Technology',
  difficulty: 'Beginner to Intermediate',
  trackingModel: 'skill-development',
  skillDimensions: [
    { id: 'understanding', name: 'Understanding', maxScore: 5 },
    { id: 'implementation', name: 'Implementation', maxScore: 5 },
    { id: 'debugging', name: 'Debugging', maxScore: 5 },
    { id: 'practice', name: 'Practice', maxScore: 5 },
    { id: 'interview', name: 'Interview Readiness', maxScore: 5 },
  ],
  enableAIDependency: true,
  levels: [
    {
      id: 'L0',
      title: 'Spreadsheets & Business Foundations',
      description: 'Advanced Excel formulas, pivot tables, VLOOKUP/XLOOKUP, and data validation.',
      order: 0,
      color: 'green',
      subjects: [
        {
          id: 'DA-L0-S1',
          title: 'Advanced Excel',
          order: 1,
          topics: [
            { id: 'DA-T1', title: 'Pivot Tables & Dynamic Dashboards', description: 'Creating interactive KPI summary dashboards with slicers.', priority: 'core', tags: ['excel', 'dashboards'] },
          ],
        },
      ],
    },
    {
      id: 'L1',
      title: 'SQL & Relational Databases',
      description: 'Writing complex queries, aggregate functions, subqueries, and window functions.',
      order: 1,
      color: 'blue',
      subjects: [
        {
          id: 'DA-L1-S1',
          title: 'SQL Querying',
          order: 1,
          topics: [
            { id: 'DA-T2', title: 'Window Functions & CTEs', description: 'ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, and Common Table Expressions.', priority: 'core', tags: ['sql', 'analytics'] },
          ],
        },
      ],
    },
    {
      id: 'L2',
      title: 'Python for Data Analysis',
      description: 'NumPy, Pandas, data cleaning, exploratory data analysis (EDA), and Seaborn visualization.',
      order: 2,
      color: 'amber',
      subjects: [
        {
          id: 'DA-L2-S1',
          title: 'Pandas & EDA',
          order: 1,
          topics: [
            { id: 'DA-T3', title: 'Data Cleaning & Transformation', description: 'Handling missing values, outlier detection, data reshaping, and melting.', priority: 'core', tags: ['python', 'pandas'] },
          ],
        },
      ],
    },
    {
      id: 'L3',
      title: 'Data Visualization & BI Tools',
      description: 'Tableau / PowerBI dashboard storytelling, metrics, calculated fields, and reporting.',
      order: 3,
      color: 'purple',
      subjects: [
        {
          id: 'DA-L3-S1',
          title: 'Business Intelligence',
          order: 1,
          topics: [
            { id: 'DA-T4', title: 'Tableau / Power BI Visual Storytelling', description: 'Building executive dashboards with drill-downs and storytelling flows.', priority: 'core', tags: ['bi', 'tableau'] },
          ],
        },
      ],
    },
  ],
  projects: [],
};
