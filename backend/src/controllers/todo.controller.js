const Todo = require('../models/Todo.model');

const createTodo = async (req, res) => {
    try {
        const { title, description, priority, dueDate, tags } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Todo title is required'
            });
        }

        const todo = new Todo({
            title: title.trim(),
            description: description?.trim(),
            priority,
            dueDate,
            tags
        });

        const savedTodo = await todo.save();
        
        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: savedTodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating todo',
            error: error.message
        });
    }
};

const getAllTodos = async (req, res) => {
    try {
        const { completed, priority, sortBy = 'createdAt', order = 'desc' } = req.query;
        
        let filter = {};
        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }
        if (priority) {
            filter.priority = priority;
        }

        const sortOrder = order === 'desc' ? -1 : 1;
        
        const todos = await Todo.find(filter)
            .sort({ [sortBy]: sortOrder })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching todos',
            error: error.message
        });
    }
};

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const todo = await Todo.findById(id).select('-__v');
        
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching todo',
            error: error.message
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.title !== undefined && updates.title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Todo title cannot be empty'
            });
        }

        const todo = await Todo.findByIdAndUpdate(
            id,
            updates,
            { 
                new: true, 
                runValidators: true 
            }
        ).select('-__v');

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: todo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating todo',
            error: error.message
        });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        
        const todo = await Todo.findByIdAndDelete(id);
        
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting todo',
            error: error.message
        });
    }
};

const toggleTodoCompletion = async (req, res) => {
    try {
        const { id } = req.params;
        
        const todo = await Todo.findById(id);
        
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();

        res.status(200).json({
            success: true,
            message: `Todo marked as ${updatedTodo.completed ? 'completed' : 'pending'}`,
            data: updatedTodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error toggling todo completion',
            error: error.message
        });
    }
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion
};
