import { useState, useEffect } from 'react';
import api from '../api/api.js';

export default function ProjectTracker() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState('');

  // Load projects from backend
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert('Unable to load projects');
    }
  };

  // Add Project
  const addProject = async () => {
    if (!title.trim()) return;

    try {
      const newProject = {
        title: title.trim(),
        desc: desc.trim(),
        deadline,
        status: "Pending"
      };

      await api.post('/projects', newProject);

      await loadProjects();

      setTitle('');
      setDesc('');
      setDeadline('');

    } catch (err) {
      console.error(err);
      alert('Unable to add project');
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/projects/${id}`, { status });
      await loadProjects();
    } catch (err) {
      console.error(err);
      alert('Unable to update status');
    }
  };

  // Delete Project
  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      await loadProjects();
    } catch (err) {
      console.error(err);
      alert('Unable to delete project');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Project Tracker</h1>

      {/* Input Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-2 rounded"
          placeholder="Project Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 mb-2 rounded"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button
          onClick={addProject}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No projects added yet.
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-50 p-4 rounded shadow"
            >
              <h2 className="text-lg font-semibold">
                {project.title}
              </h2>

              <p className="text-sm text-gray-600">
                {project.desc}
              </p>

              <p className="text-sm mt-1">
                📅 Deadline: {project.deadline || "Not set"}
              </p>

              <p className="mt-2">
                Status:
                <span className="font-bold ml-2">
                  {project.status}
                </span>
              </p>

              <div className="mt-3 flex gap-2 flex-wrap">
                <button
                  onClick={() => updateStatus(project.id, "Pending")}
                  className="px-2 py-1 text-sm bg-yellow-400 rounded"
                >
                  Pending
                </button>

                <button
                  onClick={() => updateStatus(project.id, "In Progress")}
                  className="px-2 py-1 text-sm bg-blue-400 text-white rounded"
                >
                  In Progress
                </button>

                <button
                  onClick={() => updateStatus(project.id, "Completed")}
                  className="px-2 py-1 text-sm bg-green-500 text-white rounded"
                >
                  Completed
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}