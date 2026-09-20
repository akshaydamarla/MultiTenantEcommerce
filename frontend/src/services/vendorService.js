import api from './api'

export async function getMyVendor() {
  const response = await api.get('/vendors/me')

  return response.data
}