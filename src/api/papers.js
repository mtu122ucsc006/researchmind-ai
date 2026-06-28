import api from './api'

// 📌 Get all papers
export const getPapers = async () => {
  try {
    const res = await api.get('/papers')
    return res.data
  } catch (error) {
    console.error('Get Papers Error:', error)
    return []
  }
}

// 📌 Create new paper
export const createPaper = async (paper) => {
  try {
    const res = await api.post('/papers', paper)
    return res.data
  } catch (error) {
    console.error('Create Paper Error:', error)
    return null
  }
}

// 📌 Update paper
export const updatePaper = async (id, updatedData) => {
  try {
    const res = await api.put(`/papers/${id}`, updatedData)
    return res.data
  } catch (error) {
    console.error('Update Paper Error:', error)
    return null
  }
}

// 📌 Delete paper
export const deletePaper = async (id) => {
  try {
    const res = await api.delete(`/papers/${id}`)
    return res.data
  } catch (error) {
    console.error('Delete Paper Error:', error)
    return null
  }
}