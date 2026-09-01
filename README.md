# SkillPath — Professional Learning Journey, Skill Mastery & DSA Tracker

> **Architect your learning path. Track real-time progress. Solve canonical LeetCode patterns. Master technical skills with verifiable AI independence.**

**SkillPath** is a production-grade, multi-user technical learning roadmap and skill mastery platform built with **React 19, Vite, Firebase Authentication (Google Sign-In), Cloud Firestore real-time sync, Tailwind CSS, and Recharts**.

---

## 🎯 What is SkillPath For?

SkillPath solves the chaos of self-directed engineering learning. Instead of scattered bookmarks, disjointed video playlists, and untracked LeetCode attempts, SkillPath provides a unified, structured studio for engineers to plan, execute, and verify their technical mastery:

1. **Role-Based Curriculum Roadmaps (30+ Master Templates):**
   - Jumpstart end-to-end learning journeys across **AI/ML Engineering** (38 progressive levels), **Python Automation**, **Agentic AI**, **MLOps**, **DevOps & Platform Engineering**, **Full-Stack Development**, **Cybersecurity**, **Data Engineering**, and the **SAP Enterprise Ecosystem** (17 specialized templates).
   - Deep-clone templates into independent, user-owned learning journeys that you can customize, reorder, or expand.

2. **Dedicated DSA & LeetCode Problem Solving Studio:**
   - **22-Level Algorithmic Learning Path:** From Big-O Asymptotic Analysis through Sliding Window, Trees, Graphs, Dijkstra, Topological Sort, to Multi-Pattern Dynamic Programming.
   - **61+ Curated Canonical LeetCode Problems:** Tagged by difficulty, algorithmic patterns, prerequisites, company tags (Google, Meta, Amazon, etc.), and official LeetCode URLs.
   - **Solution Notebook with Multi-Version History:** Multi-language code editor (Python, JavaScript, TypeScript, Java, C++, Go) with automated solution versioning (V1, V2, V3...) and 1-click restore.
   - **Time & Space Complexity Profiling:** Log Big-O theoretical bounds, invariants, core approaches, and mistakes/lessons learned.
   - **AI Independence Rating (0 to 5★):** Track whether problems were solved *Independently*, *With Hint*, *With AI*, *Copied Solution*, or *Unable to Solve*.
   - **Blind Reattempt Mode:** Hides previous notes and code to simulate live interview conditions and test true recall.
   - **Spaced Repetition Queue:** Built-in spaced repetition scheduler (+1d, +3d, +7d, +14d, +30d) with a dedicated overdue/upcoming revision queue.
   - **30-Minute Mock Interview Simulator:** Timed mock coding challenges that dynamically diagnose and target your weak algorithmic patterns.

3. **Contextual AI Prompt Generator (9 Modes):**
   - Generate tailored, non-spoiling prompts ready to copy into ChatGPT, Claude, or Gemini:
     1. *Learn Concept* (explains pattern invariant without giving code)
     2. *Give Me a Hint* (progressive 3-tier hints)
     3. *Review My Approach* (critiques strategy and edge cases)
     4. *Review My Code* (evaluates correctness, Big-O, and clean code)
     5. *Find My Bug* (pinpoints logical flaws with failing test cases)
     6. *Explain Optimal Approach* (industry-standard optimal solution)
     7. *Mock Interview Follow-ups* (scaling & constraint questions)
     8. *Explain Without Solution* (beginner-friendly explanation)
     9. *Compare with Optimal* (benchmark your code against gold standards)

4. **Progressive Technical Learning Contract:**
   - Enforces genuine technical mastery across every curriculum topic:
     $$\text{UNDERSTAND} \rightarrow \text{IMPLEMENT} \rightarrow \text{PRACTICE} \rightarrow \text{DEBUG} \rightarrow \text{BUILD} \rightarrow \text{ASSESS} \rightarrow \text{EXPLAIN} \rightarrow \text{INDEPENDENCE CHECK}$$

5. **Soft-Delete Recycle Bin & Full Data Portability:**
   - Non-destructive soft-delete with 1-click restore for journeys, levels, subjects, topics, and projects.
   - 100% data portability via JSON backup export and import.

6. **Admin Curriculum Management Portal (`/admin`):**
   - Protected by strict email whitelist authentication (`VITE_ADMIN_EMAILS`).
   - Visual interactive modals to add, edit, and reorganize levels, subjects, and topics with multiline subtopic editors and semantic version bumping.

---

## 🏛️ System Architecture

```
                               SkillPath
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
       Master Templates        User Data             Admin
              │                    │                    │
         JSON Files          Firebase Auth         Admin Portal
      (src/data/roles)             │             (/admin & JSON)
              │                Firestore                │
              │            (Real-time Sync)       Master Recycle
              │                    │
              └────────────────────┼────────────────────┘
                                   │
                               React UI
                                   │
      ┌────────────────────┬───────┴────────────┬───────────────────┐
      ↓                    ↓                    ↓                   ↓
  Dashboard            DSA Studio        Journey Builder        Analytics
      ↓                    ↓                    ↓                   ↓
Practice Tasks       Code Notebook          Projects          Learning Log
      ↓                    ↓                    ↓                   ↓
 Assessments         AI Prompt Gen         Debugging           Recycle Bin
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (JSX) with React Router v7 |
| **Build & Bundler** | Vite 8 (Ultra-fast HMR & static bundling) |
| **Authentication** | Firebase Authentication (Google OAuth with popup & redirect) |
| **Database & Sync** | Cloud Firestore (Real-time `onSnapshot` sync + local cache fallback) |
| **Styling & Theme** | Tailwind CSS v3 with dynamic Dark / Light mode |
| **Visualizations** | Recharts (Skill radars, activity heatmaps, difficulty bars) |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/             # ProgressBar, StatusBadge, Modal, Tabs, SearchBar, EmptyState, Breadcrumbs
│   ├── dsa/                # DSACodeEditor, DSAProblemCard, DSAAiPromptModal, DSAInterviewModal
│   ├── journeys/           # JourneyCard, CreateJourneyModal
│   └── layout/             # AppLayout, Sidebar, TopBar, MobileNav
├── context/
│   ├── AuthContext.jsx     # Google auth, admin whitelist check, & guest profiles
│   ├── AppContext.jsx      # Centralized state provider, Firestore sync & Recycle Bin
│   ├── DSAContext.jsx      # DSA tracking, version history, spaced repetition & pattern stats
│   └── ToastContext.jsx    # Toast notification system
├── data/
│   ├── dsa/
│   │   ├── dsaPatterns.js       # 21 Master algorithmic pattern taxonomies
│   │   ├── dsaProblems.js       # 61+ Canonical LeetCode problems with verified URLs
│   │   └── dsaLearningPath.js   # 22-Level structured curriculum
│   └── roles/                   # Master curriculum JSON templates
│       ├── ai-ml-engineer.json  # 38-level comprehensive AI/ML roadmap
│       ├── python-automation-developer.json
│       ├── agentic-ai-engineer.json
│       ├── mlops-engineer.json
│       ├── dsa-interview-prep.json
│       ├── sap-*.json           # 17 SAP domain templates
│       └── index.js             # Central registry & cloneJourneyFromTemplate()
├── hooks/
│   └── useJourney.js       # Journey-scoped operations, stats & soft-deletion
├── models/
│   ├── dsaSchema.js        # DSA status, AI modes, and pattern mastery calculators
│   └── journeySchema.js    # Journey schema models, factory functions & constants
├── pages/
│   ├── Login.jsx           # Dedicated Google Sign-In & guest session
│   ├── Dashboard.jsx       # Main overview & active focus
│   ├── Journeys.jsx        # Journey catalog & archive
│   ├── JourneyDetail.jsx   # Interactive roadmap tree & level accordions
│   ├── JourneyBuilder.jsx  # Hierarchy builder (/journeys/:id/manage)
│   ├── TopicDetail.jsx     # Workspace, ratings, debugging, AI check & DSA link
│   ├── Templates.jsx       # Template catalog & preview modal
│   ├── dsa/
│   │   ├── DSADashboard.jsx     # DSA Hub: Tracker, 22-Level path, analytics, revision queue
│   │   └── DSAProblemDetail.jsx # Solution notebook, version history, complexity & AI prompts
│   ├── Practice.jsx        # Practice coding challenges hub
│   ├── Projects.jsx        # Portfolio project manager
│   ├── Assessments.jsx     # Interview & assessment questions
│   ├── Resources.jsx       # Curated study resources
│   ├── Analytics.jsx       # Recharts skill distributions & weak areas
│   ├── LearningLog.jsx     # Time investment & study logs
│   ├── AIDependency.jsx    # AI reliance evaluation & metrics
│   ├── RecycleBin.jsx      # User soft-deleted items & restore
│   ├── AdminDashboard.jsx  # Admin portal & curriculum stats
│   ├── AdminTemplateEditor.jsx # Visual master template manager
│   ├── AdminRecycleBin.jsx # Master content recycle bin
│   ├── Settings.jsx        # Preferences & appearance
│   ├── ExportImport.jsx    # User backup JSON export / import
│   └── About.jsx           # Architectural transparency
├── services/
│   ├── firebase.js         # Firebase App, Auth, and Firestore init
│   ├── authService.js      # Google OAuth and user profile syncing
│   ├── firestoreService.js # Firestore real-time listeners & CRUD
│   ├── dsaService.js       # DSA progress local caching & sync
│   └── storageService.js   # Unified storage abstraction with local cache fallback
└── utils/
    └── calculations.js     # Universal progress & skill math functions
```

---

## ⚡ Setup & Installation Guide

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm:** v9.0.0 or higher (comes with Node.js)
- **Git:** Installed on your system

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd LearningPad
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory (you can copy `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and fill in your Firebase credentials and admin email:

```env
# Firebase Configuration (Create a project at https://console.firebase.google.com/)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Admin Access Whitelist (Comma-separated emails allowed to edit Master Templates)
VITE_ADMIN_EMAILS=your_email@gmail.com
```

> **Note:** If Firebase credentials are omitted, SkillPath automatically runs in **Guest / Local Storage Mode** with full offline capabilities!

### 5. Run the Local Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

### 6. Build for Production
To generate optimized production bundles:

```bash
npm run build
```

The compiled assets will be placed in the `dist/` directory ready for deployment on Vercel, Netlify, or Firebase Hosting.

---

## 🔒 Firestore Security Rules

Deploy the included `firestore.rules` file to your Firebase Firestore database:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /journeys/{journeyId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /dsaProgress/{problemId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /learningLogs/{logId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /recycleBin/{itemId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /settings/{settingId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 💾 Data Portability & Privacy

- **100% User Owned:** All your journeys, custom topics, notes, code solutions, version histories, and revision queues can be backed up as a single JSON file from **Export / Import** (`/export`).
- **Offline First:** Progress is immediately saved to browser `localStorage` and smoothly synced to Cloud Firestore whenever online.
- **No Lock-In:** Exported backups can be restored on any device or browser session.
