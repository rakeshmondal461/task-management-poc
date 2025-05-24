const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');


router.post('/signup', userController.signupUser);   
router.post('/signin', userController.signInUser); 

export default router;