# Todo API Panel - MERN Stack

A complete MERN stack application for managing todos with a premium UI built with Tailwind CSS.

## Features

- ✅ Complete CRUD operations for todos
- 🌙 Dark/Light theme toggle
- 📱 Fully responsive design
- 🎨 Premium UI with Tailwind CSS
- 🔄 Real-time updates
- 📊 Filter todos by status
- 🎯 Priority levels for todos
- 📅 Due date management
- 🍞 Toast notifications
- ⚡ Fast loading with preloader

## Tech Stack

**Frontend:**
- React.js 18
- Vite
- Tailwind CSS
- Context API
- React Router DOM
- Axios
- React Hot Toast
- Lucide React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- Morgan (logging)
- dotenv

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

2. **Backend Setup**

3. **Frontend Setup**

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a new todo |
| GET | `/api/todos/:id` | Get a specific todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |
| PATCH | `/api/todos/:id/toggle` | Toggle todo completion |

## Project Structure


## Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

Create a `.env` file in the backend directory:


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
