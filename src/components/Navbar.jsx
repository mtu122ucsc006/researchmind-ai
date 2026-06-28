import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../utils/storage.js'

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()

    if (setUser) {
      setUser(null)
    }

    setMenuOpen(false)
    navigate('/login', { replace: true })
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <nav
      style={{
        padding: '10px 20px',
        background: '#1e1e2e',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        position: 'relative'
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={closeMenu}
        style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '18px'
        }}
      >
        ResearchMind AI
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          marginLeft: 'auto',
          background: 'transparent',
          color: 'white',
          fontSize: '22px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ☰
      </button>

      {/* Menu */}
      <div
        style={{
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'absolute',
          top: '60px',
          left: '0',
          width: '100%',
          background: '#1e1e2e',
          padding: '10px',
          zIndex: 999
        }}
      >
        {user && (
          <>
            <Link to="/upload" onClick={closeMenu} style={{ color: '#aaa', padding: '8px 0' }}>
              Upload
            </Link>

            <Link to="/assistant" onClick={closeMenu} style={{ color: '#aaa', padding: '8px 0' }}>
              AI Assistant
            </Link>

            <Link to="/dashboard" onClick={closeMenu} style={{ color: '#aaa', padding: '8px 0' }}>
              Dashboard
            </Link>

            <span style={{ color: '#aaa', fontSize: '14px', padding: '8px 0' }}>
              {user.name || user.email}
            </span>

            <Link
              to="/profile"
              onClick={closeMenu}
              style={{
                padding: '6px 16px',
                borderRadius: '6px',
                background: '#2a2a3e',
                color: 'white',
                textDecoration: 'none',
                border: '1px solid #555',
                marginBottom: '8px'
              }}
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: '6px 16px',
                borderRadius: '6px',
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" onClick={closeMenu} style={{ color: 'white', padding: '8px 0' }}>
              Login
            </Link>

            <Link to="/signup" onClick={closeMenu} style={{ color: 'white', padding: '8px 0' }}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}