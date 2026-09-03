// src/App.jsx
// Main application router with AuthProvider, Protected Routes, Admin routes, and Recycle Bin

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { DSAProvider } from './context/DSAContext';
import { ToastProvider } from './context/ToastContext';
import { LoadingState } from './components/common/EmptyState';

// Eager-load core views
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Lazy-load secondary pages
const Journeys = lazy(() => import('./pages/Journeys'));
const JourneyDetail = lazy(() => import('./pages/JourneyDetail'));
const JourneyBuilder = lazy(() => import('./pages/JourneyBuilder'));
const TopicDetail = lazy(() => import('./pages/TopicDetail'));
const Templates = lazy(() => import('./pages/Templates'));
const PackDetail = lazy(() => import('./pages/PackDetail'));
const DSADashboard = lazy(() => import('./pages/dsa/DSADashboard'));
const DSAProblemDetail = lazy(() => import('./pages/dsa/DSAProblemDetail'));
const Practice = lazy(() => import('./pages/Practice'));
const Projects = lazy(() => import('./pages/Projects'));
const Assessments = lazy(() => import('./pages/Assessments'));
const Resources = lazy(() => import('./pages/Resources'));
const Analytics = lazy(() => import('./pages/Analytics'));
const LearningLog = lazy(() => import('./pages/LearningLog'));
const AIDependency = lazy(() => import('./pages/AIDependency'));
const RecycleBin = lazy(() => import('./pages/RecycleBin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminTemplateEditor = lazy(() => import('./pages/AdminTemplateEditor'));
const AdminRecycleBin = lazy(() => import('./pages/AdminRecycleBin'));
const Settings = lazy(() => import('./pages/Settings'));
const ExportImport = lazy(() => import('./pages/ExportImport'));
const About = lazy(() => import('./pages/About'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <LoadingState message="Loading SkillPath workspace..." />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppProvider>
          <DSAProvider>
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Auth Route */}
                  <Route path="/login" element={<Login />} />

                  {/* Protected Application Routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* DSA / Problem Solving */}
                  <Route
                    path="/dsa"
                    element={
                      <ProtectedRoute>
                        <DSADashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dsa/problems/:problemId"
                    element={
                      <ProtectedRoute>
                        <DSAProblemDetail />
                      </ProtectedRoute>
                    }
                  />

                {/* Journeys */}
                <Route
                  path="/journeys"
                  element={
                    <ProtectedRoute>
                      <Journeys />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/journeys/:journeyId"
                  element={
                    <ProtectedRoute>
                      <JourneyDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/journeys/:journeyId/manage"
                  element={
                    <ProtectedRoute>
                      <JourneyBuilder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/journeys/:journeyId/topics/:topicId"
                  element={
                    <ProtectedRoute>
                      <TopicDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/topics/:topicId"
                  element={
                    <ProtectedRoute>
                      <TopicDetail />
                    </ProtectedRoute>
                  }
                />

                {/* Master Role Templates & Learning Packs */}
                <Route
                  path="/templates"
                  element={
                    <ProtectedRoute>
                      <Templates />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/packs/:packId"
                  element={
                    <ProtectedRoute>
                      <PackDetail />
                    </ProtectedRoute>
                  }
                />

                {/* Learning Workspaces */}
                <Route
                  path="/practice"
                  element={
                    <ProtectedRoute>
                      <Practice />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/assessments"
                  element={
                    <ProtectedRoute>
                      <Assessments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/interview-prep"
                  element={
                    <ProtectedRoute>
                      <Assessments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resources"
                  element={
                    <ProtectedRoute>
                      <Resources />
                    </ProtectedRoute>
                  }
                />

                {/* Insights & Tracking */}
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/learning-log"
                  element={
                    <ProtectedRoute>
                      <LearningLog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-dependency"
                  element={
                    <ProtectedRoute>
                      <AIDependency />
                    </ProtectedRoute>
                  }
                />

                {/* Recycle Bin */}
                <Route
                  path="/recycle-bin"
                  element={
                    <ProtectedRoute>
                      <RecycleBin />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Management Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/templates"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/templates/:templateId"
                  element={
                    <ProtectedRoute>
                      <AdminTemplateEditor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/recycle-bin"
                  element={
                    <ProtectedRoute>
                      <AdminRecycleBin />
                    </ProtectedRoute>
                  }
                />

                {/* System */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/export"
                  element={
                    <ProtectedRoute>
                      <ExportImport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ProtectedRoute>
                      <About />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          </DSAProvider>
        </AppProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
