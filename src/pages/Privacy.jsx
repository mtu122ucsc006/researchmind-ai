import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-3xl bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-semibold text-brand-700">Privacy Policy</h1>
      <p className="text-slate-600">
        ResearchMind AI respects your privacy. This app stores user data locally and does not share personal information without consent.
      </p>
      <p className="text-slate-600">
        If you are using the backend, authentication and session data are managed through secure tokens.
      </p>
      <Link to="/" className="inline-flex rounded-full bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Back to Search</Link>
    </div>
  )
}
