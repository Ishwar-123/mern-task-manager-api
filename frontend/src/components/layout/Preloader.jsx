import React from 'react'

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="w-16 h-16 border-4 border-transparent border-t-primary-400 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">Todo API Panel</h2>
        <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading your workspace...</p>
      </div>
    </div>
  )
}

export default Preloader
