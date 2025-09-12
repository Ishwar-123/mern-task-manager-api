import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { todoAPI } from '../services/api.client'

const TodoContext = createContext()

export const useTodos = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await todoAPI.getAll()
      if (response.data.success) {
        setTodos(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to fetch todos')
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async (todoData) => {
    try {
      const response = await todoAPI.create(todoData)
      if (response.data.success) {
        setTodos(prev => [response.data.data, ...prev])
        toast.success('Todo created successfully!')
        return response.data.data
      }
    } catch (error) {
      toast.error('Failed to create todo')
      throw error
    }
  }

  const updateTodo = async (id, todoData) => {
    try {
      const response = await todoAPI.update(id, todoData)
      if (response.data.success) {
        setTodos(prev => prev.map(todo => 
          todo._id === id ? response.data.data : todo
        ))
        toast.success('Todo updated successfully!')
        return response.data.data
      }
    } catch (error) {
      toast.error('Failed to update todo')
      throw error
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await todoAPI.delete(id)
      if (response.data.success) {
        setTodos(prev => prev.filter(todo => todo._id !== id))
        toast.success('Todo deleted successfully!')
      }
    } catch (error) {
      toast.error('Failed to delete todo')
      throw error
    }
  }

  const toggleTodo = async (id) => {
    try {
      const response = await todoAPI.toggle(id)
      if (response.data.success) {
        setTodos(prev => prev.map(todo => 
          todo._id === id ? response.data.data : todo
        ))
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error('Failed to toggle todo')
      throw error
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  useEffect(() => {
    fetchTodos()
  }, [])

  const value = {
    todos: filteredTodos,
    loading,
    filter,
    setFilter,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    fetchTodos
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}
