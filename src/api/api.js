import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('researchmind_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // If FormData, remove content-type (let browser handle it)
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  return config
})

export default api