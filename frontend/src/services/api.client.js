import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const todoAPI = {
  getAll: () => apiClient.get('/todos'),
  getById: (id) => apiClient.get(`/todos/${id}`),
  create: (data) => apiClient.post('/todos', data),
  update: (id, data) => apiClient.put(`/todos/${id}`, data),
  delete: (id) => apiClient.delete(`/todos/${id}`),
  toggle: (id) => apiClient.patch(`/todos/${id}/toggle`),
}

export default apiClient
