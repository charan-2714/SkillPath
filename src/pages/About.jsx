// src/pages/About.jsx
import React from 'react';
import { Route, Lock, Database, Download, CloudOff, RefreshCw, Cpu, Layers } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';

const TECH_STACK = [
  { name: 'React 19', desc: 'Modern component architecture' },
  { name: 'Vite', desc: 'Ultra-fast build & development tool' },
  { name: 'React Router v7', desc: 'Declarative client-side routing' },
  { name: 'Tailwind CSS', desc: 'Utility-first responsive design' },
  { name: 'Recharts', desc: 'Progress & skill visualizations' },
  { name: 'Lucide React', desc: 'Crisp SVG iconography' },
  { name: 'Storage Service', desc: 'Centralized abstracted browser persistence' },
];

export default function About() {
  return (
    <AppLayout pageTitle="About SkillPath">
      <PageHeader
        title="About SkillPath"
        subtitle="Universal Learning Journey Builder & Skill Tracker."
      />

      <div className="max-w-3xl mx-auto space-y-5">
        {/* App Concept Card */}
        <div className="card p-6 space-y-3">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
              <Route className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 dark:text-gray-100">
                SkillPath v1.0
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Build your learning journey. Track your progress. Master your skills.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            SkillPath is a modern personal learning management platform that empowers you to create,
            structure, and track custom learning roadmaps for any discipline — from AI/ML Engineering
            and Full Stack Development to Placement Preparation, DSA, and System Design.
          </p>
        </div>

        {/* Honest Transparency: Browser Storage */}
        <div className="card p-5 border-l-4 border-l-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              100% Local Browser Storage & Privacy
            </h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            SkillPath stores your learning data locally in your browser in this version.
            There are no accounts, passwords, or servers holding your notes.
            Your progress stays exclusively on your machine.
          </p>
          <div className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold pt-1">
            💡 Need to switch devices? Use the <strong>Export / Import</strong> feature to move your backup JSON file seamlessly.
          </div>
        </div>

        {/* Hierarchy Architecture */}
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Universal Hierarchy
            </h3>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl font-mono text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            Journey → Level → Subject → Topic → (Learning Checklist + Practice + Assessments + Resources + Notes)
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400">
            This generic architecture allows technical roadmaps (with coding challenges, debugging, and
            interview questions) and creative/language roadmaps (with custom skill dimensions like
            Speaking, Listening, Optics) to thrive side-by-side.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Technology Stack
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800"
              >
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  {tech.name}
                </div>
                <div className="text-[11px] text-gray-500">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 py-4">
          SkillPath v1.0 · Designed for intentional learners
        </div>
      </div>
    </AppLayout>
  );
}
