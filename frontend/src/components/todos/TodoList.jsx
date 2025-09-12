import React, { useState } from 'react'
import { CheckCircle, Circle, Edit3, Trash2, Calendar, AlertCircle } from 'lucide-react'
import { useTodos } from '../../context/TodoContext'

const TodoList = () => {
  const { todos, loading, filter, setFilter, toggleTodo, deleteTodo, updateTodo } = useTodos()
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleEdit = (todo) => {
    setEditingId(todo._id)
    setEditForm({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
    })
  }

  const handleSaveEdit = async (id) => {
    try {
      await updateTodo(id, editForm)
      setEditingId(null)
      setEditForm({})
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Todos ({todos.length})
        </h2>
        
        <div className="flex space-x-2">
          {['all', 'pending', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === filterType
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No todos found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter === 'all' ? 'Create your first todo to get started!' : `No ${filter} todos yet.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className={`card p-6 transition-all duration-300 ${
                todo.completed ? 'opacity-75' : ''
              }`}
            >
              {editingId === todo._id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="input-field"
                    placeholder="Todo title"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="input-field resize-none"
                    rows="2"
                    placeholder="Description"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={editForm.priority}
                      onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
                      className="input-field"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                    <input
                      type="date"
                      value={editForm.dueDate}
                      onChange={(e) => setEditForm({...editForm, dueDate: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveEdit(todo._id)}
                      className="btn-primary"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <button
                        onClick={() => toggleTodo(todo._id)}
                        className="mt-1 text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {todo.completed ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Circle className="h-6 w-6" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-semibold ${
                          todo.completed 
                            ? 'line-through text-gray-500 dark:text-gray-400' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {todo.title}
                        </h3>
                        
                        {todo.description && (
                          <p className={`mt-1 text-sm ${
                            todo.completed 
                              ? 'text-gray-400 dark:text-gray-500' 
                              : 'text-gray-600 dark:text-gray-300'
                          }`}>
                            {todo.description}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 mt-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
                            {todo.priority} priority
                          </span>
                          
                          {todo.dueDate && (
                            <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(todo.dueDate)}
                            </span>
                          )}
                          
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            Created {formatDate(todo.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList
