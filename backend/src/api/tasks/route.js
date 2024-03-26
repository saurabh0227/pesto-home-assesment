const express = require('express');
const { addTask, fetchTasks, updateTask, deleteTask } = require('./controller');

const router = express.Router();

router.post('/add', addTask);
router.get('/fetch', fetchTasks);
router.put('/update/:id', updateTask);
router.put('/delete/:id', deleteTask);

module.exports = router;
