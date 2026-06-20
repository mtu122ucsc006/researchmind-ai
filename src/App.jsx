// FILE: src/App.jsx

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ResearchAssistant from './pages/ResearchAssistant.jsx'
import PaperGenerator from './pages/PaperGenerator.jsx'
import Search from './pages/Search.jsx'
import CitationGenerator from './pages/CitationGenerator.jsx'
import DocumentUpload from './pages/DocumentUpload.jsx'
import Notes from './pages/Notes.jsx'
import LiteratureReview from './pages/LiteratureReview.jsx'
import ProjectTracker from './pages/ProjectTracker.jsx'
import ReferenceLibrary from './pages/ReferenceLibrary.jsx'
import PasswordReset from './pages/PasswordReset.jsx'
import Profile from './pages/Profile.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import { getUser, logout } from './utils/storage.js'

function App() {
  const [user, setUser] = useState(() => getUser())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleStorage = () => setUser(getUser())
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    setMobileMenuOpen(false)
    navigate('/login')
  }

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const isAuthenticated = !!user

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onMenuToggle={() => setMobileMenuOpen((open) => !open)}
      />
      <div className="flex flex-col md:flex-row">
        {isAuthenticated && (
          <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        )}
        <main
          className="flex-1 p-4 md:p-6"
          onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
        >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/reset" element={<PasswordReset />} />

            <Route
              path="/login"
              element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />}
            />
            <Route
              path="/signup"
              element={!isAuthenticated ? <Signup onSignup={handleLogin} /> : <Navigate to="/dashboard" replace />}
            />

            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" replace />} />
            <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" replace />} />
            <Route path="/assistant" element={isAuthenticated ? <ResearchAssistant /> : <Navigate to="/login" replace />} />
            <Route path="/generator" element={isAuthenticated ? <PaperGenerator /> : <Navigate to="/login" replace />} />
            <Route path="/citation" element={isAuthenticated ? <CitationGenerator /> : <Navigate to="/login" replace />} />
            <Route path="/upload" element={isAuthenticated ? <DocumentUpload /> : <Navigate to="/login" replace />} />
            <Route path="/notes" element={isAuthenticated ? <Notes /> : <Navigate to="/login" replace />} />
            <Route path="/literature" element={isAuthenticated ? <LiteratureReview /> : <Navigate to="/login" replace />} />
            <Route path="/projects" element={isAuthenticated ? <ProjectTracker /> : <Navigate to="/login" replace />} />
            <Route path="/references" element={isAuthenticated ? <ReferenceLibrary /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={isAuthenticated ? <Profile onUpdate={setUser} /> : <Navigate to="/login" replace />} />

            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App