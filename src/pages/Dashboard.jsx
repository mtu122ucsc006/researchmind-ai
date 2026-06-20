import { Link } from 'react-router-dom'

export default function Dashboard({ user }) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-brand-700">Welcome, {user?.name || 'Researcher'}</h1>
          <p className="mt-2 text-slate-600">Your AI research assistant dashboard is ready.</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3976/3976625.png"
          alt="Researcher"
          className="h-28 hidden md:block"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-xl flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png" alt="project" className="h-10 w-10"/>
          <div>
            <p className="text-sm text-slate-500">Active Project</p>
            <h2 className="mt-2 text-xl font-semibold">Thesis Literature Review</h2>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-xl flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2541/2541988.png" alt="notes" className="h-10 w-10"/>
          <div>
            <p className="text-sm text-slate-500">Notes Stored</p>
            <h2 className="mt-2 text-xl font-semibold">12 Notes</h2>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-xl flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="ai" className="h-10 w-10"/>
          <div>
            <p className="text-sm text-slate-500">Recommended Today</p>
            <h2 className="mt-2 text-xl font-semibold">AI Draft Session</h2>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Link to="/assistant" className="rounded-3xl bg-brand-600 p-6 text-white shadow-xl hover:bg-brand-700 flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="AI" className="h-10 w-10"/>
          <div>
            <h3 className="text-xl font-semibold">Research Assistant</h3>
            <p className="mt-2 text-slate-100">Chat with a dummy academic assistant.</p>
          </div>
        </Link>
        <Link to="/generator" className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl hover:bg-slate-800 flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Paper" className="h-10 w-10"/>
          <div>
            <h3 className="text-xl font-semibold">Paper Generator</h3>
            <p className="mt-2 text-slate-100">Create a structured research outline.</p>
          </div>
        </Link>
        <Link to="/projects" className="rounded-3xl bg-brand-600 p-6 text-white shadow-xl hover:bg-brand-700 flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png" alt="Tracker" className="h-10 w-10"/>
          <div>
            <h3 className="text-xl font-semibold">Project Tracker</h3>
            <p className="mt-2 text-slate-100">Track tasks, deadlines, and completed milestones.</p>
          </div>
        </Link>
        <Link to="/references" className="rounded-3xl bg-slate-100 p-6 shadow-xl hover:bg-slate-50 flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2541/2541988.png" alt="References" className="h-10 w-10"/>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Reference Library</h3>
            <p className="mt-2 text-slate-600">Save academic references and quick notes.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}