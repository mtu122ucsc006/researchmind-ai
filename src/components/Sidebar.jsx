import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Dashboard', path: '/dashboard', icon: 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png' },
  { label: 'Research Assistant', path: '/assistant', icon: 'https://cdn-icons-png.flaticon.com/512/4712/4712109.png' },
  { label: 'Paper Generator', path: '/generator', icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png' },
  { label: 'Citation Generator', path: '/citation', icon: 'https://cdn-icons-png.flaticon.com/512/2541/2541988.png' },
  { label: 'Plagiarism Checker', path: '/plagiarism', icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
  { label: 'Document Upload', path: '/upload', icon: 'https://cdn-icons-png.flaticon.com/512/724/724933.png' },
  { label: 'Project Tracker', path: '/projects', icon: 'https://cdn-icons-png.flaticon.com/512/2436/2436874.png' },
  { label: 'Reference Library', path: '/references', icon: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png' },
  { label: 'Profile', path: '/profile', icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r bg-white p-4 md:block">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-brand-700">Quick Navigation</h2>
          <p className="text-sm text-slate-500">Academic research tools</p>
        </div>
        <nav className="space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                  isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <img src={item.icon} alt={item.label} className="h-5 w-5 object-contain" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={`fixed inset-0 z-20 bg-slate-950/40 transition-opacity ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`} onClick={onClose} />
      <aside className={`fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto border-r bg-white p-4 shadow-2xl transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-brand-700">Menu</h2>
            <p className="text-sm text-slate-500">Tap to navigate</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200" aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium ${
                  isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <img src={item.icon} alt={item.label} className="h-5 w-5 object-contain" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}