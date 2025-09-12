import React from 'react'
import Navbar from '../components/layout/Navbar'
import TodoForm from '../components/todos/TodoForm'
import TodoList from '../components/todos/TodoList'

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Your Todo Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Organize your tasks and boost your productivity
            </p>
          </div>
          
          <TodoForm />
          <TodoList />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
