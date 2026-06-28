import { useState, useEffect } from 'react'
import api from "../api/api.js"
import { getToken } from '../utils/storage.js'

export default function CitationGenerator() {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [result, setResult] = useState(null)

  // Load saved citation
  useEffect(() => {
    const saved = localStorage.getItem("citations")
    if (saved) {
      setResult(JSON.parse(saved))
    }
  }, [])

  // Save latest citation
  useEffect(() => {
    if (result) {
      localStorage.setItem("citations", JSON.stringify(result))
    }
  }, [result])

  const generateCitation = async () => {
    if (!author.trim() || !title.trim() || !year.trim()) {
      alert('Please enter author, title, and year.')
      return
    }

    try {
      const token = getToken()

      const response = await api.post(
        '/ai/citation',
        {
          author: author.trim(),
          title: title.trim(),
          year: year.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setResult(response.data)

    } catch (error) {
      console.error(error)
      alert('Unable to generate citation.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">

        <h1 className="text-2xl font-semibold text-brand-700">
          Citation Generator
        </h1>

        <p className="mt-2 text-slate-600">
          Create APA, MLA, and IEEE citations instantly.
        </p>

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

        <button
          onClick={generateCitation}
          className="mt-6 rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700"
        >
          Generate Citation
        </button>

      </div>

      {result && (

        <div className="rounded-3xl bg-white p-6 shadow-xl">

          <h2 className="text-xl font-semibold text-brand-700">
            Generated Citation
          </h2>

          <div className="mt-4 rounded-xl bg-slate-100 p-4 whitespace-pre-wrap text-slate-700">
            {result.citation}
          </div>

        </div>

      )}

    </div>
  )
}