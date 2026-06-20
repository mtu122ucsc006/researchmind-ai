import { useState } from 'react'
import api from '../api.js'
import { getToken } from '../utils/storage.js'

export default function LiteratureReview() {
  const [topic, setTopic] = useState('')
  const [summary, setSummary] = useState('')

  const createSummary = async () => {
    if (!topic.trim()) {
      alert('Enter a topic to get a literature summary.')
      return
    }

    try {
      const token = getToken()
      const response = await api.post(
        '/ai/literature',
        { topic: topic.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSummary(response.data.summary)
    } catch (error) {
      alert('Unable to create summary.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-brand-700">Literature Review Helper</h1>
        <p className="mt-2 text-slate-600">Generate a sample review summary for your research topic.</p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            placeholder="Research topic"
          />
          <button onClick={createSummary} className="rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">
            Generate Summary
          </button>
        </div>
      </div>
      {summary && (
        <div className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-900">Review Overview</h2>
          <p className="mt-4 text-slate-600">{summary}</p>
        </div>
      )}
    </div>
  )
}
