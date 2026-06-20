import { useEffect, useState } from 'react'
import api from '../api.js'
import { getToken } from '../utils/storage.js'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = async () => {
    try {
      const token = getToken()
      const response = await api.get('/notes', { headers: { Authorization: `Bearer ${token}` } })
      setNotes(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please add both title and content.')
      return
    }

    try {
      const token = getToken()
      if (editingId) {
        await api.put(
          `/notes/${editingId}`,
          { title: title.trim(), content: content.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await api.post(
          '/notes',
          { title: title.trim(), content: content.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
      setTitle('')
      setContent('')
      setEditingId(null)
      loadNotes()
    } catch (error) {
      alert('Unable to save note.')
    }
  }

  const editNote = (note) => {
    setEditingId(note.id)
    setTitle(note.title)
    setContent(note.content)
  }

  const deleteNote = async (id) => {
    try {
      const token = getToken()
      await api.delete(`/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      loadNotes()
    } catch (error) {
      alert('Unable to delete note.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-brand-700">Research Notes</h1>
        <p className="mt-2 text-slate-600">Save and manage notes for your academic research.</p>
        <div className="mt-6 space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            placeholder="Note title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            rows="4"
            placeholder="Write your note here"
          />
          <button onClick={saveNote} className="rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">
            {editingId ? 'Update Note' : 'Add Note'}
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <div key={note.id} className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{note.title}</h2>
                <p className="mt-2 text-slate-600">{note.content}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => editNote(note)} className="rounded-full bg-brand-100 px-3 py-2 text-brand-700 hover:bg-brand-200">
                  Edit
                </button>
                <button onClick={() => deleteNote(note.id)} className="rounded-full bg-slate-100 px-3 py-2 text-red-600 hover:bg-slate-200">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
