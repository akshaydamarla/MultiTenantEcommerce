import api from './api'

export async function getProducts() {
  const response = await api.get('/products')
  return response.data
}

export async function getProductById(productId) {
  const response = await api.get(`/products/${productId}`)
  return response.data
}

export async function createProduct(product) {
  const response = await api.post('/products', product)
  return response.data
}

export async function updateProduct(productId, product) {
  const response = await api.put(`/products/${productId}`, product)
  return response.data
}

export async function deleteProduct(productId) {
  const response = await api.delete(`/products/${productId}`)
  return response.data
}