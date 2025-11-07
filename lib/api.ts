const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

let token: string | null = null

// Set token when user logs in
export const setAuthToken = (t: string) => {
  token = t
}

// Generic API call function
const apiCall = async (endpoint: string, method = "GET", body?: any) => {
  const headers: any = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config: any = {
    method,
    headers,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "API request failed")
  }

  return response.json()
}

// Auth APIs
export const authAPI = {
  signup: (name: string, email: string, password: string, confirmPassword: string) =>
    apiCall("/auth/signup", "POST", { name, email, password, confirmPassword }),

  login: (email: string, password: string) => apiCall("/auth/login", "POST", { email, password }),

  getProfile: () => apiCall("/auth/me", "GET"),

  updateProfile: (data: any) => apiCall("/auth/me", "PUT", data),
}

// Product APIs
export const productAPI = {
  getAll: (page = 1, limit = 12) => apiCall(`/products?page=${page}&limit=${limit}`, "GET"),

  getById: (id: string) => apiCall(`/products/${id}`, "GET"),

  getByCategory: (category: string) => apiCall(`/products/category/${category}`, "GET"),

  getFeatured: () => apiCall("/products/featured/top", "GET"),
}

// Artist APIs
export const artistAPI = {
  getAll: () => apiCall("/artists", "GET"),

  getById: (id: string) => apiCall(`/artists/${id}`, "GET"),

  getProducts: (id: string) => apiCall(`/artists/${id}/products`, "GET"),
}

// Cart APIs
export const cartAPI = {
  get: () => apiCall("/cart", "GET"),

  add: (productId: string, quantity: number, customization: any, price: number) =>
    apiCall("/cart/add", "POST", { productId, quantity, customization, price }),

  remove: (productId: string) => apiCall(`/cart/remove/${productId}`, "DELETE"),

  clear: () => apiCall("/cart/clear", "DELETE"),
}

// Order APIs
export const orderAPI = {
  create: (shippingAddress: any, paymentMethod: string) =>
    apiCall("/orders/create", "POST", { shippingAddress, paymentMethod }),

  getAll: () => apiCall("/orders", "GET"),

  getById: (id: string) => apiCall(`/orders/${id}`, "GET"),
}

// Review APIs
export const reviewAPI = {
  getByProduct: (productId: string) => apiCall(`/reviews/product/${productId}`, "GET"),

  create: (productId: string, rating: number, title: string, comment: string, images: string[]) =>
    apiCall("/reviews", "POST", { productId, rating, title, comment, images }),
}

// Search APIs
export const searchAPI = {
  search: (query: string, category?: string, minPrice?: number, maxPrice?: number, rating?: number, sort?: string) => {
    const params = new URLSearchParams()
    if (query) params.append("query", query)
    if (category) params.append("category", category)
    if (minPrice) params.append("minPrice", minPrice.toString())
    if (maxPrice) params.append("maxPrice", maxPrice.toString())
    if (rating) params.append("rating", rating.toString())
    if (sort) params.append("sort", sort)

    return apiCall(`/search?${params.toString()}`, "GET")
  },
}

export const healthCheck = () => apiCall("/health", "GET")
