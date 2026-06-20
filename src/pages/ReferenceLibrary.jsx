import { useEffect, useState } from 'react'
import api from '../api.js'
import { getToken } from '../utils/storage.js'

export default function ReferenceLibrary() {
  const [references, setReferences] = useState([])
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    loadReferences()
  }, [])

  const loadReferences = async () => {
    try {
      const token = getToken()
      const response = await api.get('/references', { headers: { Authorization: `Bearer ${token}` } })
      setReferences(response.data)
    } catch (error) {
      console.error(error)
      alert('Unable to load references.')
    }
  }

  const saveReference = async () => {
    if (!author.trim() || !title.trim() || !year.trim()) {
      alert('Enter author, title, and year.')
      return
    }

    try {
      const token = getToken()
      await api.post(
        '/references',
        { author: author.trim(), title: title.trim(), year: year.trim(), notes: notes.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAuthor('')
      setTitle('')
      setYear('')
      setNotes('')
      loadReferences()
    } catch (error) {
      console.error(error)
      alert('Unable to save reference.')
    }
  }

  const deleteReference = async (id) => {
    try {
      const token = getToken()
      await api.delete(`/references/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      loadReferences()
    } catch (error) {
      console.error(error)
      alert('Unable to delete reference.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-brand-700">Reference Library</h1>
        <p className="mt-2 text-slate-600">Save your academic references and quick notes in one place.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
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
          <button onClick={saveReference} className="rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">
            Save Reference
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-4 w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
          rows="3"
          placeholder="Add a note for this reference (optional)"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {references.length === 0 && (
          <div className="rounded-3xl bg-slate-100 p-6 text-slate-600">No saved references yet. Add one to build your library.</div>
        )}
        {references.map((reference) => (
          <div key={reference.id} className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{reference.title}</h2>
                <p className="mt-2 text-sm text-slate-500">{reference.author} · {reference.year}</p>
                {reference.notes && <p className="mt-4 text-slate-600">{reference.notes}</p>}
              </div>
              <button
                onClick={() => deleteReference(reference.id)}
                className="rounded-full bg-slate-100 px-3 py-2 text-red-600 hover:bg-slate-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
