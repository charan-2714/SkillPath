// src/data/learningPacks/programmingFundamentals.js
// Canonical Learning Pack: Programming Fundamentals (Multi-language)

export const programmingFundamentalsPack = {
  id: 'pack-programming-fundamentals',
  slug: 'programming-fundamentals',
  title: 'Programming Fundamentals',
  category: 'Foundations',
  difficulty: 'Beginner',
  priority: 'High',
  estimatedHours: 45,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-15',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-20',
  description: 'Core programming syntax, memory models, control flow, functions, collections, recursion, and debugging required before progressing into DSA, web development, or AI engineering.',
  targetUsers: 'Students, beginners, career switchers, and engineers preparing for coding rounds.',
  prerequisites: ['Basic computer literacy', 'Terminal / Code editor setup'],
  tags: ['programming', 'python', 'java', 'cpp', 'javascript', 'basics', 'foundations', 'placements'],
  languageSupport: ['Python', 'Java', 'C++', 'JavaScript'],
  defaultLanguage: 'Python',
  relatedPacks: ['pack-dsa-problem-solving', 'pack-cs-fundamentals', 'pack-git-tools'],
  relatedTemplates: ['ai-ml-engineer', 'full-stack-developer', 'backend-developer'],
  careerRelevance: 'The non-negotiable foundation for every software engineering, automation, and data science role.',
  learningOutcomes: [
    'Write clean, modular code in your language of choice (Python, Java, C++, JavaScript)',
    'Master control flow, nested loops, and structured problem decomposition',
    'Understand stack vs heap memory, references vs primitives, and mutable vs immutable data types',
    'Debug errors systematically with stack traces, print logs, and breakpoint debugging',
    'Analyze elementary Big-O time and space complexity for standard code blocks',
  ],
  subjects: [
    {
      id: 'pf-s1-basics',
      title: 'Programming Basics & Variables',
      description: 'Program execution model, variables, memory allocation, constants, and type casting.',
      order: 1,
      topics: [
        {
          id: 'pf-t1-variables-types',
          title: 'Variables, Constants & Memory Models',
          description: 'Variable declaration, static vs dynamic typing, primitive vs reference types, and constants.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['variables', 'data-types', 'memory'],
          learningItems: [
            { id: 'pf-li-1', title: 'How programs execute: compilation, bytecode, and interpretation (C++ vs Java vs Python vs JS)', type: 'concept' },
            { id: 'pf-li-2', title: 'Variables declaration and naming conventions (camelCase, snake_case, PascalCase)', type: 'implementation' },
            { id: 'pf-li-3', title: 'Primitive types: integers, floating-point numbers, characters, booleans', type: 'concept' },
            { id: 'pf-li-4', title: 'Reference types and pointers: stack allocation vs heap memory references', type: 'concept' },
            { id: 'pf-li-5', title: 'Constants and immutability (const, final, readonly, tuple vs list)', type: 'implementation' },
          ],
          practice: [
            { id: 'pf-pr-1', title: 'Variable Swap Without Temp Variable', description: 'Implement variable swapping using arithmetic and XOR operations in your chosen language.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-1', question: 'What is the fundamental difference between primitive data types and reference objects in memory?', difficulty: 'easy', type: 'interview' },
          ],
        },
        {
          id: 'pf-t2-type-conversion-io',
          title: 'Type Conversion, Input & Output Streams',
          description: 'Implicit coercion, explicit casting, standard input (stdin), and formatted output (stdout).',
          priority: 'core',
          estimatedHours: 2,
          tags: ['io', 'type-casting', 'formatting'],
          learningItems: [
            { id: 'pf-li-6', title: 'Implicit type coercion vs explicit casting (safe vs lossy conversions)', type: 'concept' },
            { id: 'pf-li-7', title: 'Fast input reading and parsing from stdin (cin, Scanner, sys.stdin.readline, readline)', type: 'implementation' },
            { id: 'pf-li-8', title: 'Formatted output strings (f-strings, printf, template literals, format strings)', type: 'implementation' },
          ],
          practice: [
            { id: 'pf-pr-2', title: 'Type Safe Formatter', description: 'Read diverse typed tokens from input and output structured summary report.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-2', question: 'Why can implicit type coercion lead to subtle bugs in dynamic languages like JavaScript and Python?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'pf-s2-operators-control-flow',
      title: 'Operators & Conditional Logic',
      description: 'Arithmetic, logical, relational, bitwise operators, and decision-making logic.',
      order: 2,
      topics: [
        {
          id: 'pf-t3-operators',
          title: 'Operators & Operator Precedence',
          description: 'Arithmetic, relational, logical short-circuiting, ternary, and bitwise manipulation.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['operators', 'logic', 'bitwise'],
          learningItems: [
            { id: 'pf-li-9', title: 'Arithmetic operators (+, -, *, /, //, %, **)', type: 'concept' },
            { id: 'pf-li-10', title: 'Relational & equality operators (== vs ===, value vs identity/is)', type: 'concept' },
            { id: 'pf-li-11', title: 'Logical operators with short-circuit evaluation (AND, OR, NOT)', type: 'implementation' },
            { id: 'pf-li-12', title: 'Bitwise operators (&, |, ^, ~, <<, >>) and masks', type: 'concept' },
            { id: 'pf-li-13', title: 'Ternary conditional expressions for compact decision branches', type: 'implementation' },
          ],
          practice: [
            { id: 'pf-pr-3', title: 'Power of Two Checker', description: 'Determine if an integer is a power of 2 using bitwise operators in O(1).', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-3', question: 'Explain how short-circuit evaluation works in logical expressions and give an example where it prevents a crash.', difficulty: 'medium', type: 'interview' },
          ],
        },
        {
          id: 'pf-t4-conditionals',
          title: 'Conditional Statements & Branching',
          description: 'if-else chains, switch-case/match statements, and defensive guard clauses.',
          priority: 'core',
          estimatedHours: 2,
          tags: ['conditionals', 'if-else', 'switch'],
          learningItems: [
            { id: 'pf-li-14', title: 'if, else if / elif, else branching logic', type: 'implementation' },
            { id: 'pf-li-15', title: 'Switch-case statements and Pattern Matching (match statement)', type: 'concept' },
            { id: 'pf-li-16', title: 'Guard clauses and early return patterns to avoid deeply nested code', type: 'implementation' },
          ],
          practice: [
            { id: 'pf-pr-4', title: 'Leap Year & Date Validator', description: 'Write a robust calendar date validator handling leap years and month boundaries.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-4', question: 'Why are guard clauses preferred over deeply nested if-else ladders in professional codebases?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'pf-s3-loops-iteration',
      title: 'Loops & Iteration Mastery',
      description: 'for loops, while loops, nested iterations, loop control (break, continue), and iterators.',
      order: 3,
      topics: [
        {
          id: 'pf-t5-loops',
          title: 'For, While & Nested Iteration',
          description: 'Definite vs indefinite loops, step iteration, index vs element traversal, and 2D matrix loops.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['loops', 'iteration', 'nested-loops'],
          learningItems: [
            { id: 'pf-li-17', title: 'for loops: range iteration, step increments, reverse iteration', type: 'implementation' },
            { id: 'pf-li-18', title: 'while and do-while loops for condition-driven cycles', type: 'implementation' },
            { id: 'pf-li-19', title: 'Loop control keywords: break (early termination), continue (skip step)', type: 'concept' },
            { id: 'pf-li-20', title: 'Nested loops for grid and matrix traversals (row-major vs column-major)', type: 'implementation' },
            { id: 'pf-li-21', title: 'Infinite loops, loop invariants, and terminating conditions', type: 'concept' },
          ],
          practice: [
            { id: 'pf-pr-5', title: 'Pattern Printing & Matrix Spiral Traversal', description: 'Generate pyramid pattern matrices and traverse rectangular grids.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-5', question: 'What is a loop invariant, and how do you verify your loop termination condition avoids infinite execution?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'pf-s4-functions-recursion',
      title: 'Functions, Scope & Recursion',
      description: 'Modular functions, arguments, return values, call stack, scope (LEGB), and basic recursion.',
      order: 4,
      topics: [
        {
          id: 'pf-t6-functions',
          title: 'Functions, Parameters & Call Stack',
          description: 'Function definition, parameter passing (pass-by-value vs pass-by-reference), and variable scope.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['functions', 'scope', 'call-stack'],
          learningItems: [
            { id: 'pf-li-22', title: 'Function signatures, return values, and pure functions vs side-effects', type: 'concept' },
            { id: 'pf-li-23', title: 'Pass-by-value vs Pass-by-reference / Pass-by-sharing semantics', type: 'concept' },
            { id: 'pf-li-24', title: 'Default parameters, keyword/named arguments, and varargs (*args, **kwargs, rest params)', type: 'implementation' },
            { id: 'pf-li-25', title: 'Call stack execution frames and local vs global scope resolution', type: 'concept' },
          ],
          practice: [
            { id: 'pf-pr-6', title: 'Modular Math & String Utility Library', description: 'Create a reusable utility library of validated mathematical and string operations.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-6', question: 'Explain the call stack behavior when a function calls another function.', difficulty: 'easy', type: 'interview' },
          ],
        },
        {
          id: 'pf-t7-recursion-basics',
          title: 'Recursion Fundamentals & Base Cases',
          description: 'Recursive thinking, base cases, recurrence relations, stack overflow, and call tree tracing.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['recursion', 'call-stack', 'algorithms'],
          learningItems: [
            { id: 'pf-li-26', title: 'The Anatomy of Recursion: Base case vs Recursive step', type: 'concept' },
            { id: 'pf-li-27', title: 'Tracing call trees and visualizing stack frame push/pop cycles', type: 'concept' },
            { id: 'pf-li-28', title: 'Classic problems: Factorial, Fibonacci, Power calculation (x^n in O(log n))', type: 'implementation' },
            { id: 'pf-li-29', title: 'Stack Overflow errors and max recursion depth limitations', type: 'concept' },
          ],
          practice: [
            { id: 'pf-pr-7', title: 'Recursive Palindrome & Array Sum', description: 'Implement string palindrome check and array sum strictly using recursion.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-7', question: 'What causes a Stack Overflow in recursion, and how do you ensure base cases are reached?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'pf-s5-collections-strings',
      title: 'Arrays, Strings & Core Collections',
      description: '1D/2D Arrays, string manipulation, HashMaps/Dictionaries, Sets, Stacks, and Queues.',
      order: 5,
      topics: [
        {
          id: 'pf-t8-arrays-strings',
          title: 'Arrays, Vectors & String Manipulation',
          description: 'Contiguous arrays, dynamic resizing, string immutability vs char buffers, slicing, and common methods.',
          priority: 'core',
          estimatedHours: 5,
          tags: ['arrays', 'strings', 'collections'],
          learningItems: [
            { id: 'pf-li-30', title: 'Array indexing, bounds checking, and O(1) random access', type: 'concept' },
            { id: 'pf-li-31', title: 'Dynamic array growth factor (vector / ArrayList / Python list amortized O(1))', type: 'concept' },
            { id: 'pf-li-32', title: 'String immutability and StringBuilder / string buffers for concatenation', type: 'concept' },
            { id: 'pf-li-33', title: 'Substrings, string slicing, searching, splitting, and joining', type: 'implementation' },
          ],
          practice: [
            { id: 'pf-pr-8', title: 'String Anagram & Reversal In-Place', description: 'Check valid anagrams and reverse words in a sentence efficiently.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-8', question: 'Why does repeated string concatenation in a loop without StringBuilder cause O(n²) performance in Java/Python/C#?', difficulty: 'medium', type: 'interview' },
          ],
        },
        {
          id: 'pf-t9-maps-sets',
          title: 'HashMaps, Dictionaries & Sets',
          description: 'Key-value mapping, hashing concept, uniqueness enforcement with Sets, and frequency maps.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['hashmap', 'dictionary', 'set'],
          learningItems: [
            { id: 'pf-li-34', title: 'Hash Table intuition: keys, hash functions, and O(1) average lookup/insert', type: 'concept' },
            { id: 'pf-li-35', title: 'Building frequency maps and counting occurrences', type: 'implementation' },
            { id: 'pf-li-36', title: 'Sets for deduplication, membership testing, and set operations (union, intersection, difference)', type: 'implementation' },
          ],
          practice: [
            { id: 'pf-pr-9', title: 'First Non-Repeating Character with Frequency Map', description: 'Find first non-repeating character in O(n) using a HashMap.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-9', question: 'What is a hash collision, and what happens to HashMap time complexity in the worst-case scenario?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'pf-s6-error-file-debugging',
      title: 'Exception Handling, File I/O & Debugging',
      description: 'Structured try-catch-finally, custom exceptions, file read/write, breakpoint debugging, and Big-O basics.',
      order: 6,
      topics: [
        {
          id: 'pf-t10-exceptions-files',
          title: 'Exception Handling & File Operations',
          description: 'Try/catch/finally blocks, resource cleanups (with/try-with-resources), and file reading/writing.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['exceptions', 'files', 'io'],
          learningItems: [
            { id: 'pf-li-37', title: 'Error vs Exception hierarchy and checked vs unchecked exceptions', type: 'concept' },
            { id: 'pf-li-38', title: 'try, catch / except, finally blocks and custom exception classes', type: 'implementation' },
            { id: 'pf-li-39', title: 'File handling: open, read, write, append, and context managers (with / using)', type: 'implementation' },
          ],
          practice: [
            { id: 'pf-pr-10', title: 'Safe CSV/Log File Parser', description: 'Read a data file, handle missing lines gracefully, and compute summary metrics.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'pf-as-10', question: 'Why is it dangerous to use a blank `catch (Exception e) {}` block in production code?', difficulty: 'easy', type: 'interview' },
          ],
        },
        {
          id: 'pf-t11-debugging-big-o',
          title: 'Systematic Debugging & Elementary Big-O',
          description: 'Using debuggers, stack trace interpretation, and estimating time & space complexity.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['debugging', 'big-o', 'complexity'],
          learningItems: [
            { id: 'pf-li-40', title: 'Reading stack traces from bottom-to-top to isolate crash origins', type: 'concept' },
            { id: 'pf-li-41', title: 'Using breakpoints, step over, step into, and variable inspectors in VS Code', type: 'implementation' },
            { id: 'pf-li-42', title: 'Big-O basics: counting loop operations to determine O(1), O(n), O(n²), O(log n)', type: 'concept' },
          ],
          practice: [
            { id: 'pf-pr-11', title: 'Fix 3 Buggy Algorithms Under Debugger', description: 'Use step debugging to identify off-by-one errors and null pointer exceptions.', difficulty: 'easy', type: 'debugging' },
          ],
          assessments: [
            { id: 'pf-as-11', question: 'What is the time complexity of searching an element in an unsorted array vs a hash table vs a sorted array with binary search?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
  ],
};
