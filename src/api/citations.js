import api from './api'

// 📌 Get all citations
export const getCitations = async () => {
  try {
    const res = await api.get('/citations')
    return res.data
  } catch (error) {
    console.error('Get Citations Error:', error)
    return []
  }
}

// 📌 Create citation
export const createCitation = async (citation) => {
  try {
    const res = await api.post('/citations', citation)
    return res.data
  } catch (error) {
    console.error('Create Citation Error:', error)
    return null
  }
}

// 📌 Update citation
export const updateCitation = async (id, data) => {
  try {
    const res = await api.put(`/citations/${id}`, data)
    return res.data
  } catch (error) {
    console.error('Update Citation Error:', error)
    return null
  }
}

// 📌 Delete citation
export const deleteCitation = async (id) => {
  try {
    const res = await api.delete(`/citations/${id}`)
    return res.data
  } catch (error) {
    console.error('Delete Citation Error:', error)
    return null
  }
}