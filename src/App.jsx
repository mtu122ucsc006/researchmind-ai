import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'

import ResearchAssistant from './pages/ResearchAssistant.jsx'
import PaperGenerator from './pages/PaperGenerator.jsx'
import CitationGenerator from './pages/CitationGenerator.jsx'
import DocumentUpload from './pages/DocumentUpload.jsx'
import PlagiarismChecker from './pages/PlagiarismChecker.jsx'

import ProjectTracker from './pages/ProjectTracker.jsx'
import ReferenceLibrary from './pages/ReferenceLibrary.jsx'
import Profile from './pages/Profile.jsx'

import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'

import { getUser } from './utils/storage.js'

function App() {
  const [user, setUser] = useState(getUser())
  const isAuthenticated = !!user

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <Navbar user={user} setUser={setUser} />

      <div className="flex">

        {isAuthenticated && <Sidebar />}

        <main className="flex-1 p-4 md:p-6">

          <Routes>

            <Route
              path="/"
              element={
                isAuthenticated
                  ? <Navigate to="/dashboard" replace />
                  : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/login"
              element={<Login onLogin={setUser} />}
            />

            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />

            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/assistant"
              element={isAuthenticated ? <ResearchAssistant /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/generator"
              element={isAuthenticated ? <PaperGenerator /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/citation"
              element={isAuthenticated ? <CitationGenerator /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/upload"
              element={isAuthenticated ? <DocumentUpload /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/plagiarism"
              element={isAuthenticated ? <PlagiarismChecker /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/projects"
              element={isAuthenticated ? <ProjectTracker /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/references"
              element={isAuthenticated ? <ReferenceLibrary /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>

        </main>
      </div>
    </div>
  )
}

export default App