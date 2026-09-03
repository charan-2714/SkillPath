// src/data/learningPacks/sqlDatabases.js
// Canonical Learning Pack: SQL & Databases

export const sqlDatabasesPack = {
  id: 'pack-sql-databases',
  slug: 'sql-databases',
  title: 'SQL & Databases',
  category: 'Technical Skills',
  difficulty: 'Beginner to Intermediate',
  priority: 'High',
  estimatedHours: 40,
  version: '1.5',
  status: 'Production Standard',
  createdAt: '2025-01-12',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-27',
  description: 'Complete relational database querying, complex multi-table joins, subqueries, Common Table Expressions (CTEs), advanced window functions, indexing, and query performance optimization.',
  targetUsers: 'Students, software developers, data analysts, data engineers, and backend developers.',
  prerequisites: ['Basic understanding of tables and spreadsheets'],
  tags: ['sql', 'database', 'postgres', 'mysql', 'window-functions', 'cte', 'joins', 'indexing', 'placements'],
  relatedPacks: ['pack-cs-fundamentals', 'pack-programming-fundamentals', 'pack-interview-prep'],
  relatedTemplates: ['backend-developer', 'data-engineer', 'data-analyst', 'full-stack-developer'],
  careerRelevance: 'Tested in almost 100% of data, backend, full stack, and campus placement technical rounds.',
  learningOutcomes: [
    'Write complex multi-table SQL queries using INNER, LEFT, RIGHT, FULL, and CROSS joins',
    'Structure clean, maintainable analytical queries using CTEs (WITH clause) and recursive queries',
    'Master advanced analytical Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG(), NTILE()',
    'Understand NULL semantics, three-valued logic, and conditional CASE WHEN expressions',
    'Analyze EXPLAIN query plans to identify table scans, index lookups, and optimize slow queries',
  ],
  subjects: [
    {
      id: 'sql-s1-query-basics',
      title: 'SQL Querying Basics & Filtering',
      description: 'SELECT syntax, WHERE filtering, logical conditions, NULL handling, ORDER BY, and text search.',
      order: 1,
      topics: [
        {
          id: 'sql-t1-select-filtering',
          title: 'SELECT, WHERE, NULLs & Logical Operators',
          description: 'Selecting columns, filtering rows, handling NULL with IS NULL/COALESCE, and Boolean evaluation.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['sql', 'select', 'where', 'null'],
          learningItems: [
            { id: 'sql-li-1', title: 'SQL query processing order vs syntactic order (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT)', type: 'concept' },
            { id: 'sql-li-2', title: 'Filtering with WHERE operators (=, !=, <>, <, >, BETWEEN, IN, LIKE, ILIKE)', type: 'implementation' },
            { id: 'sql-li-3', title: 'Three-Valued Logic (TRUE, FALSE, UNKNOWN) and NULL handling (IS NULL, IS NOT NULL, COALESCE, NULLIF)', type: 'concept' },
            { id: 'sql-li-4', title: 'DISTINCT deduplication and sorting with ORDER BY (ASC, DESC, NULLS FIRST/LAST)', type: 'implementation' },
            { id: 'sql-li-5', title: 'Pagination with LIMIT, OFFSET, and Keyset/Cursor-based pagination', type: 'implementation' },
          ],
          practice: [
            { id: 'sql-pr-1', title: 'Customer Search & Filtering Query', description: 'Write query to filter customers registered in the last 30 days with non-null phone numbers, sorted by signup date.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'sql-as-1', question: 'Why does `SELECT * FROM table WHERE column = NULL` return 0 rows even when NULL values exist?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'sql-s2-aggregations-grouping',
      title: 'Aggregations & Grouping',
      description: 'GROUP BY, aggregate functions (COUNT, SUM, AVG, MIN, MAX), and HAVING filtering.',
      order: 2,
      topics: [
        {
          id: 'sql-t2-group-by-having',
          title: 'GROUP BY, HAVING & Aggregate Functions',
          description: 'Summarizing data, COUNT(*) vs COUNT(col), GROUP BY multiple columns, and HAVING vs WHERE.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['group-by', 'having', 'aggregates'],
          learningItems: [
            { id: 'sql-li-6', title: 'Aggregate functions: COUNT(*), COUNT(col), COUNT(DISTINCT col), SUM, AVG, MIN, MAX', type: 'concept' },
            { id: 'sql-li-7', title: 'GROUP BY single and multiple columns to create aggregate buckets', type: 'implementation' },
            { id: 'sql-li-8', title: 'HAVING clause for filtering aggregated results after grouping (WHERE vs HAVING)', type: 'concept' },
            { id: 'sql-li-9', title: 'Conditional aggregation using CASE WHEN inside SUM/COUNT', type: 'implementation' },
          ],
          practice: [
            { id: 'sql-pr-2', title: 'Department Salary & Bonus Aggregates', description: 'Find all departments with more than 5 employees where average salary exceeds $80,000.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'sql-as-2', question: 'Explain the difference between WHERE and HAVING clauses. Can you use aggregate functions in a WHERE clause?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'sql-s3-joins-multi-table',
      title: 'Multi-Table Joins & Set Operations',
      description: 'INNER JOIN, LEFT/RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN, Self Joins, and UNION/INTERSECT.',
      order: 3,
      topics: [
        {
          id: 'sql-t3-joins',
          title: 'All Types of SQL Joins & Self Joins',
          description: 'Relational algebra joins, matching keys, handling non-matches with Outer Joins, and hierarchical self joins.',
          priority: 'core',
          estimatedHours: 5,
          tags: ['joins', 'inner-join', 'left-join', 'self-join'],
          learningItems: [
            { id: 'sql-li-10', title: 'INNER JOIN: intersection of matching keys across tables', type: 'concept' },
            { id: 'sql-li-11', title: 'LEFT JOIN and RIGHT JOIN: preserving unmatched rows from left/right tables with NULLs', type: 'concept' },
            { id: 'sql-li-12', title: 'FULL OUTER JOIN and CROSS JOIN (Cartesian product)', type: 'concept' },
            { id: 'sql-li-13', title: 'Self Joins: joining a table to itself for hierarchical data (Employees & Managers)', type: 'implementation' },
            { id: 'sql-li-14', title: 'Set operations: UNION vs UNION ALL (deduplication overhead), INTERSECT, EXCEPT / MINUS', type: 'concept' },
          ],
          practice: [
            { id: 'sql-pr-3', title: 'Employees Earning More Than Their Managers', description: 'Write a self-join query to find all employees whose salary exceeds their direct manager\'s salary.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'sql-as-3', question: 'What is the performance difference between UNION and UNION ALL, and when should you use UNION ALL?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'sql-s4-subqueries-ctes',
      title: 'Subqueries & Common Table Expressions (CTEs)',
      description: 'Scalar subqueries, Correlated subqueries, EXISTS vs IN, and clean modular CTEs (WITH clause).',
      order: 4,
      topics: [
        {
          id: 'sql-t4-subqueries-cte',
          title: 'Subqueries, Correlated Subqueries & CTEs',
          description: 'Nested queries, subqueries in WHERE/FROM/SELECT, correlated evaluation, and WITH CTEs.',
          priority: 'core',
          estimatedHours: 5,
          tags: ['subqueries', 'cte', 'correlated-subquery', 'with-clause'],
          learningItems: [
            { id: 'sql-li-15', title: 'Scalar subqueries vs Column/Row subqueries vs Table subqueries', type: 'concept' },
            { id: 'sql-li-16', title: 'Correlated subqueries: row-by-row outer dependency and execution cost', type: 'concept' },
            { id: 'sql-li-17', title: 'EXISTS vs IN vs NOT EXISTS vs NOT IN with NULL gotchas', type: 'concept' },
            { id: 'sql-li-18', title: 'Common Table Expressions (WITH clause) for readable, modular query construction', type: 'implementation' },
            { id: 'sql-li-19', title: 'Recursive CTEs for traversing trees and organizational hierarchies', type: 'implementation' },
          ],
          practice: [
            { id: 'sql-pr-4', title: 'Nth Highest Salary with Subquery / CTE', description: 'Find the 2nd and Nth highest distinct salaries using both subqueries and CTEs.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'sql-as-4', question: 'Why does `WHERE id NOT IN (SELECT id FROM ...)` fail completely if the subquery returns even a single NULL value?', difficulty: 'hard', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'sql-s5-window-functions',
      title: 'Advanced Analytical Window Functions',
      description: 'OVER(), PARTITION BY, ORDER BY, ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG(), NTILE().',
      order: 5,
      topics: [
        {
          id: 'sql-t5-window-functions-mastery',
          title: 'Ranking, Value & Aggregate Window Functions',
          description: 'Calculations across row sets without collapsing rows, running totals, and moving averages.',
          priority: 'core',
          estimatedHours: 6,
          tags: ['window-functions', 'rank', 'dense-rank', 'lead', 'lag', 'over'],
          learningItems: [
            { id: 'sql-li-20', title: 'The Anatomy of Window Functions: OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)', type: 'concept' },
            { id: 'sql-li-21', title: 'Ranking functions: ROW_NUMBER() vs RANK() (gaps in ranks) vs DENSE_RANK() (no gaps)', type: 'implementation' },
            { id: 'sql-li-22', title: 'Value functions: LEAD() (look ahead), LAG() (look behind), FIRST_VALUE(), LAST_VALUE()', type: 'implementation' },
            { id: 'sql-li-23', title: 'Window Framing: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (running totals)', type: 'concept' },
            { id: 'sql-li-24', title: 'Distribution & Bucketing: NTILE(4) quartiles and CUME_DIST()', type: 'implementation' },
          ],
          practice: [
            { id: 'sql-pr-5', title: 'Top 3 Salaries per Department (LeetCode Hard)', description: 'Use DENSE_RANK() with PARTITION BY to retrieve the top 3 distinct high earners in every department.', difficulty: 'hard', type: 'coding' },
            { id: 'sql-pr-6', title: 'Month-over-Month Revenue Growth with LAG()', description: 'Calculate percentage growth in monthly sales compared to the previous month using LAG().', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'sql-as-5', question: 'Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() when scores are tied: [100, 100, 90, 80].', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'sql-s6-indexes-optimization',
      title: 'Indexes, Transactions & Query Optimization',
      description: 'B-Tree indexes, composite index column order, EXPLAIN execution plans, and query tuning.',
      order: 6,
      topics: [
        {
          id: 'sql-t6-optimization',
          title: 'Database Indexes, EXPLAIN Plans & Tuning',
          description: 'Clustered vs Non-clustered indexes, index selectivity, avoiding table scans, and optimizing slow joins.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['indexing', 'explain', 'optimization', 'performance'],
          learningItems: [
            { id: 'sql-li-25', title: 'How B-Tree indexes work: root, branch, leaf pages and index lookups vs full table scans', type: 'concept' },
            { id: 'sql-li-26', title: 'Clustered vs Non-Clustered / Secondary Indexes', type: 'concept' },
            { id: 'sql-li-27', title: 'Composite Indexes and the Leftmost Prefix Rule', type: 'concept' },
            { id: 'sql-li-28', title: 'SARGable queries: why functions on indexed columns `WHERE YEAR(date) = 2025` break index usage', type: 'concept' },
            { id: 'sql-li-29', title: 'Reading EXPLAIN / EXPLAIN ANALYZE output: Seq Scan, Index Scan, Index Only Scan, Hash Join', type: 'implementation' },
          ],
          practice: [
            { id: 'sql-pr-7', title: 'Optimize a Slow 5-Table E-Commerce Query', description: 'Rewrite an unindexed subquery join into an efficient indexed CTE reducing execution time from 4s to 12ms.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'sql-as-6', question: 'What is a covering index (Index-Only Scan) and why does it avoid accessing table disk pages entirely?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
  ],
};
