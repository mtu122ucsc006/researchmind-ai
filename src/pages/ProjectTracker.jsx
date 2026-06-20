import { useEffect, useState } from 'react'
import api from '../api.js'
import { getToken } from '../utils/storage.js'

export default function ProjectTracker() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const token = getToken()
      const response = await api.get('/projects', { headers: { Authorization: `Bearer ${token}` } })
      setProjects(response.data)
    } catch (error) {
      console.error(error)
      alert('Unable to load projects.')
    }
  }

  const saveProject = async () => {
    if (!title.trim()) {
      alert('Enter a project title.')
      return
    }

    try {
      const token = getToken()
      await api.post(
        '/projects',
        { title: title.trim(), deadline: deadline || 'No deadline' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTitle('')
      setDeadline('')
      loadProjects()
    } catch (error) {
      console.error(error)
      alert('Unable to save project.')
    }
  }

  const toggleCompleted = async (project) => {
    try {
      const token = getToken()
      await api.put(
        `/projects/${project.id}`,
        { completed: !project.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      loadProjects()
    } catch (error) {
      console.error(error)
      alert('Unable to update project.')
    }
  }

  const deleteProject = async (id) => {
    try {
      const token = getToken()
      await api.delete(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      loadProjects()
    } catch (error) {
      console.error(error)
      alert('Unable to delete project.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-brand-700">Project Tracker</h1>
        <p className="mt-2 text-slate-600">Create, monitor, and complete your research milestones.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            placeholder="Project title"
          />
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="rounded-3xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none"
            type="date"
            placeholder="Deadline"
          />
          <button onClick={saveProject} className="rounded-3xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">
            Add Project
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.length === 0 && (
          <div className="rounded-3xl bg-slate-100 p-6 text-slate-600">No projects yet. Add one to start tracking progress.</div>
        )}
        {projects.map((project) => (
          <div key={project.id} className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>
                <p className="mt-2 text-sm text-slate-500">Deadline: {project.deadline || 'No deadline'}</p>
                <p className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-medium ${project.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                  {project.completed ? 'Completed' : 'In progress'}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleCompleted(project)}
                  className="rounded-full bg-brand-100 px-3 py-2 text-brand-700 hover:bg-brand-200"
                >
                  {project.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="rounded-full bg-slate-100 px-3 py-2 text-red-600 hover:bg-slate-200"
                >
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
