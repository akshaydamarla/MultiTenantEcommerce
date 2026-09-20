import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../services/productService'

function useProductState() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  return {
    products,
    setProducts,
    loading,
    setLoading,
    error,
    setError,
  }
}

function useProductLoader(setProducts, setLoading, setError) {
  return useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getProducts()

      setProducts(data)
    } catch (error) {
      console.error('Unable to load products:', error)

      setError(
        error.response?.data?.message ||
          'Unable to load products. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }, [setProducts, setLoading, setError])
}

export function useProducts() {
  const {
    products,
    setProducts,
    loading,
    setLoading,
    error,
    setError,
  } = useProductState()

  const loadProducts = useProductLoader(
    setProducts,
    setLoading,
    setError,
  )

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return {
    products,
    loading,
    error,
    reloadProducts: loadProducts,
  }
}