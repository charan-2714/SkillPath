// scripts/curriculum/levels_00_to_09.js
// Levels L0 through L9 of the updated AI/ML Engineer Master Curriculum (Python Automation Developer Focus)

import { createTopic } from './helpers.js';

export const levels00to09 = [
  // ----------------------------------------------------
  // L0 — ENGINEERING FOUNDATION
  // ----------------------------------------------------
  {
    id: 'l0',
    order: 0,
    title: 'L0 — Engineering Foundation',
    description: 'Computer fundamentals, operating systems, processes, memory hierarchy, filesystems, development environments, terminal CLI, networking, errors and debugging workflows, and data formats.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 35,
    color: 'slate',
    subjects: [
      {
        id: 'l0-s1-computer-fundamentals',
        order: 1,
        title: 'Computer Architecture & Systems Fundamentals',
        description: 'CPU, RAM, Storage (SSD vs HDD), processes, threads, memory hierarchy, executable files, and environment variables.',
        topics: [
          createTopic({
            id: 'l0-cpu-ram-storage',
            order: 1,
            title: 'CPU, RAM, Storage & Memory Hierarchy',
            description: 'Understanding how code executes: CPU clock cycles, register/cache hierarchy (L1/L2/L3), RAM volatility, and non-volatile SSD/HDD persistence.',
            priority: 'core',
            estimatedHours: 4,
            tags: ['hardware', 'cpu', 'memory', 'storage'],
            learningObjectives: [
              'Explain the von Neumann architecture: CPU, RAM, registers, and bus',
              'Contrast L1/L2/L3 cache latency vs RAM latency vs SSD disk I/O',
              'Explain how programs load from storage into RAM for execution'
            ],
            subtopics: [
              'Von Neumann architecture and instruction fetch-decode-execute cycle',
              'CPU cores, hardware threads, and clock speed basics',
              'Memory hierarchy: Registers, L1/L2/L3 Cache, RAM, NVMe SSD, HDD',
              'Memory volatility vs non-volatile storage persistence',
              'RAM addressing, bytes, kilobytes, gigabytes, and memory bandwidth',
              'Storage I/O bottlenecks in data science and AI workloads'
            ],
            practice: [
              { title: 'System Hardware Benchmark Inspection', description: 'Use terminal utilities (lscpu, top, Task Manager, free -m) to document CPU cores, cache sizes, total RAM, and disk I/O throughput.' }
            ],
            debugging: [
              { title: 'Diagnose Disk I/O Throttling in Heavy Data Load', description: 'Identify when a data loading pipeline is bottlenecked on random disk reads vs CPU compute.', errorType: 'timeout' }
            ],
            assessments: [
              { question: 'Why is accessing data in L1 cache orders of magnitude faster than accessing RAM, and how does spatial locality affect data processing?' }
            ]
          }),
          createTopic({
            id: 'l0-processes-threads-memory',
            order: 2,
            title: 'Processes, Threads, PIDs & Signals',
            description: 'Process lifecycle, thread execution, stack vs heap allocation, process IDs (PID), exit codes, and signal handling.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['processes', 'threads', 'os', 'signals'],
            learningObjectives: [
              'Differentiate between an operating system process and a thread',
              'Understand virtual memory, stack allocation, and dynamic heap allocation',
              'Manage processes with PIDs and handle OS signals (SIGINT, SIGTERM, SIGKILL)'
            ],
            subtopics: [
              'Process definition: isolated memory space, file descriptors, and PID',
              'Thread definition: lightweight execution unit sharing parent process memory',
              'Stack memory (fast, automatic, stack frames, LIFO) vs Heap memory (dynamic, manual/garbage-collected)',
              'Process lifecycle states: New, Ready, Running, Waiting/Blocked, Terminated',
              'Standard process exit codes (0 for success, non-zero for errors)',
              'Signal handling mechanics: SIGINT (Ctrl+C), SIGTERM (graceful shutdown), SIGKILL (kill -9)',
              'Inter-process communication (IPC) concepts: pipes, sockets, and shared memory'
            ],
            practice: [
              { title: 'Process Inspector Script', description: 'Write a Python or Shell script that queries running process IDs, memory consumption, and handles SIGTERM gracefully.' }
            ],
            debugging: [
              { title: 'Debug Orphaned Background Process & Zombie Process', description: 'Find and terminate a detached process holding a network port open after parent crash.', errorType: 'runtime' }
            ],
            assessments: [
              { question: 'What is the fundamental difference between a Process and a Thread regarding memory isolation and context-switching overhead?' }
            ]
          }),
          createTopic({
            id: 'l0-env-variables-path',
            order: 3,
            title: 'Environment Variables, PATH & Executables',
            description: 'How operating systems locate programs, the PATH environment variable, executable binaries, and script shebangs.',
            priority: 'core',
            estimatedHours: 4,
            tags: ['environment', 'path', 'cli'],
            subtopics: [
              'Environment variables: key-value pairs inherited by child processes',
              'The PATH environment variable and executable discovery lookup order',
              'Executable file permissions and binary formats (ELF on Linux, Mach-O on macOS, PE/EXE on Windows)',
              'Script shebang lines (#!/usr/bin/env python3 or #!/bin/bash)',
              'Exporting variables (export VAR=value in bash/zsh, setx in Windows)',
              'Security: keeping API keys and database credentials in environment variables'
            ],
            practice: [
              { title: 'Custom CLI Utility Setup', description: 'Create a custom executable script, place it in a local bin directory, add that directory to PATH, and run it globally from any terminal.' }
            ]
          })
        ]
      },
      {
        id: 'l0-s2-os-and-shell',
        order: 2,
        title: 'Operating Systems & Command Line Mastery',
        description: 'Kernel vs user space, filesystem hierarchy, terminal commands, streams (stdin/stdout/stderr), pipes, and redirection.',
        topics: [
          createTopic({
            id: 'l0-kernel-userspace-filesystems',
            order: 1,
            title: 'Kernel, User Space & Filesystem Hierarchy',
            description: 'Kernel architecture, system calls, filesystem tree (/ on Unix, C:\\ on Windows), absolute vs relative paths.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['kernel', 'filesystem', 'os'],
            subtopics: [
              'Kernel space vs user space: privileged hardware access and protection rings',
              'System calls (syscalls): read, write, open, fork, execve, socket',
              'Filesystem tree: root directory (/), home directory (~), /bin, /etc, /var, /tmp',
              'Absolute paths (/var/log/syslog) vs Relative paths (./data/input.csv, ../config.json)',
              'File inodes, metadata, hard links vs symbolic links (symlinks)',
              'Virtual filesystems: /proc and /sys for runtime kernel telemetry'
            ]
          }),
          createTopic({
            id: 'l0-terminal-pipes-redirection',
            order: 2,
            title: 'Terminal Streams, Pipes, Redirection & Exit Codes',
            description: 'Mastering standard input (0), standard output (1), standard error (2), pipelines (|), file redirection (<, >, >>, 2>&1), and logical chaining.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['cli', 'bash', 'pipes', 'streams'],
            subtopics: [
              'Terminal vs Shell (bash, zsh, sh, PowerShell) vs Command Prompt',
              'Standard I/O Streams: stdin (file descriptor 0), stdout (1), stderr (2)',
              'Output redirection: > (overwrite), >> (append), < (input from file)',
              'Redirecting standard error: 2> error.log and combined redirection 2>&1',
              'Pipelines (|): connecting stdout of one process to stdin of another',
              'Command chaining with logical operators: && (on success), || (on failure), ; (sequential)',
              'Filtering text with grep, awk, sed, cut, sort, uniq, wc, head, tail, and less'
            ],
            practice: [
              { title: 'Log Extraction Pipeline', description: 'Write a one-line pipeline to parse a web server log, filter 500 errors, extract IP addresses, sort, count unique occurrences, and output top 5 IPs.' }
            ]
          })
        ]
      },
      {
        id: 'l0-s3-dev-env-and-debugging',
        order: 3,
        title: 'Development Environment & Systematic Debugging',
        description: 'VS Code mastery, debuggers, breakpoints, call stacks, watch expressions, error taxonomies, and systematic root cause analysis.',
        topics: [
          createTopic({
            id: 'l0-vscode-debugger-callstack',
            order: 1,
            title: 'VS Code, Debugger, Breakpoints & Call Stack',
            description: 'Using professional IDE tools: setting breakpoints, step over, step into, step out, inspecting local scopes, and watch expressions.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['vscode', 'debugging', 'debugger', 'ide'],
            subtopics: [
              'VS Code core architecture: settings.json, extensions, keybindings, workspace configs',
              'Integrated terminal vs external terminal environments',
              'Setting up launch.json for multi-file Python/Node debugging',
              'Breakpoints: standard, conditional breakpoints, and logpoints',
              'Stepping controls: Step Over (F10), Step Into (F11), Step Out (Shift+F11), Continue (F5)',
              'Call Stack inspection: tracing execution frames up and down the call chain',
              'Variables panel (Local, Global, Closure) and Watch Expressions evaluation'
            ]
          }),
          createTopic({
            id: 'l0-errors-and-root-cause-analysis',
            order: 2,
            title: 'Error Taxonomies, Stack Traces & Root Cause Analysis',
            description: 'Syntax errors, runtime exceptions, logical bugs, reading stack traces bottom-up, reproducing bugs, and regression prevention.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['errors', 'debugging', 'troubleshooting'],
            subtopics: [
              'Error categories: Syntax errors (parse time) vs Runtime errors (exceptions) vs Logical bugs (silent incorrect behavior)',
              'Anatomy of a Stack Trace: exception type, error message, file paths, line numbers, and frame hierarchy',
              'Reading stack traces bottom-up to find first line of user code',
              'Systematic 6-step debugging workflow: Reproduce -> Isolate -> Hypothesize -> Inspect -> Fix -> Regression Verification',
              'Minimal Reproducible Example (MRE) creation techniques',
              'Defensive programming: assertions, input validation, and informative error logging'
            ]
          })
        ]
      },
      {
        id: 'l0-s4-networking-and-data-formats',
        order: 4,
        title: 'Networking Fundamentals & Data Formats',
        description: 'Client-server architecture, IP addresses, DNS, ports, TCP vs UDP, localhost, JSON, YAML, TOML, and serialization.',
        topics: [
          createTopic({
            id: 'l0-networking-client-server-dns-tcp',
            order: 1,
            title: 'Networking: IP, DNS, Ports, TCP vs UDP & localhost',
            description: 'Client-server model, IPv4 vs IPv6, DNS resolution flow, port numbers (80, 443, 8000), 3-way handshake, and socket binding.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['networking', 'dns', 'tcp', 'ip', 'ports'],
            subtopics: [
              'Client-Server model and request-response lifecycle',
              'IP Addresses: IPv4 (32-bit dotted quad) vs IPv6 (128-bit hex), private IP ranges (192.168.x.x, 10.x.x.x)',
              'Localhost (127.0.0.1) and loopback interface mechanism',
              'DNS resolution process: browser cache -> OS resolver -> recursive resolver -> root -> TLD -> authoritative nameserver',
              'Port numbers (0-65535), well-known ports (80 HTTP, 443 HTTPS, 22 SSH, 5432 Postgres, 6379 Redis)',
              'TCP (reliable, ordered, connection-oriented, 3-way handshake SYN/SYN-ACK/ACK) vs UDP (fast, connectionless, packet loss tolerant)',
              'Socket binding, listening, accepting connections, and port collisions (Address already in use)'
            ]
          }),
          createTopic({
            id: 'l0-data-formats-json-yaml-toml-csv',
            order: 2,
            title: 'Data Formats: JSON, YAML, TOML & Serialization',
            description: 'Textual data exchange formats, JSON syntax, YAML hierarchy, TOML configuration, CSV tabular data, serialization vs deserialization.',
            priority: 'core',
            estimatedHours: 4,
            tags: ['json', 'yaml', 'toml', 'csv', 'serialization'],
            subtopics: [
              'Serialization (object to string/bytes) vs Deserialization / Parsing (string/bytes to object)',
              'JSON format: objects, arrays, strings, numbers, booleans, null, and syntax constraints (no trailing commas, double quotes required)',
              'YAML format: indentation-based hierarchy, lists, maps, scalars, multi-line strings, and common indentation pitfalls',
              'TOML format: tables, key-value pairs, types, and usage in pyproject.toml / modern packaging',
              'CSV / TSV: delimiter separation, quoting rules, header rows, and edge cases (commas inside quotes)',
              'Schema validation concepts: ensuring data structure integrity before downstream processing'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L1 — PYTHON
  // ----------------------------------------------------
  {
    id: 'l1',
    order: 1,
    title: 'L1 — Python Mastery',
    description: 'Python syntax, control flow, collections, functions, parameters, closures, decorators, modules, exceptions, OOP, iterators, generators, context managers, typing, dataclasses, asyncio, concurrency, code quality & testing basics, logging, and debugging.',
    estimatedDuration: '4-6 weeks',
    estimatedHours: 60,
    color: 'indigo',
    subjects: [
      {
        id: 'l1-s1-python-fundamentals',
        order: 1,
        title: 'Python Fundamentals & Data Types',
        description: 'Syntax, indentation, variables, dynamic typing, primitive types, string methods, f-strings, mutability, identity vs equality, truthiness, and operators.',
        topics: [
          createTopic({
            id: 'python-variables-types-mutability',
            order: 1,
            title: 'Variables, Types, Mutability & Identity',
            description: 'Understanding Python\'s object model: dynamic typing, variables as references, primitive types (int, float, complex, bool, NoneType), immutable vs mutable objects, id(), and is vs ==.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['python', 'variables', 'types', 'mutability'],
            learningObjectives: [
              'Explain how variables in Python act as pointer references to heap objects',
              'Differentiate mutable types (list, dict, set) from immutable types (int, float, str, tuple, frozenset)',
              'Distinguish object identity (is / id()) from value equality (== / __eq__)'
            ],
            subtopics: [
              'Variable assignment as label binding to objects in memory',
              'Dynamic typing vs static typing: type inference at runtime and duck typing',
              'Numeric types: int (arbitrary precision), float (IEEE 754 double precision), complex',
              'Booleans (subclass of int) and NoneType singleton (None)',
              'Mutability vs Immutability and in-place modification vs new object creation',
              'Identity (is keyword, id() memory address) vs Value Equality (== operator)',
              'Shallow copy (copy.copy()) vs Deep copy (copy.deepcopy()) mechanics',
              'Type conversion: explicit casting (int(), str(), float()) and implicit coercion',
              'Truthiness: falsy values (0, 0.0, "", [], {}, set(), None, False) and bool() evaluation'
            ],
            practice: [
              { title: 'Object Mutation & Identity Experimenter', description: 'Write scripts proving in-place mutation vs reallocation for lists, tuples, integers, and nested structures with id() checks.' }
            ],
            debugging: [
              { title: 'Debug Unintended Mutable Default Object Modification', description: 'Fix bug where modifying a list inside one function call mutated the state in subsequent calls due to reference sharing.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'Why does `a = [1, 2]; b = a; b.append(3)` change `a`, but `a = 10; b = a; b += 1` does not change `a`?' }
            ]
          }),
          createTopic({
            id: 'python-strings-formatting-operators',
            order: 2,
            title: 'Strings, Formatting, Operators & Precedence',
            description: 'String methods, slicing, f-strings, format specifiers, arithmetic, comparison, bitwise, and logical short-circuit evaluation.',
            priority: 'core',
            estimatedHours: 4,
            tags: ['strings', 'f-strings', 'operators'],
            subtopics: [
              'String representation: UTF-8 encoding, escape sequences (\\n, \\t, \\\\), raw strings (r"\\d+")',
              'String indexing (positive & negative) and step slicing (str[::-1] reversal)',
              'Essential string methods: strip, split, join, replace, find, startswith, endswith, lower, upper, count',
              'String formatting: f-strings (f"{val:.2f}", f"{num:04d}", f"{name!r}"), str.format(), and % formatting',
              'Operators: Arithmetic (+, -, *, /, // floor division, % modulo, ** exponentiation)',
              'Comparison operators (==, !=, <, <=, >, >=) and chained comparisons (1 < x < 10)',
              'Logical operators: and, or, not with short-circuit evaluation semantics',
              'Membership operators (in, not in) and Operator precedence rules'
            ]
          })
        ]
      },
      {
        id: 'l1-s2-control-flow-and-collections',
        order: 2,
        title: 'Control Flow & Collections Mastery',
        description: 'Conditionals, loops, loop else, lists, tuples, sets, dictionaries, slicing, unpacking, and comprehensions.',
        topics: [
          createTopic({
            id: 'python-control-flow',
            order: 1,
            title: 'Conditionals, Loops, Loop Else & Range',
            description: 'if/elif/else branching, while loops, for loops iterating over iterables, break, continue, pass, range(), and the for/else construct.',
            priority: 'core',
            estimatedHours: 4,
            tags: ['control-flow', 'loops', 'conditionals'],
            subtopics: [
              'if / elif / else conditional execution and ternary conditional expressions (val if cond else other)',
              'for loop mechanics: consuming iterators and range(start, stop, step)',
              'while loop mechanics, loop conditions, and infinite loop safeguards',
              'Loop control statements: break (early exit), continue (skip to next iteration), pass (no-op placeholder)',
              'The for...else and while...else construct (executes when loop completes without encountering a break)',
              'Iterating with enumerate(iterable, start=0) and zip(*iterables, strict=True)'
            ]
          }),
          createTopic({
            id: 'python-lists-tuples-sets-dicts',
            order: 2,
            title: 'Lists, Tuples, Sets, Dictionaries & Unpacking',
            description: 'Comprehensive mastery of built-in data structures: indexing, slicing, methods, hashing, dictionary lookups, and extended unpacking.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['collections', 'lists', 'dictionaries', 'tuples', 'sets'],
            subtopics: [
              'Lists: dynamic arrays, append, extend, insert, pop, remove, sort(key=...), reverse, indexing, and slicing',
              'Tuples: immutable sequences, single-element tuples (1,), packing, and namedtuple / typing.NamedTuple',
              'Sets: unordered unique collections, hashable element requirement, union (|), intersection (&), difference (-), symmetric difference (^)',
              'Dictionaries: hash map key-value store, key hashability requirement, keys(), values(), items(), get(k, default), setdefault, update, pop',
              'Extended unpacking syntax (*rest, a, *b, c = [1, 2, 3, 4, 5]) and dictionary unpacking (**dict1, **dict2)',
              'Time complexity: O(1) average lookup for dicts/sets vs O(n) linear scan for lists'
            ]
          }),
          createTopic({
            id: 'python-comprehensions',
            order: 3,
            title: 'List, Set & Dictionary Comprehensions',
            description: 'Writing idiomatic, efficient comprehensions with conditional filtering, nested loops, and generator expressions.',
            priority: 'core',
            estimatedHours: 4,
            tags: ['comprehensions', 'pythonic'],
            subtopics: [
              'List comprehensions: [expr for item in iterable if condition]',
              'Dictionary comprehensions: {k: v for item in iterable}',
              'Set comprehensions: {expr for item in iterable if condition}',
              'Nested comprehensions: flattening 2D matrices and generating coordinate grids',
              'Generator expressions: (expr for item in iterable) for lazy, memory-efficient evaluation',
              'Readability vs complexity: when to refactor complex multi-line comprehensions into explicit loops'
            ]
          })
        ]
      },
      {
        id: 'l1-s3-functions-and-closures',
        order: 3,
        title: 'Functions, Parameters, Scope & Closures',
        description: 'Function definition, positional, keyword, default, *args, **kwargs, keyword-only, positional-only arguments, LEGB scope, lambda, and closures.',
        topics: [
          createTopic({
            id: 'python-parameters-and-arguments',
            order: 1,
            title: 'Function Definition, Parameters & Arguments (*args, **kwargs)',
            description: 'Positional arguments, keyword arguments, default arguments, *args (variable positional), **kwargs (variable keyword), argument unpacking, keyword-only (*), and positional-only (/) syntax.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['functions', 'parameters', 'args', 'kwargs'],
            learningObjectives: [
              'Define functions accepting positional, keyword, default, variable, and restricted arguments',
              'Use *args to capture variable positional arguments as a tuple and **kwargs as a dictionary',
              'Enforce keyword-only parameters with * and positional-only parameters with /',
              'Unpack lists (*args) and dictionaries (**kwargs) into function invocations'
            ],
            subtopics: [
              'Function definition with def keyword, docstrings (__doc__), and return statements',
              'Positional parameters vs Keyword arguments in invocation',
              'Default parameter values and the classic mutable default argument trap (def f(x=[]))',
              '*args parameter: collecting arbitrary positional arguments into a tuple',
              '**kwargs parameter: collecting arbitrary keyword arguments into a dictionary',
              'Argument unpacking operators (*iterable for positional, **dict for keyword arguments)',
              'Keyword-only parameters using bare asterisk delimiter (def func(a, *, key_only=True))',
              'Positional-only parameters using forward slash delimiter (def func(pos_only, /, b, c))',
              'Return values: returning None implicitly vs explicit return vs returning multiple values as tuples'
            ],
            practice: [
              { title: 'Universal Event Dispatcher with *args and **kwargs', description: 'Create a flexible event handler registering callbacks and dispatching events with dynamic arguments and keyword options.' }
            ],
            debugging: [
              { title: 'Fix Mutable Default Argument Bug in Cache Function', description: 'Diagnose why default dictionary parameter shared mutated state across all function invocations and refactor with `x = None; if x is None: x = {}`.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'What is the purpose of the `/` and `*` symbols in a Python function signature (e.g., `def fn(a, /, b, *, c):`)?' }
            ]
          }),
          createTopic({
            id: 'python-scope-closures-higher-order',
            order: 2,
            title: 'Scope (LEGB), First-Class Functions, Closures & Lambda',
            description: 'LEGB scoping resolution (Local, Enclosing, Global, Built-in), global and nonlocal keywords, first-class functions, anonymous lambda functions, and closures.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['scope', 'closures', 'lambda', 'functional'],
            subtopics: [
              'LEGB Scope hierarchy: Local, Enclosing (nested functions), Global (module level), Built-in',
              'The global keyword: modifying module-level variables inside function scope',
              'The nonlocal keyword: binding and modifying variables in the enclosing outer scope',
              'First-class functions: passing functions as arguments, returning functions from functions, assigning to variables',
              'Anonymous lambda functions (lambda x, y: x + y) and functional helpers (map, filter, sorted)',
              'Lexical Closures: inner functions retaining reference to enclosing scope variables even after outer function has returned',
              'Inspecting closure cells with `__closure__` and `cell_contents`',
              'Creating stateful functions (counters, running averages) using closures without classes'
            ]
          }),
          createTopic({
            id: 'python-decorators-and-functools',
            order: 3,
            title: 'Decorators, Parameterized Decorators & functools.wraps',
            description: 'Function wrappers, @ decorator syntax, preserving metadata with functools.wraps, decorator factories accepting arguments, and class decorators.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['decorators', 'functools', 'metaprogramming'],
            learningObjectives: [
              'Explain how a decorator wraps and modifies a target function at definition time',
              'Write standard decorators that accept *args and **kwargs and return target results',
              'Preserve original function __name__, __doc__, and signature using @functools.wraps',
              'Build parameterized decorator factories taking configuration arguments',
              'Construct class-based decorators implementing __call__'
            ],
            subtopics: [
              'Function objects and higher-order wrapper functions',
              'Understanding the @ syntax as syntactic sugar (`func = decorator(func)`)',
              'Writing standard decorators with `def wrapper(*args, **kwargs): ... return result`',
              'Preserving function metadata (__name__, __doc__, __annotations__) with `@functools.wraps(func)`',
              'Parameterized Decorators (3-layer decorator factory functions accepting arguments: `@retry(max_attempts=3)`)',
              'Class-based decorators implementing the `__call__` dunder method',
              'Stacking multiple decorators and execution order (bottom-to-top evaluation)',
              'Practical decorator patterns: timing benchmarks, caching/memoization, authentication checks, and logging'
            ],
            practice: [
              { title: 'Build an @exponential_backoff_retry Decorator', description: 'Write a parameterized decorator that retries failed network calls with exponential backoff and jitter.' },
              { title: 'Build a Strict Type-Checking Decorator', description: 'Write a decorator verifying that passed argument types strictly match function type annotations at runtime.' }
            ],
            debugging: [
              { title: 'Debug Lost Function Signature and Docstring in Decorated API Handler', description: 'Diagnose why an OpenAPI documentation generator failed to read function descriptions on a decorated route because `@functools.wraps` was missing.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'Walk through step-by-step how a parameterized decorator like `@repeat(num_times=3)` is evaluated by the Python interpreter.' }
            ]
          })
        ]
      },
      {
        id: 'l1-s4-oop-and-magic-methods',
        order: 4,
        title: 'Object-Oriented Programming (OOP) & Dunder Methods',
        description: 'Classes, instances, __init__, instance/class/static methods, inheritance, MRO, polymorphism, encapsulation, composition, and magic dunder methods.',
        topics: [
          createTopic({
            id: 'python-classes-instances-methods',
            order: 1,
            title: 'Classes, Instances, Attributes & Method Types',
            description: 'Class definition, instance instantiation, __init__ constructor, instance methods (self), class methods (@classmethod / cls), and static methods (@staticmethod).',
            priority: 'core',
            estimatedHours: 6,
            tags: ['oop', 'classes', 'methods'],
            subtopics: [
              'Class definition as a blueprint and object instantiation',
              'The __init__ constructor method and self parameter reference',
              'Instance attributes (bound to self) vs Class attributes (shared across all instances)',
              'Instance methods: operating on instance state via self',
              'Class methods (@classmethod): operating on class state via cls and alternative constructors (from_dict, from_json)',
              'Static methods (@staticmethod): utility functions scoped inside a class namespace without self/cls access',
              'Property decorators (@property, @setter, @deleter) for getter/setter encapsulation'
            ]
          }),
          createTopic({
            id: 'python-inheritance-polymorphism-composition',
            order: 2,
            title: 'Inheritance, Multiple Inheritance, MRO & Composition',
            description: 'Single inheritance, super() call, multiple inheritance, Method Resolution Order (MRO / C3 Linearization), abstract base classes (abc.ABC), polymorphism, and composition vs inheritance.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['oop', 'inheritance', 'mro', 'composition'],
            subtopics: [
              'Single inheritance and subclassing with super().__init__()',
              'Method overriding and polymorphic method dispatch',
              'Multiple inheritance and the Diamond Problem',
              'Method Resolution Order (MRO) and inspecting `Class.__mro__` / `Class.mro()`',
              'Abstract Base Classes using `abc.ABC` and `@abc.abstractmethod` to enforce interfaces',
              'Composition ("has-a" relationship) vs Inheritance ("is-a" relationship) design principles'
            ]
          }),
          createTopic({
            id: 'python-magic-dunder-methods',
            order: 3,
            title: 'Magic (Dunder) Methods & Python Data Model',
            description: 'Implementing __str__, __repr__, __eq__, __hash__, __len__, __getitem__, __setitem__, __contains__, and arithmetic operator overloading.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['dunder', 'magic-methods', 'data-model'],
            subtopics: [
              'String representation dunders: `__repr__` (unambiguous, for developers) vs `__str__` (readable, for users)',
              'Comparison dunders: `__eq__`, `__ne__`, `__lt__`, `__le__`, `__gt__`, `__ge__` and `@functools.total_ordering`',
              'Hashing and set/dict compatibility: `__hash__` and immutable object requirements',
              'Container emulation dunders: `__len__`, `__getitem__`, `__setitem__`, `__delitem__`, `__contains__`',
              'Callable object emulation: `__call__` enabling instances to behave like functions',
              'Context manager dunders: `__enter__` and `__exit__` for resource management'
            ]
          })
        ]
      },
      {
        id: 'l1-s5-iterators-generators-context-managers',
        order: 5,
        title: 'Iterators, Generators & Context Managers',
        description: 'Iterable vs Iterator, Iterator protocol, yield, generator expressions, with statement, and contextlib.',
        topics: [
          createTopic({
            id: 'python-iterators-generators-yield',
            order: 1,
            title: 'Iterators, Generators, yield & Streaming Data',
            description: 'The iterator protocol (__iter__, __next__, StopIteration), generator functions with yield, yield from delegation, and constant-memory stream processing.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['iterators', 'generators', 'yield', 'streaming'],
            subtopics: [
              'Iterable (implements __iter__) vs Iterator (implements __iter__ and __next__)',
              'The iterator protocol mechanics: `iter()` initialization and `next()` step until `StopIteration` exception',
              'Custom iterator class implementation from scratch',
              'Generator functions: pausing execution and yielding values with the `yield` keyword',
              'Generator state preservation and resuming execution on subsequent next() calls',
              'The `yield from` syntax for delegating iteration to sub-generators',
              'Streaming massive datasets (multi-gigabyte logs, CSVs, vector files) with O(1) constant memory usage'
            ]
          }),
          createTopic({
            id: 'python-context-managers-with',
            order: 2,
            title: 'Context Managers, with Statement & contextlib',
            description: 'Resource management, file handles, database connections, locks, __enter__, __exit__, and the @contextlib.contextmanager generator decorator.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['context-managers', 'contextlib', 'resources'],
            subtopics: [
              'The `with` statement: deterministic setup and teardown for resource management',
              'The Context Manager protocol: `__enter__(self)` and `__exit__(self, exc_type, exc_val, exc_tb)`',
              'Handling and suppressing exceptions inside `__exit__` by returning True',
              'Creating lightweight context managers using `@contextlib.contextmanager` and yield',
              'Practical use cases: file I/O, database transactions, temporary directories, timing execution blocks, and acquiring thread locks'
            ]
          })
        ]
      },
      {
        id: 'l1-s6-typing-dataclasses-enums',
        order: 6,
        title: 'Type Annotations, Dataclasses & Enums',
        description: 'Type hints, Optional, Union, Callable, Generic, Protocol, TypedDict, mypy, @dataclass, frozen dataclasses, and Enum classes.',
        topics: [
          createTopic({
            id: 'python-typing-and-mypy',
            order: 1,
            title: 'Type Hints, Generics, Protocols & Static Type Checking (mypy)',
            description: 'Modern Python typing: primitive annotations, Optional, Union, Literal, Callable, TypeVar, Generic classes, Protocol structural subtyping, TypedDict, and mypy static analysis.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['typing', 'type-hints', 'mypy', 'generics'],
            subtopics: [
              'Type annotations syntax for variables, function parameters, and return types (`def fn(x: int) -> str:`)',
              'Union types (`Union[int, str]` or Python 3.10+ `int | str`) and `Optional[T]` (`T | None`)',
              'Literal types for restricting string/int values and `Callable[[ArgTypes], ReturnType]`',
              'Generics with `TypeVar` and `Generic[T]` for type-safe reusable data structures',
              'Structural subtyping (duck typing) with `typing.Protocol` interfaces',
              '`typing.TypedDict` for specifying exact dictionary key and value types',
              'Running static type analysis using `mypy` and resolving type check errors in CI'
            ]
          }),
          createTopic({
            id: 'python-dataclasses-and-enums',
            order: 2,
            title: 'Dataclasses (@dataclass) & Enums (Enum)',
            description: 'Simplifying data containers with @dataclass, default values, default_factory, frozen immutability, __post_init__, and Enum / IntEnum / StrEnum.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['dataclasses', 'enums', 'pydantic-prep'],
            subtopics: [
              'The `@dataclass` decorator: auto-generating `__init__`, `__repr__`, `__eq__`, and `__hash__`',
              'Defining fields with `field(default_factory=list, repr=False, compare=True)`',
              'The `__post_init__` method for validation and derived attribute computation',
              'Immutable data containers with `@dataclass(frozen=True)`',
              'Inheritance with dataclasses and field ordering rules',
              'Standard enumerations with `enum.Enum`, `enum.IntEnum`, and `enum.StrEnum` for fixed choices'
            ]
          })
        ]
      },
      {
        id: 'l1-s7-asyncio-and-concurrency',
        order: 7,
        title: 'Asynchronous Programming (asyncio) & Concurrency',
        description: 'async/await syntax, event loop, tasks, asyncio.gather, thread vs process concurrency, the Global Interpreter Lock (GIL), and ThreadPoolExecutor.',
        topics: [
          createTopic({
            id: 'python-asyncio-eventloop-tasks',
            order: 1,
            title: 'asyncio: Event Loop, Coroutines, Tasks & asyncio.gather',
            description: 'Single-threaded asynchronous I/O, coroutine functions (`async def`), `await` expressions, event loop execution, `asyncio.create_task`, concurrent execution with `asyncio.gather`, timeouts, and async context managers.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['asyncio', 'async', 'event-loop', 'coroutines'],
            subtopics: [
              'Synchronous blocking I/O vs Asynchronous non-blocking event-driven execution',
              'Defining coroutines with `async def` and awaiting awaitables with `await`',
              'The asyncio Event Loop: scheduling, running, and yielding control back to the loop',
              'Scheduling concurrent coroutines as background Tasks with `asyncio.create_task()`',
              'Running tasks concurrently with `asyncio.gather(*tasks)` and `asyncio.as_completed()`',
              'Cancellation, handling `asyncio.CancelledError`, and timeouts with `asyncio.wait_for()`',
              'Async Context Managers (`async with`) and Async Iterators (`async for`)',
              'Rate limiting and concurrency throttling with `asyncio.Semaphore(max_concurrent)`',
              'Async HTTP client operations using `httpx.AsyncClient` / `aiohttp`'
            ],
            practice: [
              { title: 'Concurrent Async Web API Scraper', description: 'Write an asyncio script fetching 50 API endpoints concurrently with a Semaphore limit of 5 concurrent connections, error handling, and timeout safeguards.' }
            ]
          }),
          createTopic({
            id: 'python-threading-multiprocessing-gil',
            order: 2,
            title: 'Threading, Multiprocessing, the GIL & concurrent.futures',
            description: 'CPU-bound vs I/O-bound tasks, the Global Interpreter Lock (GIL), threading module, multiprocessing module, ThreadPoolExecutor, and ProcessPoolExecutor.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['threading', 'multiprocessing', 'gil', 'concurrency'],
            subtopics: [
              'I/O-bound workloads (waiting on network, disk, DB) vs CPU-bound workloads (matrix multiplication, image processing, parsing)',
              'The CPython Global Interpreter Lock (GIL) and why threading does not achieve true parallel CPU execution in Python',
              'The `threading` module, thread synchronization locks (`threading.Lock`), and race conditions',
              'The `multiprocessing` module: spawning separate OS processes with independent memory and bypassing the GIL',
              'High-level concurrency with `concurrent.futures.ThreadPoolExecutor` and `ProcessPoolExecutor`',
              'Submitting jobs and mapping over iterables with `executor.map()`'
            ]
          })
        ]
      },
      {
        id: 'l1-s8-code-quality-and-testing-basics',
        order: 8,
        title: 'Code Quality & Testing Basics (Engineer Verification)',
        description: 'Practical developer testing: why verification matters for software/AI engineers, writing basic Pytest test functions, assertions, simple fixtures, basic mocking with unittest.mock, parameterization, testing API responses, and debugging test failures.',
        topics: [
          createTopic({
            id: 'python-testing-basics-pytest',
            order: 1,
            title: 'Code Quality & Testing Basics with Pytest',
            description: 'Practical testing fundamentals for Python engineers: writing test functions (`test_*`), assert statements, running tests with `pytest`, setting up simple fixtures (`@pytest.fixture`), basic parameterization (`@pytest.mark.parametrize`), testing API responses, testing expected exceptions (`pytest.raises`), basic mocking of network calls with `unittest.mock.patch`, and understanding test failure traces.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['pytest', 'testing', 'code-quality', 'verification'],
            learningObjectives: [
              'Write clean unit test functions in Pytest to verify your own Python functions and classes',
              'Test expected failure cases and exceptions using pytest.raises',
              'Use simple @pytest.fixture to manage reusable test setup data',
              'Mock external HTTP network calls using unittest.mock.patch to keep tests fast and deterministic',
              'Run Pytest from the CLI, interpret failure diffs, and quickly fix broken code'
            ],
            subtopics: [
              'Why testing matters for engineers: validating logic correctness, preventing regressions during refactoring, and verifying edge cases',
              'Writing test functions in `test_*.py` files and using standard Python `assert actual == expected` statements',
              'Running tests via terminal: `pytest`, `pytest -v`, `pytest -k "pattern"`, `pytest -x` (stop on first failure)',
              'Testing exceptions and failure cases cleanly using `with pytest.raises(ValueError):`',
              'Simple reusable test fixtures with `@pytest.fixture` and `conftest.py` basics',
              'Testing multiple input-output scenarios with `@pytest.mark.parametrize("input,expected", [...])`',
              'Basic mocking: replacing external HTTP requests or slow functions with `unittest.mock.patch` and `MagicMock`',
              'Testing API response models and JSON structures returned by endpoints',
              'Basic code coverage awareness: running `pytest --cov` to identify untested execution branches'
            ],
            practice: [
              { title: 'Write a Test Suite for Data Transformation & API Client Functions', description: 'Write unit tests using Pytest for a Python function that parses JSON data and an API client with a mocked HTTP endpoint.' }
            ],
            debugging: [
              { title: 'Diagnose and Fix Broken Test Assertion Failure', description: 'Inspect a failing Pytest traceback, identify a type mismatch between string and integer in calculation logic, and fix the source code.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'How do you use `pytest.raises` to verify that a function correctly raises a custom exception when given invalid input?' }
            ]
          }),
          createTopic({
            id: 'python-logging-and-debugging',
            order: 2,
            title: 'Logging Configuration, Debugging (pdb/breakpoint) & Packaging',
            description: 'Production logging: log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL), handlers, formatters, structured JSON logging, interactive debugging with `breakpoint()`, virtual environments, pip, and pyproject.toml.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['logging', 'pdb', 'debugging', 'packaging'],
            subtopics: [
              'The `logging` module hierarchy: root logger, named loggers (`logging.getLogger(__name__)`)',
              'Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL and choosing appropriate levels',
              'Log Handlers (StreamHandler, RotatingFileHandler) and Formatters for structured logs',
              'Interactive debugging with builtin `breakpoint()` / `pdb`: stepping, inspecting variables, stack frames',
              'Virtual environment isolation (`python -m venv .venv`), `pip install`, `requirements.txt`, and modern `pyproject.toml`'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L2 — GIT + GITHUB
  // ----------------------------------------------------
  {
    id: 'l2',
    order: 2,
    title: 'L2 — Git & GitHub Version Control',
    description: 'Working tree, staging area, commit graph, branching strategies, merge vs rebase, conflict resolution, undoing changes (reset, revert, restore), stash, tags, PR workflows, and GitHub Actions CI basics.',
    estimatedDuration: '1-2 weeks',
    estimatedHours: 20,
    color: 'emerald',
    subjects: [
      {
        id: 'l2-s1-git-fundamentals',
        order: 1,
        title: 'Git Core Concepts & Local Workflow',
        description: 'Repository architecture, staging area, commit graphs, inspecting history, and managing branches.',
        topics: [
          createTopic({
            id: 'git-working-tree-staging-commits',
            order: 1,
            title: 'Working Tree, Staging Area, Commits & History',
            description: 'The three states of Git (Working Directory, Staging Index, Repository), git init, git add, git commit, git status, git log, and git diff.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['git', 'version-control', 'commits'],
            subtopics: [
              'Git architecture: Working Directory, Staging Area (Index), Commit History, and .git directory',
              'Initializing repositories (`git init`) and cloning remotes (`git clone <url>`)',
              'Checking status (`git status`) and staging modifications (`git add <file>`, `git add -p` interactive patch)',
              'Creating atomic, well-formatted commits (`git commit -m "feat: description"`)',
              'Inspecting history: `git log --oneline --graph --decorate --all`',
              'Inspecting diffs: `git diff` (unstaged) and `git diff --staged` (staged changes)',
              'Ignoring files with `.gitignore` patterns and handling tracked ignored files'
            ]
          }),
          createTopic({
            id: 'git-branching-merge-rebase-conflicts',
            order: 2,
            title: 'Branching, Merge, Rebase & Conflict Resolution',
            description: 'Branch creation, switching (git switch / checkout), fast-forward vs 3-way merge, git rebase mechanics, and systematic merge conflict resolution.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['git', 'branching', 'merge', 'rebase', 'conflicts'],
            subtopics: [
              'Branches as lightweight pointers to commits (`git branch <name>`, `git switch -c <name>`)',
              'Fast-forward merges vs 3-way merge commits (`git merge <branch>`)',
              'Linear history with `git rebase <base-branch>` and rebasing feature branches',
              'Merge vs Rebase trade-offs: when to merge vs when to rebase',
              'Anatomy of a merge conflict: `<<<<<<< HEAD`, `=======`, `>>>>>>> incoming` markers',
              'Systematic conflict resolution workflow: edit files, verify, `git add`, and `git commit` / `git rebase --continue`'
            ]
          }),
          createTopic({
            id: 'git-undoing-changes-stash-tags',
            order: 3,
            title: 'Undoing Changes (Restore, Reset, Revert), Stash & Tags',
            description: 'Discarding local edits (git restore), rewriting history safely (git revert vs git reset --soft/--hard), temporary shelving with git stash, and semantic version tagging.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['git', 'undo', 'reset', 'revert', 'stash'],
            subtopics: [
              'Discarding uncommitted changes: `git restore <file>` and un-staging `git restore --staged <file>`',
              'Temporary state shelving: `git stash push -m "wip"`, `git stash list`, and `git stash pop`',
              'Safe public undoing: `git revert <commit-hash>` creating an inverse commit',
              'Local history manipulation: `git reset --soft` (keeps staged), `git reset --mixed`, and `git reset --hard` (destructive)',
              'Recovering lost commits and detached HEAD states using `git reflog`',
              'Tagging releases: lightweight tags and annotated semantic tags (`git tag -a v1.0.0 -m "Release v1.0.0"`), `git push origin --tags`'
            ]
          })
        ]
      },
      {
        id: 'l2-s2-github-collaboration',
        order: 2,
        title: 'GitHub Collaboration, PRs & CI Automation',
        description: 'Remotes, pushing/pulling, Pull Request reviews, GitHub Issues, and GitHub Actions CI/CD workflows.',
        topics: [
          createTopic({
            id: 'github-remotes-prs-code-reviews',
            order: 1,
            title: 'Remotes, Pull Requests, Code Reviews & Branch Protection',
            description: 'Managing remotes (git remote add/origin), fetch vs pull, opening pull requests, reviewing code diffs, squashing commits, and branch protection rules.',
            priority: 'core',
            estimatedHours: 4,
            tags: ['github', 'pull-requests', 'code-review', 'collaboration'],
            subtopics: [
              'Configuring remotes: `git remote add origin <url>`, `git fetch`, and `git pull --rebase`',
              'Pushing branches: `git push -u origin <branch>` and force-with-lease (`git push --force-with-lease`)',
              'Creating professional Pull Requests: summary, context, testing proof, and checklists',
              'Code Review etiquette: constructive comments, approving, requesting changes, and inline suggestions',
              'Branch protection rules: requiring passing CI checks and approvals before merging',
              'Merge strategies on GitHub: Create a merge commit vs Squash and merge vs Rebase and merge'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L3 — LINUX + CLI
  // ----------------------------------------------------
  {
    id: 'l3',
    order: 3,
    title: 'L3 — Linux & Command Line Engineering',
    description: 'Filesystem navigation, text manipulation (grep, sed, awk), process management, file permissions (chmod, chown, sudo), networking tools (curl, ssh), and bash scripting.',
    estimatedDuration: '2 weeks',
    estimatedHours: 25,
    color: 'amber',
    subjects: [
      {
        id: 'l3-s1-linux-text-and-files',
        order: 1,
        title: 'Linux File Operations, Search & Text Processing',
        description: 'Mastering core Linux CLI utilities: find, grep, sort, uniq, cut, awk, sed, head, tail, and tar archives.',
        topics: [
          createTopic({
            id: 'linux-file-ops-and-search',
            order: 1,
            title: 'File Navigation, Search (find, locate) & Archives (tar, zip)',
            description: 'Navigating directories, searching files by name/size/modification date with find, managing permissions, and compressing archives with tar.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['linux', 'find', 'tar', 'cli'],
            subtopics: [
              'File operations: pwd, ls -la, cd, mkdir -p, touch, cp -r, mv, rm -rf',
              'Viewing files: cat, less, head -n 20, tail -n 20, tail -f (live log tailing)',
              'Searching the filesystem with `find /path -name "*.py" -type f -size +10M -mtime -7`',
              'Executing actions on find results: `find . -name "*.log" -exec rm {} \\;`',
              'Archiving and compression: creating and extracting tarballs (`tar -czvf archive.tar.gz dir/`, `tar -xzvf archive.tar.gz`)',
              'Disk usage telemetry: `df -h` (filesystem space) and `du -sh *` (directory sizes)'
            ]
          }),
          createTopic({
            id: 'linux-text-processing-grep-awk-sed',
            order: 2,
            title: 'Text Processing: grep, awk, sed, cut, sort & uniq',
            description: 'Harnessing regular expressions, regex searching with grep/ripgrep, stream editing with sed, and column manipulation with awk.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['linux', 'grep', 'awk', 'sed', 'regex'],
            subtopics: [
              'Pattern matching with `grep -rnE "pattern" dir/` and case-insensitive search (`grep -i`)',
              'Stream editing with `sed`: text substitution (`sed -i "s/old/new/g" file.txt`) and line deletion',
              'Column processing with `awk`: printing fields (`awk \'{print $1, $4}\'`), field separators (`-F","`), and aggregations',
              'Sorting and deduplication: `sort -n`, `sort -r`, and `uniq -c` (counting occurrences)',
              'Cutting fields with `cut -d"," -f1,3` and word/line counting with `wc -l`'
            ]
          })
        ]
      },
      {
        id: 'l3-s2-linux-processes-permissions-networking',
        order: 2,
        title: 'Processes, Permissions, Networking & Bash Scripts',
        description: 'ps, top/htop, kill, chmod, chown, sudo, curl, wget, ss/netstat, SSH keys, and bash shell scripting.',
        topics: [
          createTopic({
            id: 'linux-processes-permissions-systemd',
            order: 1,
            title: 'Process Management, Permissions (chmod/chown) & systemd',
            description: 'Monitoring processes (ps aux, top, htop), signals (kill, pkill), background jobs (&, nohup), rwx permission bits, numeric chmod (755, 644), chown, and systemd services.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['linux', 'processes', 'permissions', 'chmod', 'systemd'],
            subtopics: [
              'Process monitoring: `ps aux | grep python`, `top`, `htop`, and memory inspection',
              'Background processes: running with `&`, keeping alive after disconnect with `nohup cmd &` or `tmux`',
              'Sending signals: `kill -15 <PID>` (SIGTERM), `kill -9 <PID>` (SIGKILL), `pkill -f process_name`',
              'Linux file permissions: Owner, Group, Others permissions (Read=4, Write=2, Execute=1)',
              'Modifying permissions with `chmod 755 script.sh`, `chmod 600 id_rsa`, and ownership with `chown user:group file`',
              'Privilege escalation with `sudo` and /etc/sudoers security',
              'Service management with systemd: `systemctl status/start/stop/restart/enable service_name` and `journalctl -u service_name -f`'
            ]
          }),
          createTopic({
            id: 'linux-networking-ssh-bash-scripting',
            order: 2,
            title: 'Networking (curl, ss), SSH Remote Access & Bash Scripting',
            description: 'Testing network endpoints with curl, socket inspection with ss, public key SSH authentication, and writing robust bash scripts.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['linux', 'ssh', 'curl', 'bash', 'scripting'],
            subtopics: [
              'HTTP testing with `curl`: headers (`curl -I`), POST data (`curl -X POST -d \'{"k":"v"}\' -H "Content-Type: application/json"`), verbose mode (`curl -v`)',
              'Network socket inspection: `ss -tulpn` or `netstat -tulpn` to inspect open listening ports',
              'SSH remote access: generating key pairs (`ssh-keygen -t ed25519`), copying public keys (`ssh-copy-id`), and `ssh -i key user@host`',
              'Secure file copying with `scp` and `rsync -avz`',
              'Bash scripting fundamentals: shebang (`#!/bin/bash`), variables, command substitution (`output=$(cmd)`)',
              'Bash conditional statements (`if [ -f "$file" ]; then ... fi`), loops (`for item in "${list[@]}"; do ... done`)',
              'Bash functions, arguments (`$1`, `$2`, `$@`, `$#`), exit codes (`exit 1`), and strict error handling (`set -euo pipefail`)'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L4 — WEB + HTTP
  // ----------------------------------------------------
  {
    id: 'l4',
    order: 4,
    title: 'L4 — Web Architecture & HTTP Protocol',
    description: 'URLs, HTTP request/response cycle, HTTP methods (GET, POST, PUT, PATCH, DELETE), headers, content types, cookies, sessions, CORS, HTTPS/TLS, and exhaustive HTTP status codes.',
    estimatedDuration: '1-2 weeks',
    estimatedHours: 20,
    color: 'blue',
    subjects: [
      {
        id: 'l4-s1-http-protocol-and-methods',
        order: 1,
        title: 'HTTP Request-Response Lifecycle & Methods',
        description: 'URL structure, HTTP headers, request body, response body, and HTTP verbs (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS).',
        topics: [
          createTopic({
            id: 'http-request-response-methods',
            order: 1,
            title: 'HTTP Lifecycle, URLs, Headers & Methods (GET, POST, PUT, PATCH, DELETE)',
            description: 'Anatomy of HTTP requests and responses: URL components, HTTP headers (Content-Type, Authorization, Accept), payload bodies, and method idempotency/safety.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['http', 'web', 'rest', 'api'],
            subtopics: [
              'URL anatomy: Scheme (https), Host (api.example.com), Port (443), Path (/v1/users), Query string (?page=2&limit=50), Fragment (#section)',
              'HTTP Request structure: Request line (METHOD /path HTTP/1.1), Headers, Blank line, Request Body',
              'HTTP Response structure: Status line (HTTP/1.1 200 OK), Response Headers, Blank line, Response Body',
              'Common HTTP Headers: Content-Type (application/json, text/html, multipart/form-data), Authorization (Bearer token), Accept, User-Agent',
              'HTTP Methods: GET (safe, idempotent, retrieve resource), POST (non-idempotent, create resource), PUT (idempotent, full replacement)',
              'HTTP Methods: PATCH (partial update), DELETE (idempotent, remove resource), HEAD (headers only), OPTIONS (preflight CORS queries)',
              'Idempotency and Safety definitions and implications for retry logic'
            ]
          })
        ]
      },
      {
        id: 'l4-s2-http-status-codes-deep-dive',
        order: 2,
        title: 'Exhaustive HTTP Status Codes & Error Diagnostics',
        description: 'Deep dive into 1xx, 2xx, 3xx, 4xx, and 5xx status codes: meanings, typical causes, real-world examples, and step-by-step debugging approaches.',
        topics: [
          createTopic({
            id: 'http-status-codes-2xx-3xx',
            order: 1,
            title: '2xx Success & 3xx Redirection Status Codes',
            description: '200 OK, 201 Created, 202 Accepted, 204 No Content, 206 Partial Content, 301 Moved Permanently, 302 Found, 304 Not Modified, 307 Temporary Redirect, 308 Permanent Redirect.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['http', 'status-codes', '2xx', '3xx'],
            subtopics: [
              '200 OK: Standard successful response for GET, PUT, PATCH',
              '201 Created: Successful resource creation (POST), returning Location header and new object representation',
              '202 Accepted: Request received and queued for asynchronous background processing (batch jobs, model fine-tuning)',
              '204 No Content: Successful request with no response body (common in DELETE or update operations)',
              '206 Partial Content: Range request fulfillment (used for audio/video streaming and resuming chunked downloads)',
              '301 Moved Permanently vs 308 Permanent Redirect: URL changed permanently (308 guarantees method is preserved)',
              '302 Found vs 307 Temporary Redirect: temporary redirect (307 guarantees POST remains POST)',
              '304 Not Modified: Conditional GET response using ETag / If-None-Match headers for HTTP cache validation'
            ]
          }),
          createTopic({
            id: 'http-status-codes-4xx-5xx-errors',
            order: 2,
            title: '4xx Client Errors & 5xx Server Errors (Diagnostics & Fixes)',
            description: 'Comprehensive analysis of 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 409 Conflict, 415 Unsupported Media, 422 Unprocessable, 429 Too Many Requests, 500 Internal Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.',
            priority: 'core',
            estimatedHours: 7,
            tags: ['http', 'errors', '4xx', '5xx', 'status-codes', 'troubleshooting'],
            learningObjectives: [
              'Explain the root cause and distinction between 401 Unauthorized and 403 Forbidden',
              'Diagnose and resolve 422 Unprocessable Entity payload validation errors in APIs',
              'Handle 429 Too Many Requests with exponential backoff and Retry-After headers',
              'Differentiate 500 Internal Server Error vs 502 Bad Gateway vs 504 Gateway Timeout in microservice and reverse proxy architectures'
            ],
            subtopics: [
              '400 Bad Request: Malformed JSON syntax, invalid query parameters, or missing required headers',
              '401 Unauthorized: Missing or invalid authentication credentials (expired JWT, bad API key)',
              '401 vs 403: 401 means "Who are you? (Authenticate)", 403 Forbidden means "I know who you are, but you don\'t have permission (Authorize)"',
              '404 Not Found: Requested endpoint or resource ID does not exist in database',
              '405 Method Not Allowed: Requesting POST on a GET-only endpoint, inspect Allow header',
              '409 Conflict: State conflict (duplicate email in user registration, optimistic locking version mismatch)',
              '415 Unsupported Media Type: Sending application/x-www-form-urlencoded when API expects application/json',
              '422 Unprocessable Entity: Syntactically valid JSON failing semantic schema validation (Pydantic validation error)',
              '429 Too Many Requests: Rate limit exceeded, parsing `Retry-After` header and implementing exponential backoff',
              '500 Internal Server Error: Unhandled exception in backend application code (inspect server logs and stack trace)',
              '502 Bad Gateway: Reverse proxy (Nginx, Cloudflare) cannot connect to upstream application server (backend crashed or port closed)',
              '503 Service Unavailable: Server overloaded or undergoing scheduled maintenance',
              '504 Gateway Timeout: Upstream backend server took too long to process request (LLM generation timeout, slow DB query)'
            ],
            practice: [
              { title: 'HTTP Error Diagnostic Simulator', description: 'Write an automated HTTP client that systematically triggers and handles 400, 401, 404, 422, 429, and 504 responses with structured error recovery.' }
            ],
            debugging: [
              { title: 'Debug Reverse Proxy 502 Bad Gateway vs 504 Gateway Timeout', description: 'Diagnose whether an AI inference endpoint failed due to an unhandled exception crash (502) or slow model generation exceeding proxy timeout (504).', errorType: 'network' }
            ],
            assessments: [
              { question: 'Describe a real-world scenario that causes a 502 Bad Gateway error vs a 504 Gateway Timeout error, and explain how you would troubleshoot each in production.' }
            ]
          })
        ]
      },
      {
        id: 'l4-s3-web-security-and-caching',
        order: 3,
        title: 'CORS, Cookies, Sessions & HTTPS/TLS Security',
        description: 'Cross-Origin Resource Sharing (CORS), preflight OPTIONS requests, cookies (HttpOnly, Secure, SameSite), sessions vs tokens, and HTTPS TLS handshake.',
        topics: [
          createTopic({
            id: 'http-cors-cookies-sessions-tls',
            order: 1,
            title: 'CORS, Cookies (HttpOnly/SameSite), Sessions & HTTPS',
            description: 'Same-Origin Policy, Cross-Origin Resource Sharing (CORS headers: Access-Control-Allow-Origin, Preflight OPTIONS), Cookies vs LocalStorage, and TLS certificates.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['cors', 'cookies', 'security', 'https', 'tls'],
            subtopics: [
              'Same-Origin Policy (SOP): Protocol, Domain, and Port matching rules in web browsers',
              'CORS mechanics: Simple requests vs Preflight `OPTIONS` requests and required response headers (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`)',
              'Fixing CORS errors in backend frameworks by configuring allowed origins properly',
              'Cookies: `Set-Cookie` header, `HttpOnly` (mitigating XSS theft), `Secure` (HTTPS only), and `SameSite=Lax/Strict/None` (mitigating CSRF)',
              'Session-based authentication (stateful server session store + session ID cookie) vs Token-based authentication (stateless JWT)',
              'HTTPS & TLS encryption: asymmetric handshake (certificate exchange & verification) followed by symmetric session encryption'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L5 — APIs + BACKEND
  // ----------------------------------------------------
  {
    id: 'l5',
    order: 5,
    title: 'L5 — REST APIs & FastAPI Backend Architecture',
    description: 'REST architectural principles, API design best practices, OpenAPI/Swagger specifications, FastAPI framework, Pydantic data validation, dependency injection, middleware, async routes, and JWT authentication.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 35,
    color: 'violet',
    subjects: [
      {
        id: 'l5-s1-rest-api-design',
        order: 1,
        title: 'REST Architecture & Professional API Design',
        description: 'Resource-oriented design, plural nouns, nested resources, pagination, filtering, sorting, versioning, and error response formatting.',
        topics: [
          createTopic({
            id: 'rest-principles-and-api-design',
            order: 1,
            title: 'REST Architecture, Resource Modeling & API Design',
            description: 'Designing clean RESTful APIs: resource naming conventions (`/api/v1/users/{id}/projects`), query parameters (`?limit=20&offset=40`), pagination strategies (offset vs cursor-based), sorting, filtering, and OpenAPI documentation.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['rest', 'api-design', 'openapi'],
            subtopics: [
              'REST principles: Client-Server, Statelessness, Cacheability, Uniform Interface, Layered System',
              'Resource URI modeling: using plural nouns (`/api/v1/documents`), hierarchical nesting (`/documents/{id}/chunks`)',
              'Query parameter design: filtering (`?status=active`), searching (`?q=python`), sorting (`?sort=-created_at`)',
              'Pagination strategies: Offset/Limit pagination vs Cursor-based keyset pagination for high-volume datasets',
              'API Versioning strategies: URI path versioning (`/v1/`), header versioning, query param versioning',
              'Standardized JSON error response schemas (error code, message, error details list, timestamp)'
            ]
          })
        ]
      },
      {
        id: 'l5-s2-fastapi-framework',
        order: 2,
        title: 'FastAPI Framework, Pydantic & Dependency Injection',
        description: 'Building modern async APIs with FastAPI: route handlers, path/query parameters, Pydantic request/response models, field validation, dependency injection, and exception handlers.',
        topics: [
          createTopic({
            id: 'fastapi-pydantic-validation-routes',
            order: 1,
            title: 'FastAPI Routes, Path/Query Params & Pydantic Validation',
            description: 'FastAPI app instance, `@app.get` / `@app.post` route decorators, path parameters, query parameters, Pydantic `BaseModel`, `Field` validation constraints, and response models.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['fastapi', 'pydantic', 'backend', 'python'],
            subtopics: [
              'Creating FastAPI application instance and running with `uvicorn main:app --reload`',
              'Path parameters with type enforcement (`@app.get("/items/{item_id:int}")`)',
              'Query parameters with defaults and optional parameters (`page: int = 1, limit: int = 20`)',
              'Pydantic request body models (`BaseModel`) with type annotations and default values',
              'Pydantic `Field` constraints (ge=0, le=100, min_length=3, pattern=...) and `@validator` / `@field_validator`',
              'Response models (`response_model=ItemOut`) ensuring response data sanitization and documentation',
              'Automatic interactive API documentation: `/docs` (Swagger UI) and `/redoc` (ReDoc)'
            ]
          }),
          createTopic({
            id: 'fastapi-dependency-injection-middleware-auth',
            order: 2,
            title: 'FastAPI Dependency Injection, Middleware & JWT Auth',
            description: 'The `Depends()` system, sharing database sessions, custom middleware, global exception handlers, OAuth2 password bearer flow, and JWT token authentication.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['fastapi', 'dependency-injection', 'middleware', 'jwt', 'auth'],
            subtopics: [
              'FastAPI Dependency Injection system with `Depends()`: code reuse, db connections, auth checks',
              'Creating database session dependencies with `yield` for automatic cleanup',
              'Custom Middleware: adding request timing headers, request logging, and CORS middleware',
              'Custom exception handlers with `@app.exception_handler(CustomException)` and `HTTPException`',
              'Authentication workflow: OAuth2PasswordBearer, hashing passwords with `bcrypt` / `passlib`',
              'Issuing and validating JSON Web Tokens (JWT) using `pyjwt` with expiry timestamps and user payload claims',
              'Protecting endpoints by injecting `current_user = Depends(get_current_user)`'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L6 — PYTHON AUTOMATION (STRENGTHENED)
  // ----------------------------------------------------
  {
    id: 'l6',
    order: 6,
    title: 'L6 — Python Automation & Scripting Engineering',
    description: 'Comprehensive Python automation engineering: filesystem manipulation (pathlib, shutil), subprocess command execution, resilient API automation (requests, httpx, retries, exponential backoff, rate limiting), data automation (JSON, CSV, Excel, Pandas), job scheduling, environment config, structured logging, robust error handling, and modular CLI automation tools.',
    estimatedDuration: '3-4 weeks',
    estimatedHours: 45,
    color: 'teal',
    subjects: [
      {
        id: 'l6-s1-filesystem-and-process-automation',
        order: 1,
        title: 'Filesystem, Path Manipulation & Process Automation',
        description: 'Automating OS interactions: object-oriented filesystem paths with pathlib, recursive directory operations with shutil/glob, file metadata, and subprocess process automation.',
        topics: [
          createTopic({
            id: 'python-filesystem-pathlib-shutil',
            order: 1,
            title: 'Filesystem Automation: pathlib, shutil, glob & Cross-Platform Paths',
            description: 'Object-oriented filesystem manipulation: pathlib.Path methods (.exists(), .is_file(), .mkdir(), .read_text(), .write_text()), recursive file search (.glob(), .rglob()), file metadata (timestamps, file sizes, permissions), cross-platform path handling (Windows vs POSIX), and shutil operations (copy2, move, rmtree, archive creation).',
            priority: 'core',
            estimatedHours: 6,
            tags: ['automation', 'pathlib', 'shutil', 'filesystem', 'os'],
            learningObjectives: [
              'Use pathlib.Path for all filesystem operations rather than deprecated os.path functions',
              'Perform recursive file searching, filtering by extension, size, and modification timestamp',
              'Manage file archives, directory copying, moving, and safe deletion using shutil',
              'Build robust cross-platform path routines handling Windows backslashes and Linux slashes seamlessly'
            ],
            subtopics: [
              'Why pathlib.Path outperforms legacy `os` and `os.path`: object-oriented syntax, operator overloading (`path / "subdir"`), and pure path abstraction',
              'Filesystem inspection: `.exists()`, `.is_file()`, `.is_dir()`, `.stat()` (file size, st_mtime modification time, st_ctime)',
              'Reading and writing files atomically with `.read_text(encoding="utf-8")`, `.write_text()`, `.read_bytes()`',
              'Directory traversal and batch search with `.glob("*.json")` and recursive `.rglob("**/*.csv")`',
              'High-level file management with `shutil`: `shutil.copy2()` (preserving metadata), `shutil.move()`, `shutil.rmtree()`, `shutil.make_archive()`',
              'File permissions (`os.chmod`), temporary files and directories with `tempfile.TemporaryDirectory`',
              'Cross-platform path handling: resolving relative paths with `.resolve()`, `.parent`, `.stem`, `.suffix`'
            ],
            practice: [
              { title: 'Automated File Organizer & Metadata Cataloger', description: 'Write a script that recursively scans a messy downloads directory, categorizes files by type/date, moves them into structured subdirectories, and logs a JSON index catalog.' }
            ],
            debugging: [
              { title: 'Debug Windows vs Linux Path Separation Crash in Automation Script', description: 'Diagnose why hardcoded backslash strings broke on a Linux server and refactor using `pathlib.Path`.', errorType: 'runtime' }
            ],
            assessments: [
              { question: 'Why should you prefer `pathlib.Path` over `os.path.join` and string concatenation in production automation scripts?' }
            ]
          }),
          createTopic({
            id: 'python-process-automation-subprocess',
            order: 2,
            title: 'Process Automation: subprocess, Execution, Stdout/Stderr & Timeouts',
            description: 'Executing external system commands safely in Python: `subprocess.run()`, command arguments, capturing stdout and stderr streams, exit code inspection, environment variables injection, timeout limits, and process error handling.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['automation', 'subprocess', 'processes', 'cli'],
            learningObjectives: [
              'Execute external binaries and CLI tools safely from Python without shell injection vulnerabilities',
              'Capture, parse, and log stdout and stderr streams cleanly',
              'Enforce execution timeout limits to prevent hanging automation jobs',
              'Handle non-zero exit codes using check=True and CalledProcessError'
            ],
            subtopics: [
              'The `subprocess` module: `subprocess.run(["command", "arg1", "arg2"], capture_output=True, text=True, check=True)`',
              'Security best practices: avoiding `shell=True` to prevent command injection vulnerabilities',
              'Capturing standard output (`result.stdout`) and standard error (`result.stderr`) streams',
              'Exit code handling: inspecting `result.returncode` and handling `subprocess.CalledProcessError`',
              'Injecting custom environment variables into child processes via `env={**os.environ, "CUSTOM_VAR": "val"}`',
              'Timeout safeguards: setting `timeout=30` and catching `subprocess.TimeoutExpired` exceptions to kill hanging jobs',
              'Streaming real-time output from long-running commands using `subprocess.Popen` and line-by-line reading'
            ],
            practice: [
              { title: 'Automated Git Repository Health & Status Checker CLI', description: 'Write a script that scans a directory of Git repos, executes git status and git fetch via subprocess, and generates a summary table of uncommitted changes.' }
            ]
          })
        ]
      },
      {
        id: 'l6-s2-api-and-data-automation',
        order: 2,
        title: 'API Automation & Tabular Data Processing',
        description: 'Automating REST API communication with requests/httpx, token auth, sessions, retries, exponential backoff, rate limiting, and batch data processing with JSON/CSV/Excel/Pandas.',
        topics: [
          createTopic({
            id: 'python-api-automation-httpx-requests',
            order: 1,
            title: 'API Automation: requests, httpx, Auth, Retries & Exponential Backoff',
            description: 'Automated REST API consumption: GET, POST, PUT, PATCH, DELETE methods, headers, query parameters, JSON payload handling, Bearer token / API key authentication, `requests.Session()` / `httpx.Client()` connection reuse, status code validation, exponential backoff retries with jitter, and rate limit handling.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['automation', 'api-automation', 'requests', 'httpx', 'retries'],
            learningObjectives: [
              'Build robust API clients with connection pooling and session reuse',
              'Handle Bearer token and API key authentication automatically',
              'Implement exponential backoff retry loops handling transient network errors and 429 rate limits',
              'Process paginated API endpoints and aggregate results into structured files'
            ],
            subtopics: [
              'The `requests` and `httpx` HTTP libraries: synchronous client vs asynchronous `httpx.AsyncClient`',
              'Constructing HTTP requests: URLs, query parameters dict (`params={"page": 2}`), headers (`{"Authorization": f"Bearer {token}"}`), JSON body (`json={...}`)',
              'Session management: `requests.Session()` and `httpx.Client()` for TCP connection reuse and persistent cookies/headers',
              'Status code validation: `response.raise_for_status()`, inspecting `response.status_code`, and parsing JSON (`response.json()`)',
              'Resilient retry strategies: implementing exponential backoff (`delay = base * (2 ** attempt) + random.uniform(0, 1)`)',
              'Using `urllib3.util.Retry` and HTTP adapters for automatic transparent retries on 500, 502, 503, 504 errors',
              'Handling Rate Limits (HTTP 429): reading `Retry-After` headers and rate-limiting outgoing requests with client-side throttles',
              'Automating paginated API traversal (Link header pagination, cursor pagination, offset/limit pagination)'
            ],
            practice: [
              { title: 'Resilient Multi-Endpoint Data Sync Client', description: 'Build an automated API client fetching paginated data from an API with Bearer token authentication, exponential backoff retries on failure, and saving deduplicated records to disk.' }
            ],
            debugging: [
              { title: 'Debug Silent Failure in API Ingestion Script without raise_for_status()', description: 'Diagnose why a data sync pipeline continued executing with empty data when an API returned 401 Unauthorized, and fix with proper status code assertions.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'Why is adding random jitter essential when implementing exponential backoff retry logic in automated API clients?' }
            ]
          }),
          createTopic({
            id: 'python-data-automation-json-csv-excel',
            order: 2,
            title: 'Data Automation: JSON, CSV, Excel (openpyxl) & Pandas Transformations',
            description: 'Automating tabular and hierarchical data pipelines: parsing JSON, CSV (csv module and Pandas), Excel workbooks (openpyxl), data validation, cleaning, filtering, and automated report generation.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['automation', 'data-automation', 'csv', 'excel', 'pandas', 'json'],
            subtopics: [
              'JSON manipulation: `json.loads()`, `json.dumps()`, `json.load()`, `json.dump()`, indent formatting, and custom encoders',
              'CSV automation: `csv.reader`, `csv.DictReader`, `csv.DictWriter` with custom delimiters and quote characters',
              'Excel automation with `openpyxl`: loading workbooks, iterating rows, writing cells, styling headers, and adding formulas',
              'Batch data transformation with Pandas: reading multiple CSVs/Excel sheets, merging datasets, data type normalization, handling missing records',
              'Data validation: asserting column schemas, verifying non-null constraints, and flagging anomaly records',
              'Generating automated summary reports (CSV, Excel, formatted Markdown/HTML) from raw operational logs'
            ]
          })
        ]
      },
      {
        id: 'l6-s3-automation-architecture-and-scheduling',
        order: 3,
        title: 'Automation Architecture, Scheduling, Config & Logging',
        description: 'Engineering production-ready automation systems: task scheduling (cron, Windows Task Scheduler), configuration management (.env, python-dotenv), structured logging, error recovery fallbacks, and modular CLI tools.',
        topics: [
          createTopic({
            id: 'automation-architecture-config-logging-scheduling',
            order: 1,
            title: 'Automation Architecture: Scheduling, Config (.env), Logging & Error Recovery',
            description: 'Building professional automation architecture: separating configuration from code with `.env` / `python-dotenv`, structured logging for unattended jobs, job scheduling via cron / Task Scheduler / Python `schedule`, graceful degradation, partial failure recovery, and building modular CLI utilities.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['automation', 'architecture', 'config', 'logging', 'scheduling'],
            subtopics: [
              'Separation of Configuration from Code (12-Factor App): using `.env` files with `python-dotenv` and environment variables for secrets/paths',
              'Logging for unattended background jobs: RotatingFileHandler (preventing disk space exhaustion), timestamp formatting, log levels',
              'Scheduling automation jobs: Crontab syntax (`0 2 * * *`), Windows Task Scheduler triggers, and in-process Python `schedule` / `APScheduler` library',
              'Error handling and recovery strategies: try/except/finally blocks, fallback data sources, capturing failure snapshots, and alerting notifications',
              'Designing modular automation architecture: separating API client, parsing logic, file I/O, and configuration into reusable modules',
              'Building command-line interfaces for automation utilities using `argparse` or `click` / `typer`'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L7 — PLAYWRIGHT + BROWSER AUTOMATION
  // ----------------------------------------------------
  {
    id: 'l7',
    order: 7,
    title: 'L7 — Playwright & Browser Automation Engineering',
    description: 'Modern browser automation engineering with Playwright Python: Browser, BrowserContext, Page, resilient user-facing locators, auto-waiting, actions (click, fill, type, press, select, upload), browser state persistence (cookies, localStorage, auth state reuse), iframes, multi-tabs, popups, dialogs, network request interception & mocking, Page Object Model (POM), trace viewer debugging, and Playwright vs Selenium.',
    estimatedDuration: '3-4 weeks',
    estimatedHours: 40,
    color: 'rose',
    subjects: [
      {
        id: 'l7-s1-playwright-core-and-locators',
        order: 1,
        title: 'Playwright Architecture, Browser Context & Modern Locators',
        description: 'Browser instance, multi-context isolation, Page navigation, and resilient user-facing locators (getByRole, getByText, getByLabel, getByTestId, CSS, XPath).',
        topics: [
          createTopic({
            id: 'playwright-browser-context-locators',
            order: 1,
            title: 'Playwright Architecture, BrowserContext & Modern Locators',
            description: 'Playwright architecture (Chromium, Firefox, WebKit), Browser vs BrowserContext (isolated cookies/localStorage) vs Page (tab), headed vs headless mode, and resilient user-facing locators (`getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`, `getByTestId`, CSS, XPath).',
            priority: 'core',
            estimatedHours: 8,
            tags: ['playwright', 'browser-automation', 'locators', 'python'],
            learningObjectives: [
              'Understand Playwright architecture: WebSocket connection to browser engine vs legacy HTTP polling',
              'Manage isolated browser contexts to enable parallel automation and clean state sessions',
              'Write resilient, accessibility-focused locators using get_by_role, get_by_text, and get_by_label',
              'Chain, filter, and scope locators across complex nested DOM hierarchies'
            ],
            subtopics: [
              'Playwright architecture: async WebSocket bi-directional connection to browser engine vs Selenium WebDriver HTTP polling',
              'Browser vs BrowserContext (isolated cookies, localStorage, session state) vs Page (individual tab)',
              'Launching browsers in headless vs headed mode (`headless=False, slow_mo=50`)',
              'User-facing accessibility locators (best practice): `page.get_by_role("button", name="Submit")`',
              '`page.get_by_text()`, `page.get_by_label()`, `page.get_by_placeholder()`, `page.get_by_test_id()`',
              'CSS selectors, text filtering (`locator.filter(has_text="...")`), and XPath selectors when necessary',
              'Chaining and scoping locators (`container.locator("button")`) to avoid ambiguous element matches'
            ],
            practice: [
              { title: 'Build a Multi-Step Form Automation Script with Playwright', description: 'Write a Python Playwright script that navigates a multi-step web form, fills inputs using accessibility locators, and extracts confirmation data.' }
            ],
            debugging: [
              { title: 'Debug Strict Mode Violation (Multiple Elements Matched) in Playwright', description: 'Diagnose why `locator.click()` threw a StrictModeError because selector matched 3 buttons on the page, and resolve using `filter(has_text=...)` or `get_by_role`.', errorType: 'runtime' }
            ],
            assessments: [
              { question: 'Why does Playwright recommend using `get_by_role()` and `get_by_label()` over raw XPath or complex CSS classes?' }
            ]
          }),
          createTopic({
            id: 'playwright-actions-auto-waiting-assertions',
            order: 2,
            title: 'User Actions, Auto-Waiting & Assertions',
            description: 'Interacting with elements: click, fill, type, press, select_option, check, uncheck, hover; Playwright\'s built-in auto-waiting actionability checks, timeouts, and web assertions.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['playwright', 'actions', 'waiting', 'assertions'],
            subtopics: [
              'User actions: `locator.click()`, `locator.fill("text")` (clears and types), `locator.press_sequentially()`, `locator.press("Enter")`',
              'Checkbox/radio interactions: `locator.check()`, `locator.uncheck()`, `locator.select_option("value")`',
              'Auto-waiting actionability checks: element attached to DOM, visible, stable (not animating), receives events, enabled',
              'Web-first assertions: `expect(locator).to_be_visible()`, `expect(locator).to_have_text()`, `expect(page).to_have_url()`',
              'Handling timeouts: setting default navigation timeouts vs action timeouts',
              'Why explicit sleep (`time.sleep`) is an anti-pattern in Playwright and how auto-waiting eliminates flakiness'
            ]
          })
        ]
      },
      {
        id: 'l7-s2-advanced-playwright-and-architecture',
        order: 2,
        title: 'Advanced Browser Automation, Auth State & Architecture',
        description: 'Authentication state reuse, iframes, multi-tabs, popups, dialogs, network interception, Page Object Model (POM), Trace Viewer debugging, and Playwright vs Selenium comparison.',
        topics: [
          createTopic({
            id: 'playwright-storage-frames-network-interception',
            order: 1,
            title: 'Auth State Persistence, Frames, Tabs & Network Interception',
            description: 'Bypassing repeated logins via `storage_state="auth.json"`, interacting with iframes (`page.frame_locator`), multiple tabs, popups, file uploads/downloads, and intercepting network requests (`page.route`).',
            priority: 'core',
            estimatedHours: 10,
            tags: ['playwright', 'auth-state', 'iframes', 'network-interception'],
            subtopics: [
              'Authentication state persistence: saving session cookies/tokens (`context.storage_state(path="auth.json")`) and creating pre-authenticated contexts',
              'Interacting with iframes using `page.frame_locator("#iframe-id").get_by_role(...)`',
              'Handling multiple browser tabs and popup windows using `context.expect_page()`',
              'Handling browser dialogs (alerts, confirms, prompts) with `page.on("dialog", lambda dialog: dialog.accept())`',
              'File uploads (`locator.set_input_files("file.pdf")`) and handling downloads (`page.expect_download()`)',
              'Network interception with `page.route()`: blocking ads/images for speed, mocking API responses, modifying request headers',
              'Debugging with Playwright Trace Viewer (`playwright show-trace trace.zip`) and Playwright Codegen'
            ]
          }),
          createTopic({
            id: 'playwright-pom-and-vs-selenium',
            order: 2,
            title: 'Page Object Model (POM), Utilities & Playwright vs Selenium',
            description: 'Structuring scalable automation code using the Page Object Model (POM) pattern, reusable browser utilities, parallel execution, trace visualizer debugging, and comprehensive architectural comparison of Playwright vs Selenium.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['playwright', 'pom', 'architecture', 'selenium'],
            learningObjectives: [
              'Implement clean Page Object Model classes separating page interactions from script workflows',
              'Build reusable browser automation helper utilities for authentication, downloads, and table extraction',
              'Diagnose automation failures using Playwright Trace Viewer step-by-step visual recordings',
              'Explain the core architectural differences between Playwright and Selenium'
            ],
            subtopics: [
              'Page Object Model (POM) architecture: encapsulation of UI locators and user actions within page classes',
              'Building reusable automation utilities and configuration management',
              'Parallel execution and managing browser concurrency',
              'Diagnosing failures using Playwright Trace Viewer (inspecting DOM snapshots, console logs, network calls, and action timelines)',
              'Playwright vs Selenium Architectural Comparison:',
              '1. Protocol: Playwright uses single bi-directional WebSocket connection; Selenium uses HTTP request per action',
              '2. Waiting: Playwright has automatic built-in actionability waiting; Selenium requires explicit WebDriverWait',
              '3. Context Isolation: Playwright creates lightweight isolated contexts in milliseconds; Selenium requires heavy browser instances',
              '4. Multi-tab/iFrame support: Playwright has native first-class primitives; Selenium requires explicit window switching',
              '5. When Selenium is appropriate: testing legacy browsers (IE), massive existing enterprise Selenium Grid infrastructure'
            ],
            practice: [
              { title: 'Production Web Automation & Data Extraction Tool (POM)', description: 'Build an automation tool using Page Object Model that logs into a web portal using saved storageState, navigates paginated tables, extracts financial records, and downloads CSV reports.' }
            ],
            debugging: [
              { title: 'Debug Intermittent Stale Element / Click Interception in Animated Modal', description: 'Diagnose why a click action failed intermittently during a CSS modal fade-in animation and fix using proper locator web assertions.', errorType: 'timeout' }
            ],
            assessments: [
              { question: 'Compare Playwright and Selenium from an architectural perspective. Explain how Playwright\'s WebSocket communication and auto-waiting eliminate flaky automation runs.' }
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L8 — WEB SCRAPING + BEAUTIFULSOUP
  // ----------------------------------------------------
  {
    id: 'l8',
    order: 8,
    title: 'L8 — Web Scraping & HTML Parsing',
    description: 'DOM structure, HTML tags, attributes, CSS selectors, BeautifulSoup4 parsing, pagination traversal, table extraction, rate limiting, and ethical scraping practices.',
    estimatedDuration: '1 week',
    estimatedHours: 15,
    color: 'cyan',
    subjects: [
      {
        id: 'l8-s1-html-and-bs4',
        order: 1,
        title: 'DOM Parsing, CSS Selectors & BeautifulSoup4',
        description: 'Document Object Model traversal, navigating HTML trees, BeautifulSoup4 find/find_all/select methods, handling pagination, and parsing tables.',
        topics: [
          createTopic({
            id: 'html-dom-beautifulsoup-parsing',
            order: 1,
            title: 'HTML DOM, CSS Selectors & BeautifulSoup4 Extraction',
            description: 'Parsing HTML with BeautifulSoup: soup.find(), soup.find_all(), soup.select() CSS selectors, attribute extraction (.get()), table parsing, pagination crawling, and polite scraping.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['html', 'scraping', 'beautifulsoup', 'css-selectors'],
            subtopics: [
              'HTML document structure: DOCTYPE, html, head, body, tags, nested elements, attributes (id, class, href, src)',
              'Document Object Model (DOM) tree hierarchy: parent, child, sibling relationships',
              'CSS Selectors for web scraping: element, `.class`, `#id`, `tag[attr=val]`, descendant `div p`, direct child `ul > li`',
              'Parsing HTML with BeautifulSoup using `lxml` and `html.parser` engines',
              'Extracting elements with `soup.find()` and `soup.find_all(class_="...")`',
              'Using advanced CSS queries with `soup.select()` and `soup.select_one()`',
              'Extracting text (`.get_text(strip=True)`) and attribute values (`tag["href"]`, `tag.get("src")`)',
              'Extracting structured data from HTML `<table>` rows into Pandas DataFrames',
              'Crawling multi-page pagination loops and resolving relative URLs with `urllib.parse.urljoin`',
              'Ethical scraping: respecting robots.txt, adding User-Agent headers, and implementing rate limits / delays'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L9 — PANDAS + DATA
  // ----------------------------------------------------
  {
    id: 'l9',
    order: 9,
    title: 'L9 — Data Manipulation with Pandas & NumPy',
    description: 'NumPy arrays, broadcasting, vectorization, Pandas Series and DataFrame, indexing with loc/iloc, filtering, GroupBy aggregations, merging/joining, reshaping, handling missing data, and exploratory data analysis (EDA).',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 35,
    color: 'green',
    subjects: [
      {
        id: 'l9-s1-numpy-fundamentals',
        order: 1,
        title: 'NumPy Arrays, Vectorization & Matrix Operations',
        description: 'NumPy ndarrays, data types (dtype), shapes, reshaping, indexing, slicing, broadcasting rules, and vectorized math operations.',
        topics: [
          createTopic({
            id: 'numpy-arrays-broadcasting-vectorization',
            order: 1,
            title: 'NumPy Arrays, Broadcasting Rules & Vectorized Operations',
            description: 'High-performance numerical computing: creating ndarrays, array dimensions, shape manipulation, element-wise math, broadcasting semantics, and why vectorization is 100x faster than Python loops.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['numpy', 'arrays', 'vectorization', 'broadcasting'],
            subtopics: [
              'NumPy `ndarray` architecture: contiguous C-array memory layout and homogeneous data types (`dtype=np.float32`)',
              'Creating arrays: `np.array()`, `np.zeros()`, `np.ones()`, `np.arange()`, `np.linspace()`, `np.random.randn()`',
              'Array attributes: `.shape`, `.ndim`, `.size`, `.dtype`',
              'Indexing and multidimensional slicing (`arr[0:5, 1:3]`) vs fancy integer/boolean indexing',
              'Broadcasting rules: matching trailing dimensions for element-wise operations between arrays of different shapes',
              'Vectorized math operations: `np.dot()`, `@` matrix multiplication, `np.sum(axis=0)`, `np.mean()`, `np.argmax()`',
              'Performance benchmarking: measuring vectorized NumPy operations vs standard Python `for` loops'
            ]
          })
        ]
      },
      {
        id: 'l9-s2-pandas-dataframes',
        order: 2,
        title: 'Pandas Series, DataFrame & Indexing (loc/iloc)',
        description: 'Creating Series and DataFrames, explicit label indexing with loc, integer position indexing with iloc, boolean filtering, and column assignment.',
        topics: [
          createTopic({
            id: 'pandas-series-dataframe-loc-iloc',
            order: 1,
            title: 'Pandas Series, DataFrames, loc & iloc Selection',
            description: 'Core Pandas data structures: Series (1D indexed array), DataFrame (2D tabular data), label selection with `df.loc`, integer position selection with `df.iloc`, and boolean masking.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['pandas', 'dataframe', 'loc', 'iloc', 'indexing'],
            subtopics: [
              'Pandas `Series` and `DataFrame` structure, indices, and column headers',
              'Reading and writing datasets: `pd.read_csv()`, `pd.read_json()`, `pd.read_parquet()`, `df.to_csv()`',
              'Exploring DataFrames: `df.head()`, `df.tail()`, `df.info()`, `df.describe()`, `df.shape`, `df.dtypes`',
              'Label-based selection with `df.loc[row_labels, col_labels]` (inclusive endpoints)',
              'Position-based selection with `df.iloc[row_indices, col_indices]` (exclusive endpoints)',
              'Boolean indexing and multi-condition filtering (`df[(df["age"] > 25) & (df["salary"] < 80000)]`)',
              'Avoiding `SettingWithCopyWarning`: using `.loc` for assignment and understanding views vs copies'
            ]
          })
        ]
      },
      {
        id: 'l9-s3-pandas-transformations-and-groupby',
        order: 3,
        title: 'Data Cleaning, GroupBy, Merging & Exploratory Analysis',
        description: 'Handling missing data (isna, dropna, fillna), duplicates, GroupBy split-apply-combine aggregations, merge/join/concat, datetime operations, and EDA.',
        topics: [
          createTopic({
            id: 'pandas-groupby-merge-cleaning-eda',
            order: 1,
            title: 'Data Cleaning, GroupBy Aggregations & Merging (SQL-like Joins)',
            description: 'Data wrangling: handling missing values (NaNs), deduplication, GroupBy aggregations (`df.groupby("category").agg({"price": ["mean", "max"]})`), table joins (`pd.merge`), concatenation (`pd.concat`), and datetime feature extraction.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['pandas', 'groupby', 'merging', 'cleaning', 'eda'],
            subtopics: [
              'Handling missing data: `df.isna().sum()`, `df.dropna(subset=[...])`, `df.fillna(method/value)`',
              'Deduplication: `df.duplicated()`, `df.drop_duplicates(subset=[...])`',
              'Type casting: `df["col"].astype("category")`, `pd.to_numeric()`, `pd.to_datetime()`',
              'Datetime manipulations: `.dt.year`, `.dt.month`, `.dt.dayofweek`, `.dt.hour`, date arithmetic with `pd.Timedelta`',
              'String operations on Series with `.str` accessor (`.str.lower()`, `.str.contains()`, `.str.extract()`)',
              'The GroupBy split-apply-combine pattern: `df.groupby("dept")["salary"].mean()` and custom `.agg()` dicts',
              'Transform and Window-like operations with `df.groupby()["col"].transform("mean")`',
              'Merging DataFrames with `pd.merge(df1, df2, on="id", how="inner|left|right|outer")`',
              'Concatenating DataFrames along axes with `pd.concat([df1, df2], axis=0|1)`',
              'Applying custom functions with `df["col"].apply(func)` vs vectorized alternatives'
            ]
          })
        ]
      }
    ]
  }
];
