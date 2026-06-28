import { api } from './api'

// Get all references
export const getReferences = (token) =>
  api.get('/references', {
    headers: { Authorization: `Bearer ${token}` }
  })

// Add reference
export const addReference = (data, token) =>
  api.post('/references', data, {
    headers: { Authorization: `Bearer ${token}` }
  })

// Delete reference
export const deleteReference = (id, token) =>
  api.delete(`/references/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })