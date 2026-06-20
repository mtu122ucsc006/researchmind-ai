import { useState } from 'react'
import api from '../api.js'
import { getToken } from '../utils/storage.js'

export default function PaperGenerator() {
  const [topic, setTopic] = useState('')
  const [paper, setPaper] = useState(null)

  const generatePaper = async () => {
    if (!topic.trim()) {
      alert('Enter a research topic first.')
      return
    }

    try {
      const token = getToken()
      const response = await api.post(
        '/ai/generate-paper',
        { topic: topic.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setPaper(response.data)
    } catch (error) {
      alert('Unable to generate paper.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-brand-700">Research Paper Generator</h1>
        <p className="mt-2 text-slate-600">Generate a structured research outline from your topic.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            placeholder="Enter paper topic"
          />
          <button onClick={generatePaper} className="rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">
            Generate Paper
          </button>
        </div>
      </div>
      {paper && (
        <div className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-brand-700">{paper.title}</h2>
          <div className="mt-4 space-y-4">
            <section>
              <h3 className="font-semibold">Abstract</h3>
              <p className="text-slate-600">{paper.abstract}</p>
            </section>
            <section>
              <h3 className="font-semibold">Introduction</h3>
              <p className="text-slate-600">{paper.introduction}</p>
            </section>
            <section>
              <h3 className="font-semibold">Conclusion</h3>
              <p className="text-slate-600">{paper.conclusion}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
