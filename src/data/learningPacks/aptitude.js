// src/data/learningPacks/aptitude.js
// Canonical Learning Pack: Quantitative Aptitude (Placement & Competitive Exams)

export const aptitudePack = {
  id: 'pack-quantitative-aptitude',
  slug: 'quantitative-aptitude',
  title: 'Quantitative Aptitude',
  category: 'Placement Preparation',
  difficulty: 'Beginner to Intermediate',
  priority: 'High',
  estimatedHours: 40,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-10',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Complete quantitative aptitude training for campus placement tests (TCS, Infosys, Wipro, Accenture, Cognizant, AMCAT, eLitmus, Cocubes) and product company online assessments.',
  targetUsers: 'College students, job seekers, and placement aspirants preparing for written aptitude assessments.',
  prerequisites: ['Basic high school mathematics'],
  tags: ['aptitude', 'quant', 'math', 'placements', 'amcat', 'tcs-nqt', 'campus-hiring'],
  relatedPacks: ['pack-logical-reasoning', 'pack-verbal-ability', 'pack-placement-fundamentals'],
  relatedTemplates: ['software-developer-placement'],
  careerRelevance: 'The first-round elimination assessment for over 90% of campus and off-campus recruitment drives.',
  learningOutcomes: [
    'Solve high-frequency quantitative problems with mental arithmetic shortcuts and standard formulas',
    'Master Time & Work, Speed Distance Time, Percentages, Profit/Loss, and Ratio systems under timed constraints',
    'Calculate Permutations, Combinations, and Probability distributions accurately in < 60 seconds per question',
    'Interpret complex Data Interpretation charts (Bar, Pie, Line, Table matrices) swiftly',
  ],
  subjects: [
    {
      id: 'apt-s1-arithmetic-foundations',
      title: 'Arithmetic Foundations & Percentages',
      description: 'Number Systems, HCF/LCM, Divisibility rules, Percentages, Profit & Loss, Ratio & Proportion, and Averages.',
      order: 1,
      topics: [
        {
          id: 'apt-t1-numbers-hcf-lcm',
          title: 'Number Systems, Divisibility & HCF/LCM',
          description: 'Unit digits, remainders, prime factorizations, HCF, LCM, and recurring decimals.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['numbers', 'hcf', 'lcm', 'remainders'],
          learningItems: [
            { id: 'apt-li-1', title: 'Number classifications, prime numbers, and divisibility rules (2, 3, 4, 5, 7, 8, 9, 11, 13)', type: 'concept' },
            { id: 'apt-li-2', title: 'HCF and LCM properties: Product of two numbers = HCF × LCM', type: 'concept' },
            { id: 'apt-li-3', title: 'Finding Unit Digits using cyclicity of powers (2, 3, 7, 8 have cyclicity 4)', type: 'implementation' },
            { id: 'apt-li-4', title: 'Remainder Theorem: Fermat\'s Little Theorem and Euler\'s Totient function basics', type: 'concept' },
          ],
          practice: [
            { id: 'apt-pr-1', title: '15-Question Timed Drill: Numbers & LCM/HCF', description: 'Solve 15 competitive questions within 20 minutes with zero calculator usage.', difficulty: 'easy', type: 'quiz' },
          ],
          assessments: [
            { id: 'apt-as-1', question: 'What is the remainder when 7^95 is divided by 8?', difficulty: 'easy', type: 'quiz' },
          ],
        },
        {
          id: 'apt-t2-percentages-profit-loss',
          title: 'Percentages, Profit, Loss & Discount',
          description: 'Fraction-to-percentage conversions, successive percentage change, Cost Price, Selling Price, and Marked Price.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['percentages', 'profit-loss', 'discount'],
          learningItems: [
            { id: 'apt-li-5', title: 'Fraction to percentage memory table (1/2 to 1/20)', type: 'concept' },
            { id: 'apt-li-6', title: 'Successive Percentage Formula: a + b + (ab/100)', type: 'concept' },
            { id: 'apt-li-7', title: 'Profit % and Loss % calculated strictly on Cost Price (CP)', type: 'concept' },
            { id: 'apt-li-8', title: 'Marked Price (MP), successive discounts, and dishonest dealer problems (false weights)', type: 'implementation' },
          ],
          practice: [
            { id: 'apt-pr-2', title: 'Profit & Loss Speed Drill', description: 'Solve 20 profit, loss, and discount questions with step-by-step ratio shortcuts.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'apt-as-2', question: 'If the price of sugar increases by 25%, by what percentage must consumption be reduced to keep expenditure constant?', difficulty: 'easy', type: 'quiz' },
          ],
        },
        {
          id: 'apt-t3-ratios-averages',
          title: 'Ratio, Proportion, Mixtures & Averages',
          description: 'Compounded ratios, cross-multiplication, Weighted Averages, and Alligation Rule.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['ratio', 'averages', 'alligations'],
          learningItems: [
            { id: 'apt-li-9', title: 'Ratio division, combined ratios (A:B and B:C -> A:B:C), and direct/inverse proportion', type: 'concept' },
            { id: 'apt-li-10', title: 'Averages and change in average when new members join or leave', type: 'concept' },
            { id: 'apt-li-11', title: 'Alligation & Mixtures Rule for fast weighted average mixing ratios', type: 'implementation' },
          ],
          practice: [
            { id: 'apt-pr-3', title: 'Mixtures & Alligations Challenge', description: 'Solve 10 multi-component liquid replacement and alloy mixing problems.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'apt-as-3', question: 'In what ratio must tea worth $60/kg be mixed with tea worth $65/kg so that the mixture is worth $62.50/kg?', difficulty: 'easy', type: 'quiz' },
          ],
        },
      ],
    },
    {
      id: 'apt-s2-time-speed-work',
      title: 'Time, Work, Speed & Distance',
      description: 'Unitary method for work, Pipes & Cisterns, Relative Speed, Trains, and Boats & Streams.',
      order: 2,
      topics: [
        {
          id: 'apt-t4-time-and-work',
          title: 'Time & Work, Pipes & Cisterns',
          description: 'Efficiency ratios, LCM method for total work, alternate day work, and negative work (inlet/outlet pipes).',
          priority: 'core',
          estimatedHours: 4,
          tags: ['time-work', 'pipes-cisterns', 'efficiency'],
          learningItems: [
            { id: 'apt-li-12', title: 'The LCM Method for Total Units of Work and individual daily efficiencies', type: 'concept' },
            { id: 'apt-li-13', title: 'Men, Days, Hours formula: (M₁ × D₁ × H₁)/W₁ = (M₂ × D₂ × H₂)/W₂', type: 'concept' },
            { id: 'apt-li-14', title: 'Pipes & Cisterns: positive inlet filling rate vs negative leak/drain emptying rate', type: 'implementation' },
            { id: 'apt-li-15', title: 'Work done on alternate days and leaving/joining workers midway', type: 'implementation' },
          ],
          practice: [
            { id: 'apt-pr-4', title: 'Time & Work Placement Mastery Drill', description: '20 high-frequency placement questions on work efficiencies and tank leakages.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'apt-as-4', question: 'A can do a work in 10 days, B in 15 days. If they work together for 2 days and then A leaves, how many days will B take to finish the rest?', difficulty: 'easy', type: 'quiz' },
          ],
        },
        {
          id: 'apt-t5-speed-distance-trains-boats',
          title: 'Time, Speed, Distance, Trains & Boats',
          description: 'km/h to m/s conversions, Average Speed formula, Relative Speed, Train crossing lengths, and Upstream/Downstream.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['speed-distance', 'trains', 'boats-streams'],
          learningItems: [
            { id: 'apt-li-16', title: 'Speed = Distance / Time and unit conversion factor (1 km/h = 5/18 m/s)', type: 'concept' },
            { id: 'apt-li-17', title: 'Average Speed for equal distances: (2 × s₁ × s₂) / (s₁ + s₂)', type: 'concept' },
            { id: 'apt-li-18', title: 'Relative Speed: same direction (s₁ - s₂) vs opposite direction (s₁ + s₂)', type: 'concept' },
            { id: 'apt-li-19', title: 'Trains crossing poles (length of train) vs crossing platforms (length of train + length of platform)', type: 'implementation' },
            { id: 'apt-li-20', title: 'Boats & Streams: Downstream speed (u + v), Upstream speed (u - v), Still water speed = (D + U)/2', type: 'concept' },
          ],
          practice: [
            { id: 'apt-pr-5', title: 'Speed & Trains Rapid Test', description: 'Timed 15-question challenge on train crossings and boat stream currents.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'apt-as-5', question: 'A train 150m long passes a 300m platform in 15 seconds. What is the speed of the train in km/h?', difficulty: 'easy', type: 'quiz' },
          ],
        },
      ],
    },
    {
      id: 'apt-s3-commercial-math-prob',
      title: 'Commercial Math, Permutations & Probability',
      description: 'Simple & Compound Interest, Permutation & Combination formulas, Probability rules, and Data Interpretation.',
      order: 3,
      topics: [
        {
          id: 'apt-t6-simple-compound-interest',
          title: 'Simple Interest & Compound Interest',
          description: 'SI = (P×R×T)/100, CI compounding periods (yearly, half-yearly, quarterly), and CI-SI difference formula.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['simple-interest', 'compound-interest', 'finance'],
          learningItems: [
            { id: 'apt-li-21', title: 'Simple Interest formula and rate per annum calculations', type: 'concept' },
            { id: 'apt-li-22', title: 'Compound Interest formula: A = P(1 + R/100)ⁿ and fractional years', type: 'concept' },
            { id: 'apt-li-23', title: 'Difference between CI and SI for 2 years: D = P(R/100)² and for 3 years: D = P(R/100)² × (3 + R/100)', type: 'concept' },
          ],
          practice: [
            { id: 'apt-pr-6', title: 'Interest Calculation Drill', description: 'Solve 15 problems on doubling periods and compound growth.', difficulty: 'easy', type: 'quiz' },
          ],
          assessments: [
            { id: 'apt-as-6', question: 'If a sum doubles in 5 years at Simple Interest, in how many years will it triple?', difficulty: 'easy', type: 'quiz' },
          ],
        },
        {
          id: 'apt-t7-pnc-probability',
          title: 'Permutations, Combinations & Probability',
          description: 'Fundamental counting principle, nPr, nCr, arrangements with identical items, dice, cards, and balls.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['permutations', 'combinations', 'probability'],
          learningItems: [
            { id: 'apt-li-24', title: 'Fundamental Principle of Multiplication vs Addition in counting', type: 'concept' },
            { id: 'apt-li-25', title: 'Permutations (nPr = n! / (n-r)!) for ordered arrangements and circular permutations (n-1)!', type: 'concept' },
            { id: 'apt-li-26', title: 'Combinations (nCr = n! / (r!(n-r)!)) for unordered selections and committee problems', type: 'concept' },
            { id: 'apt-li-27', title: 'Probability definition: P(E) = Favorable Outcomes / Total Sample Space', type: 'concept' },
            { id: 'apt-li-28', title: 'Card deck composition (52 cards, 4 suits, 12 face cards), coin tosses, and dice rolls', type: 'implementation' },
          ],
          practice: [
            { id: 'apt-pr-7', title: 'Probability & Arrangements Timed Test', description: '20 high-frequency placement questions on cards, colored balls, and letter arrangements.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'apt-as-7', question: 'In how many different ways can the letters of the word "LEADING" be arranged such that vowels always come together?', difficulty: 'medium', type: 'quiz' },
          ],
        },
        {
          id: 'apt-t8-data-interpretation',
          title: 'Data Interpretation (DI)',
          description: 'Tables, Bar Charts, Pie Charts, Line Graphs, and multi-set data analysis.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['data-interpretation', 'pie-charts', 'bar-graphs'],
          learningItems: [
            { id: 'apt-li-29', title: 'Reading Table matrices and calculating percentage shares and growth rates', type: 'concept' },
            { id: 'apt-li-30', title: 'Pie charts: Degree to percentage conversions (360° = 100%, 1° = 5/18%)', type: 'concept' },
            { id: 'apt-li-31', title: 'Bar Charts and Line Graphs for trend forecasting and comparative ratios', type: 'implementation' },
          ],
          practice: [
            { id: 'apt-pr-8', title: 'Data Interpretation Case Sets', description: 'Solve 4 complete corporate DI case sets with 20 analytical questions.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'apt-as-8', question: 'How do you convert a 54° segment of a pie chart into a percentage value?', difficulty: 'easy', type: 'quiz' },
          ],
        },
      ],
    },
  ],
};
