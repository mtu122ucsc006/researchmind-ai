import { useState } from 'react'
import api from '../api.js'
import { getToken } from '../utils/storage.js'

export default function CitationGenerator() {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [result, setResult] = useState(null)

  const generateCitation = async () => {
    if (!author.trim() || !title.trim() || !year.trim()) {
      alert('Please enter author, title, and year.')
      return
    }

    try {
      const token = getToken()
      const response = await api.post(
        '/ai/citation',
        { author: author.trim(), title: title.trim(), year: year.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResult(response.data)
    } catch (error) {
      alert('Unable to generate citation.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-brand-700">Citation Generator</h1>
        <p className="mt-2 text-slate-600">Create APA, MLA, and IEEE citations instantly.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            placeholder="Author"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            placeholder="Title"
          />
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            placeholder="Year"
          />
        </div>
        <button onClick={generateCitation} className="mt-6 rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">
          Generate Citation
        </button>
      </div>
      {result && (
        <div className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-brand-700">Generated Citations</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold">APA</h3>
              <p className="text-slate-600">{result.apa}</p>
            </div>
            <div>
              <h3 className="font-semibold">MLA</h3>
              <p className="text-slate-600">{result.mla}</p>
            </div>
            <div>
              <h3 className="font-semibold">IEEE</h3>
              <p className="text-slate-600">{result.ieee}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
