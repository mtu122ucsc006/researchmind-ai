import { Link } from 'react-router-dom'

const features = [
  { title: 'Ask research questions', description: 'Instant answers and literature pointers using a local assistant.' },
  { title: 'Generate paper sections', description: 'Create well-structured drafts for abstracts, methods, and discussions.' },
  { title: 'Smart search', description: 'Query your uploads and notes with an Elicit-style search box.' },
  { title: 'Reference manager', description: 'Save citations and export formatted references.' },
  { title: 'Collaborative notes', description: 'Organize project notes and track tasks.' }
]

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-gradient-to-r from-brand-600 to-sky-600 px-6 py-14 text-white shadow-xl">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold sm:text-5xl">ResearchMind — fast, focused research</h1>
          <p className="mt-4 max-w-3xl text-lg text-brand-100">
            Combine Typeset-style paper-first workflows with Elicit-style search to accelerate literature review and drafting.
          </p>

          <div className="mt-8">
            <form className="mx-auto max-w-3xl">
              <label htmlFor="query" className="sr-only">Search research</label>
              <div className="relative">
                <input id="query" name="query" placeholder='Search papers, notes, or ask a question (e.g. "best methods for topic modeling")' className="w-full rounded-full border border-white/30 bg-white/10 py-3 pl-4 pr-36 text-white placeholder-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/40" />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white px-5 py-2 text-brand-700 font-semibold">Search</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-white/80">
                <span>Try: "systematic review on X"</span>
                <span>•</span>
                <span>"summarize latest methods"</span>
                <span>•</span>
                <span>"generate intro for topic Y"</span>
              </div>
            </form>
          </div>

          <div className="mt-8 flex gap-3">
            <Link to="/signup" className="rounded-full bg-white px-6 py-3 text-brand-700 shadow-lg">Get Started</Link>
            <Link to="/login" className="rounded-full border border-white px-6 py-3 text-white hover:bg-white/10">Login</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-slate-600">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-semibold text-brand-700">How it works</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="p-4">
              <h4 className="font-semibold">1. Search or ask</h4>
              <p className="mt-2 text-slate-600">Type queries like Elicit to find papers, summaries, and methods.</p>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">2. Draft with templates</h4>
              <p className="mt-2 text-slate-600">Use Typeset-like templates to generate sections and citations.</p>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">3. Export & cite</h4>
              <p className="mt-2 text-slate-600">Export your paper draft and formatted references.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-semibold text-brand-700">Pricing</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border p-6 text-center">
              <h3 className="text-lg font-semibold">Free</h3>
              <p className="mt-2 text-slate-600">Basic search, notes, and local storage.</p>
            </div>
            <div className="rounded-2xl border p-6 text-center bg-brand-50">
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="mt-2 text-slate-600">Advanced drafting tools and export features.</p>
            </div>
            <div className="rounded-2xl border p-6 text-center">
              <h3 className="text-lg font-semibold">Team</h3>
              <p className="mt-2 text-slate-600">Collaborative projects and shared libraries.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="rounded-3xl bg-slate-800 p-6 text-slate-200 shadow-xl">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-2">© 2026 ResearchMind AI — Inspired by Typeset and Elicit.</p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
            <Link to="/privacy">Privacy</Link>
            <span>•</span>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
