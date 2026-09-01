// generate_ai_curriculum.js
// Complete, production-grade AI/ML Engineer Master Curriculum Builder

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levels = [];

// Helper functions
let itemIdCounter = 1;
let pracIdCounter = 1;
let dbgIdCounter = 1;
let assessIdCounter = 1;
let resIdCounter = 1;

function createTopic({
  id,
  order,
  title,
  description,
  priority = 'core',
  estimatedHours = 6,
  prerequisites = [],
  tags = [],
  learningObjectives = [],
  subtopics = [],
  learningItems = [],
  practice = [],
  debugging = [],
  assessments = [],
  resources = [],
}) {
  const items = learningItems.length > 0 
    ? learningItems 
    : subtopics.map((st, i) => ({
        id: `item-${itemIdCounter++}`,
        title: typeof st === 'string' ? st : st.title,
        type: typeof st === 'object' && st.type ? st.type : (i % 2 === 0 ? 'concept' : 'implementation'),
      }));

  return {
    id,
    order,
    title,
    description,
    priority,
    estimatedHours,
    prerequisites,
    tags,
    learningObjectives: learningObjectives.length > 0 ? learningObjectives : [
      `Master the core architectural and implementation principles of ${title}`,
      `Apply ${title} to solve practical real-world engineering problems`,
      `Systematically debug errors and edge cases related to ${title}`,
      `Explain and defend ${title} trade-offs and design choices in technical interviews`
    ],
    learningItems: items,
    practice: practice.map((p, idx) => ({
      id: p.id || `prac-${pracIdCounter++}`,
      title: p.title,
      description: p.description,
      difficulty: p.difficulty || (idx === 0 ? 'easy' : idx === 1 ? 'medium' : 'hard'),
      type: p.type || 'coding',
      aiMode: p.aiMode || (idx === 0 ? 'ai-allowed' : idx === 1 ? 'ai-restricted' : 'no-ai'),
    })),
    debugging: debugging.map((d, idx) => ({
      id: d.id || `dbg-${dbgIdCounter++}`,
      title: d.title,
      description: d.description,
      errorType: d.errorType || (idx % 2 === 0 ? 'runtime' : 'logic'),
      difficulty: d.difficulty || 'medium',
      status: 'unsolved',
    })),
    assessments: assessments.map((a, idx) => ({
      id: a.id || `assess-${assessIdCounter++}`,
      question: a.question,
      difficulty: a.difficulty || 'medium',
      type: a.type || 'interview',
    })),
    resources: resources.map((r) => ({
      id: r.id || `res-${resIdCounter++}`,
      title: r.title,
      url: r.url || 'https://docs.python.org/3/',
      type: r.type || 'Documentation',
    })),
  };
}

// ----------------------------------------------------
// LEVEL 0: ENGINEERING FOUNDATION
// ----------------------------------------------------
levels.push({
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
          learningObjectives: [
            'Explain how the PATH variable is evaluated in sequential order',
            'Set, export, and persist environment variables across sessions',
            'Diagnose command not found and permission denied errors for executables'
          ],
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
          ],
          debugging: [
            { title: 'Fix "command not found: python" PATH Error', description: 'Diagnose and fix broken PATH order when multiple Python or Node installations collide.', errorType: 'runtime' }
          ],
          assessments: [
            { question: 'What happens when you type a command in the terminal? How does the OS use the PATH variable to locate the binary?' }
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
          ],
          debugging: [
            { title: 'Fix Stderr Silently Discarded or Leaking into Output File', description: 'Diagnose why a build script failed silently because error output was not captured properly.', errorType: 'syntax' }
          ],
          assessments: [
            { question: 'Explain the exact difference between `cmd > file 2>&1` and `cmd 2>&1 > file` in shell redirection.' }
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
          ],
          practice: [
            { title: 'Interactive Debugging Session', description: 'Set up VS Code debugger on a multi-function recursive application, step through execution frames, and evaluate variable mutations at each step.' }
          ]
        }),
        createTopic({
          id: 'l0-errors-and-root-cause-analysis',
          order: 2,
          title: 'Error Taxonomies, Stack Traces & Root Cause Analysis',
          description: 'Syntax errors, runtime exceptions, logical bugs, reading stack traces bottom-up, reproducing bugs, and regression testing.',
          priority: 'core',
          estimatedHours: 5,
          tags: ['errors', 'debugging', 'troubleshooting'],
          subtopics: [
            'Error categories: Syntax errors (parse time) vs Runtime errors (exceptions) vs Logical bugs (silent incorrect behavior)',
            'Anatomy of a Stack Trace: exception type, error message, file paths, line numbers, and frame hierarchy',
            'Reading stack traces bottom-up to find first line of user code',
            'Systematic 6-step debugging workflow: Reproduce -> Isolate -> Hypothesize -> Inspect -> Fix -> Regression Test',
            'Minimal Reproducible Example (MRE) creation techniques',
            'Defensive programming: assertions, input validation, and informative error logging'
          ],
          practice: [
            { title: 'Mini-Bug Hunt & Fix', description: 'Take 3 intentionally broken Python scripts (IndexError, TypeError, silent mutation logic bug), diagnose root causes using stack traces, and implement robust fixes.' }
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
});

console.log('L0 completed.');
