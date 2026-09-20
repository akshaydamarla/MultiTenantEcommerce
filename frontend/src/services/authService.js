import api from './api'

export async function loginUser(credentials) {
  const response = await api.post('/auth/login', credentials)

  return response.data
}

export function saveAuthData(authResponse) {
  localStorage.setItem('token', authResponse.token)
  localStorage.setItem('role', authResponse.role)
  localStorage.setItem('name', authResponse.name)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getRole() {
  return localStorage.getItem('role')
}

export function getUserName() {
  return localStorage.getItem('name')
}

export async function registerUser(userData) {
  const response = await api.post('/auth/register', userData)

  return response.data
}

export function logoutUser() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('name')
}