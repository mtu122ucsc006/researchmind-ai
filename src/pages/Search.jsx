import { useState } from 'react'

const samplePapers = [
  {
    id: 1,
    title: 'Topic modeling for social science research',
    authors: 'A. Researcher, B. Scientist',
    year: 2021,
    abstract: 'We evaluate topic modeling approaches and provide guidance for social science use-cases.',
    source: 'Journal of Social Methods'
  },
  {
    id: 2,
    title: 'A survey of neural topic models',
    authors: 'C. Author',
    year: 2023,
    abstract: 'This survey reviews neural topic models and compares performance on standard datasets.',
    source: 'Computational Linguistics'
  },
  {
    id: 3,
    title: 'Best practices for literature review automation',
    authors: 'D. Scholar',
    year: 2022,
    abstract: 'We propose an automated pipeline for literature review and summarization.',
    source: 'Research Methods Today'
  }
]

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [expandedId, setExpandedId] = useState(null)

  function handleSearch(e) {
    e.preventDefault()
    const q = query.trim().toLowerCase()
    if (!q) {
      setResults([])
      return
    }
    const filtered = samplePapers.filter(p => (p.title + p.abstract + p.authors).toLowerCase().includes(q))
    setResults(filtered)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold text-slate-900">Search research</h1>
        <form onSubmit={handleSearch} className="mt-4">
          <div className="relative">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask questions or search papers, e.g. 'topic modeling'" className="w-full rounded-full border border-slate-200 px-4 py-3 pr-36 shadow-sm focus:ring-2 focus:ring-brand-500" />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-brand-600 px-4 py-2 text-white">Search</button>
          </div>
        </form>

        <div className="mt-4 text-sm text-slate-600">Results show matching sample papers (mock data). Click "Summarize" for a quick extractive summary.</div>
      </div>

      <div className="grid gap-4">
        {results.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow">No results — try searching for "topic modeling" or "literature review".</div>
        ) : results.map(r => (
          <article key={r.id} className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">{r.title}</h3>
                <div className="mt-1 text-sm text-slate-500">{r.authors} · {r.year} · {r.source}</div>
              </div>
              <div className="flex-shrink-0">
                <button onClick={() => setExpandedId(expandedId === r.id ? null : r.id)} className="rounded bg-slate-100 px-3 py-2 text-sm text-slate-700">{expandedId === r.id ? 'Hide' : 'Summarize'}</button>
              </div>
            </div>

            {expandedId === r.id && (
              <div className="mt-4 border-t pt-4 text-slate-700">
                <h4 className="font-semibold">Quick summary</h4>
                <p className="mt-2 text-sm">{r.abstract}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" className="text-sm text-brand-600">View PDF</button>
                  <button type="button" className="text-sm text-slate-500">Save</button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
