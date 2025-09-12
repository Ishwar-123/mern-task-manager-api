const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Todo title is required'],
        trim: true,
        maxLength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

todoSchema.index({ completed: 1, createdAt: -1 });
todoSchema.index({ priority: 1, dueDate: 1 });

module.exports = mongoose.model('Todo', todoSchema);
