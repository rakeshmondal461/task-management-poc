const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/validateToken');
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

            
router.get('/profile/:id', authenticateToken, userController.getUserById); 
router.get('/mytasks', authenticateToken, taskController.getUserTasks);     
router.get('/task/:id', authenticateToken,  taskController.getTaskById); 
router.patch('/task/:id', authenticateToken, taskController.updateTaskStatus); 

module.exports = router;