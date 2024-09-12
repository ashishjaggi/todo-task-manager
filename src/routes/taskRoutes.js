const express = require('express');
const { getTasksList, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { verfiyUser } = require('../middleware/authMiddleware');
const router = express.Router();
const { taskSchema } = require('../validations/taskValidation');
const validationMiddleware = require('../middleware/validationMiddleware');

// retrive all task list
router.get('/taskList', verfiyUser, getTasksList);

// get task details by task id
router.get('/tasks/:id', verfiyUser,  getTaskById);

// create new task 
router.post('/createTask', verfiyUser, validationMiddleware(taskSchema), createTask);

// update task by id
router.put('/updateTask/:id', verfiyUser, validationMiddleware(taskSchema), updateTask);

// delete task by id
router.delete('/deleteTask/:id', verfiyUser, deleteTask);

module.exports = router;
