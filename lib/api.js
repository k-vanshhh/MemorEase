const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

let token = null

// Set token when user logs in
export const setAuthToken = (t) => {
  token = t
}

// Generic API call function
const apiCall = async (endpoint, method = "GET", body = null) => {
  const headers = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
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
  signup: (name, email, password, confirmPassword) =>
    apiCall("/auth/signup", "POST", { name, email, password, confirmPassword }),

  login: (email, password) => apiCall("/auth/login", "POST", { email, password }),

  getProfile: () => apiCall("/auth/me", "GET"),

  updateProfile: (data) => apiCall("/auth/me", "PUT", data),
}

// Product APIs
export const productAPI = {
  getAll: (page = 1, limit = 12) => apiCall(`/products?page=${page}&limit=${limit}`, "GET"),

  getById: (id) => apiCall(`/products/${id}`, "GET"),

  getByCategory: (category) => apiCall(`/products/category/${category}`, "GET"),

  getFeatured: () => apiCall("/products/featured/top", "GET"),
}

// Artist APIs
export const artistAPI = {
  getAll: () => apiCall("/artists", "GET"),

  getById: (id) => apiCall(`/artists/${id}`, "GET"),

  getProducts: (id) => apiCall(`/artists/${id}/products`, "GET"),
}

// Cart APIs
export const cartAPI = {
  get: () => apiCall("/cart", "GET"),

  add: (productId, quantity, customization, price) =>
    apiCall("/cart/add", "POST", { productId, quantity, customization, price }),

  remove: (productId) => apiCall(`/cart/remove/${productId}`, "DELETE"),

  clear: () => apiCall("/cart/clear", "DELETE"),
}

// Order APIs
export const orderAPI = {
  create: (shippingAddress, paymentMethod) => apiCall("/orders/create", "POST", { shippingAddress, paymentMethod }),

  getAll: () => apiCall("/orders", "GET"),

  getById: (id) => apiCall(`/orders/${id}`, "GET"),
}

// Review APIs
export const reviewAPI = {
  getByProduct: (productId) => apiCall(`/reviews/product/${productId}`, "GET"),

  create: (productId, rating, title, comment, images) =>
    apiCall("/reviews", "POST", { productId, rating, title, comment, images }),
}

// Search APIs
export const searchAPI = {
  search: (query, category, minPrice, maxPrice, rating, sort) => {
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
