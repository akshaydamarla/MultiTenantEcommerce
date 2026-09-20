import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

function getToken() {
  return localStorage.getItem('token')
}

function addAuthorizationHeader(config) {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

api.interceptors.request.use(addAuthorizationHeader)

export default api