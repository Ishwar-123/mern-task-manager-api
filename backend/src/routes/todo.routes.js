const express = require('express');
const {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion
} = require('../controllers/todo.controller');

const router = express.Router();

router.post('/', createTodo);
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id/toggle', toggleTodoCompletion);

module.exports = router;
