import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-3xl bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-semibold text-brand-700">Terms of Service</h1>
      <p className="text-slate-600">
        ResearchMind AI is provided as a research-oriented interface for note taking, paper drafting, and search assistance.
      </p>
      <p className="text-slate-600">
        By using this application, you agree to use it for academic and research purposes only.
      </p>
      <Link to="/" className="inline-flex rounded-full bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Back to Search</Link>
    </div>
  )
}
