import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('researchmind_token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  if (config.data instanceof FormData) {
    // Let Axios set the multipart boundary automatically.
    delete config.headers['Content-Type']
  }

  return config
})

export default api
