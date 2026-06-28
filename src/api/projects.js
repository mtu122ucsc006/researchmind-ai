import api from './api'

// 📌 Get all projects
export const getProjects = async () => {
  try {
    const res = await api.get('/projects')
    return res.data
  } catch (error) {
    console.error('Get Projects Error:', error)
    return []
  }
}

// 📌 Create project
export const createProject = async (project) => {
  try {
    const res = await api.post('/projects', project)
    return res.data
  } catch (error) {
    console.error('Create Project Error:', error)
    return null
  }
}

// 📌 Update project
export const updateProject = async (id, data) => {
  try {
    const res = await api.put(`/projects/${id}`, data)
    return res.data
  } catch (error) {
    console.error('Update Project Error:', error)
    return null
  }
}

// 📌 Delete project
export const deleteProject = async (id) => {
  try {
    const res = await api.delete(`/projects/${id}`)
    return res.data
  } catch (error) {
    console.error('Delete Project Error:', error)
    return null
  }
}