import { useState, useEffect } from 'react'
import api from "../api/api.js"
import { getToken } from '../utils/storage.js'

export default function PaperGenerator() {
  const [topic, setTopic] = useState('')
  const [paper, setPaper] = useState(null)
  const [loading, setLoading] = useState(false)

  // Load saved paper
  useEffect(() => {
    const saved = localStorage.getItem("papers")
    if (saved) {
      setPaper(JSON.parse(saved))
    }
  }, [])

  // Save generated paper
  useEffect(() => {
    if (paper) {
      localStorage.setItem("papers", JSON.stringify(paper))
    }
  }, [paper])

  const generatePaper = async () => {
    if (!topic.trim()) {
      alert('Enter a research topic first.')
      return
    }

    try {
      setLoading(true)

      const token = getToken()

      const response = await api.post(
        '/ai/generate-paper',
        { topic: topic.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setPaper(response.data.paper)

    } catch (error) {
      console.error(error)
      alert('Unable to generate paper.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      <div className="rounded-3xl bg-white p-6 shadow-xl">

        <h1 className="text-2xl font-semibold text-brand-700">
          Research Paper Generator
        </h1>

        <p className="mt-2 text-slate-600">
          Generate a structured research outline from your topic.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            placeholder="Enter paper topic"
          />

          <button
            onClick={generatePaper}
            disabled={loading}
            className="rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 disabled:bg-gray-400"
          >
            {loading ? "Generating..." : "Generate Research Paper"}
          </button>

        </div>

      </div>

      {paper && (

        <div className="rounded-3xl bg-white p-6 shadow-xl">

          <h2 className="text-2xl font-bold text-brand-700 mb-4">
            Generated Research Paper
          </h2>

          <div className="prose max-w-none whitespace-pre-wrap text-slate-700">
            {paper}
          </div>

        </div>

      )}

    </div>
  )
}