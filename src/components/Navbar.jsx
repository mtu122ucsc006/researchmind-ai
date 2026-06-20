import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getUser, logout } from '../utils/storage.js'

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    if (onLogout) onLogout()
    navigate('/login')
  }
  const currentUser = user || getUser()

  return (
    <nav style={{
      padding: '10px 20px',
      background: '#1e1e2e',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
        ResearchMind AI
      </Link>

      {currentUser && (
        <>
          <Link to="/upload" style={{ color: '#aaa', textDecoration: 'none' }}>Upload</Link>
          <Link to="/assistant" style={{ color: '#aaa', textDecoration: 'none' }}>AI Assistant</Link>
          <Link to="/dashboard" style={{ color: '#aaa', textDecoration: 'none' }}>Dashboard</Link>
        </>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {currentUser ? (
          <>
            <span style={{ color: '#aaa', fontSize: '14px' }}>
              {currentUser.name || currentUser.email}
            </span>
            <Link to="/profile" style={{
              padding: '6px 16px',
              borderRadius: '6px',
              background: '#2a2a3e',
              color: 'white',
              textDecoration: 'none',
              border: '1px solid #555'
            }}>
              Profile
            </Link>
            <button onClick={handleLogout} style={{
              padding: '6px 16px',
              borderRadius: '6px',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              padding: '6px 16px',
              borderRadius: '6px',
              background: '#6c63ff',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              padding: '6px 16px',
              borderRadius: '6px',
              background: '#2a2a3e',
              color: 'white',
              textDecoration: 'none',
              border: '1px solid #555'
            }}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}