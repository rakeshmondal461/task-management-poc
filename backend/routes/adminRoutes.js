const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middlewares/validateToken');

router.get('/users', authenticateToken, adminController.getUsers);
router.get('/projects', authenticateToken, adminController.getUsers);
router.post('/addProject', authenticateToken, projectController.createProject);    
router.post('/createTask', authenticateToken, taskController.assignTask);  

module.exports = router;
