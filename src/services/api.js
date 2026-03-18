import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

export const userService = {
  getUsers: ({ page = 1, limit = 10, search = '' } = {}) => {
    const skip = (page - 1) * limit
    if (search.trim()) {
      return api.get(`/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`)
    }
    return api.get(`/users?limit=${limit}&skip=${skip}`)
  },

  getUserById: (id) => api.get(`/users/${id}`),
}

export default api
