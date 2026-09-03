// src/data/learningPacks/logicalReasoning.js
// Canonical Learning Pack: Logical Reasoning (Placements & Online Assessments)

export const logicalReasoningPack = {
  id: 'pack-logical-reasoning',
  slug: 'logical-reasoning',
  title: 'Logical Reasoning',
  category: 'Placement Preparation',
  difficulty: 'Beginner to Intermediate',
  priority: 'High',
  estimatedHours: 35,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-10',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Structured logical deduction, pattern recognition, spatial puzzles, seating arrangements, coding-decoding, blood relations, syllogisms, and critical reasoning.',
  targetUsers: 'Students, placement candidates, and engineers facing reasoning & cognitive evaluation rounds.',
  prerequisites: ['Basic logical thinking'],
  tags: ['logical-reasoning', 'reasoning', 'puzzles', 'syllogisms', 'seating-arrangement', 'placements'],
  relatedPacks: ['pack-quantitative-aptitude', 'pack-verbal-ability', 'pack-placement-fundamentals'],
  relatedTemplates: ['software-developer-placement'],
  careerRelevance: 'Evaluates cognitive problem-solving ability, pattern recognition, and structured analytical thinking.',
  learningOutcomes: [
    'Quickly decode letter/number patterns, shifts, and matrix representations',
    'Map complex multi-generational family trees and resolve Blood Relations questions without confusion',
    'Solve linear, circular, and multi-variable complex Seating Arrangement puzzles methodically',
    'Master Venn diagram techniques to evaluate 2-statement and 3-statement Syllogisms with 100% accuracy',
    'Calculate calendar days and clock angle overlaps accurately using modular arithmetic',
  ],
  subjects: [
    {
      id: 'lr-s1-series-coding-relations',
      title: 'Series, Coding, Relations & Directions',
      description: 'Number/Alphabet series, Coding-Decoding, Blood Relations family trees, and Direction Sense.',
      order: 1,
      topics: [
        {
          id: 'lr-t1-series-coding',
          title: 'Number Series, Alphabet Series & Coding-Decoding',
          description: 'Difference patterns, prime gaps, letter positions (EJOTY), reverse letters (AZBYCX), and substitution ciphers.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['series', 'coding-decoding', 'patterns'],
          learningItems: [
            { id: 'lr-li-1', title: 'Number series patterns: arithmetic differences, geometric ratio, squares/cubes ± constant, alternating double series', type: 'concept' },
            { id: 'lr-li-2', title: 'Alphabet position shortcuts (EJOTY: 5, 10, 15, 20, 25) and reverse opposite pairs (A-Z, B-Y, C-X, D-W, E-V)', type: 'concept' },
            { id: 'lr-li-3', title: 'Coding-Decoding types: Letter shifting, Direct letter coding, Number coding, Matrix coding, and Sentence deciphering', type: 'implementation' },
          ],
          practice: [
            { id: 'lr-pr-1', title: 'Speed Coding & Series Drill', description: 'Solve 20 pattern questions within 15 minutes.', difficulty: 'easy', type: 'quiz' },
          ],
          assessments: [
            { id: 'lr-as-1', question: 'In a code language, if "CLOUD" is coded as "DNPRE", how is "SIGHT" coded in the same language?', difficulty: 'easy', type: 'quiz' },
          ],
        },
        {
          id: 'lr-t2-blood-relations-directions',
          title: 'Blood Relations & Direction Sense',
          description: 'Family tree mapping, coded blood relations, compass directions, shadows, and Pythagorean distances.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['blood-relations', 'direction-sense', 'family-tree'],
          learningItems: [
            { id: 'lr-li-4', title: 'Standard family tree symbols: (+ for male, - for female, = for spouses, | for parent-child generation)', type: 'concept' },
            { id: 'lr-li-5', title: 'Coded Blood Relations (e.g. A + B means A is father of B) and tree decoding from right-to-left', type: 'concept' },
            { id: 'lr-li-6', title: 'The 8 Cardinal and Intercardinal Directions (N, S, E, W, NE, NW, SE, SW)', type: 'concept' },
            { id: 'lr-li-7', title: 'Shortest displacement using Pythagorean Theorem (a² + b² = c²) and sunrise/sunset shadow positions', type: 'implementation' },
          ],
          practice: [
            { id: 'lr-pr-2', title: 'Family Tree & Direction Simulation', description: 'Solve 15 complex genealogical and navigation trajectory puzzles.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'lr-as-2', question: 'Pointing to a photograph, a woman says: "His mother\'s only daughter is my mother." How is the woman related to the man in the photograph?', difficulty: 'easy', type: 'quiz' },
          ],
        },
      ],
    },
    {
      id: 'lr-s2-arrangements-puzzles',
      title: 'Arrangements, Syllogisms & Puzzles',
      description: 'Linear & Circular seating arrangements, Syllogisms via Venn diagrams, Floor/Box puzzles, and Ranking.',
      order: 2,
      topics: [
        {
          id: 'lr-t3-seating-arrangements',
          title: 'Seating Arrangements & Grid Puzzles',
          description: 'Linear rows (facing North/South), Circular tables (facing center/outside), Parallel rows, and multi-attribute mapping.',
          priority: 'core',
          estimatedHours: 5,
          tags: ['seating-arrangement', 'puzzles', 'circular'],
          learningItems: [
            { id: 'lr-li-8', title: 'Linear Seating: Left/Right perspective when facing North vs South', type: 'concept' },
            { id: 'lr-li-9', title: 'Circular Seating: Clockwise/Anti-clockwise relative positions when facing inwards vs outwards', type: 'concept' },
            { id: 'lr-li-10', title: 'Systematic deduction table method: fixing deterministic clues first, eliminating contradictions', type: 'implementation' },
            { id: 'lr-li-11', title: 'Floor, Box, and Day/Month scheduling multi-variable puzzles', type: 'implementation' },
          ],
          practice: [
            { id: 'lr-pr-3', title: '8-Person Circular Table Seating Puzzle', description: 'Solve 8-person circular table with mixed inward/outward facing directions.', difficulty: 'hard', type: 'quiz' },
          ],
          assessments: [
            { id: 'lr-as-3', question: 'In an 8-person circular table where everyone faces the center, who sits 3rd to the left of person A?', difficulty: 'medium', type: 'quiz' },
          ],
        },
        {
          id: 'lr-t4-syllogisms-deductions',
          title: 'Syllogisms & Logical Deductions',
          description: 'Statements, Conclusions, Venn diagram logic, "All/Some/No/Some Not", and "Either Or" conditions.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['syllogisms', 'venn-diagrams', 'logic'],
          learningItems: [
            { id: 'lr-li-12', title: 'The 4 standard propositions: Universal Affirmative (All A are B), Universal Negative (No A is B), Particular Affirmative (Some A are B), Particular Negative (Some A are not B)', type: 'concept' },
            { id: 'lr-li-13', title: 'Minimal Venn Diagram method and testing negative/possibility conclusions', type: 'concept' },
            { id: 'lr-li-14', title: 'Conditions for "Either-Or" complementary pairs (Same subject/predicate, one positive & one negative, neither definitely follows)', type: 'concept' },
            { id: 'lr-li-15', title: '"Only a few" and "Possibility" modern Syllogism phrasing', type: 'implementation' },
          ],
          practice: [
            { id: 'lr-pr-4', title: 'Syllogisms Mastery Test (25 Questions)', description: 'Solve 25 Syllogisms including "Only a few" and "Can never be" scenarios.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'lr-as-4', question: 'Statements: All cats are dogs. Some dogs are birds. Conclusions: I. Some cats are birds. II. No cat is a bird. Which conclusion follows?', difficulty: 'medium', type: 'quiz' },
          ],
        },
      ],
    },
    {
      id: 'lr-s3-clocks-calendars-critical',
      title: 'Clocks, Calendars, Ranking & Critical Reasoning',
      description: 'Clock angle & gain/loss formulas, Leap years & Odd days, Order/Ranking, and Statement-Assumptions/Conclusions.',
      order: 3,
      topics: [
        {
          id: 'lr-t5-clocks-calendars-ranking',
          title: 'Clocks, Calendars, Order & Ranking',
          description: 'Angle between hands θ = |30H - (11/2)M|, Odd days calculation for any calendar date, and Ranking in a row.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['clocks', 'calendars', 'ranking'],
          learningItems: [
            { id: 'lr-li-16', title: 'Clock speeds: Minute hand moves 6°/min, Hour hand moves 0.5°/min. Relative speed = 5.5°/min', type: 'concept' },
            { id: 'lr-li-17', title: 'Clock Angle formula: θ = |30H - 5.5M| and coincidence (0°), opposite (180°), right angle (90°) frequencies', type: 'concept' },
            { id: 'lr-li-18', title: 'Calendar Odd Days: Ordinary year = 1 odd day, Leap year = 2 odd days, 100 years = 5 odd days, 400 years = 0 odd days', type: 'concept' },
            { id: 'lr-li-19', title: 'Order & Ranking: Total people = (Rank from Left + Rank from Right) - 1', type: 'implementation' },
          ],
          practice: [
            { id: 'lr-pr-5', title: 'Clocks & Calendars Rapid Calculation', description: 'Calculate exact day of week for 10 historical dates and find angles at specific timestamps.', difficulty: 'easy', type: 'quiz' },
          ],
          assessments: [
            { id: 'lr-as-5', question: 'What is the angle between the minute and hour hands of a clock at 3:40?', difficulty: 'easy', type: 'quiz' },
          ],
        },
        {
          id: 'lr-t6-critical-reasoning',
          title: 'Statement & Assumptions, Arguments & Conclusions',
          description: 'Implicit assumptions, strong vs weak arguments, course of action, and cause-and-effect relationships.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['critical-reasoning', 'assumptions', 'conclusions'],
          learningItems: [
            { id: 'lr-li-20', title: 'Statement & Assumptions: identifying unstated premises assumed by the speaker without bringing outside knowledge', type: 'concept' },
            { id: 'lr-li-21', title: 'Statement & Conclusions: deriving logically inescapable facts directly from provided statements', type: 'concept' },
            { id: 'lr-li-22', title: 'Strong vs Weak Arguments: logical relevance, factual grounding vs emotional opinions', type: 'concept' },
            { id: 'lr-li-23', title: 'Data Sufficiency: determining if Statement (1) alone, (2) alone, both, or neither is sufficient to answer a question', type: 'implementation' },
          ],
          practice: [
            { id: 'lr-pr-6', title: 'Critical Reasoning & Data Sufficiency Test', description: 'Solve 15 verbal logic and data sufficiency corporate assessment items.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'lr-as-6', question: 'In Data Sufficiency, when are both statements combined rather than evaluated independently?', difficulty: 'easy', type: 'quiz' },
          ],
        },
      ],
    },
  ],
};
