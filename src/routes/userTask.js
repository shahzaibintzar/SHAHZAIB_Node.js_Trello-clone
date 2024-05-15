const express = require('express');
const router = express.Router();
const Task = require('../models/userTask') 
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

// add tasks in authenticate user API
router.post('/AddTask', async (req, res) => {
const token = req.cookies.token
const data =  jwt.verify(token, process.env.SECRET)
const Email = data.email

    const userTaskData = new Task({
        email: Email,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
    })

    try {
        const task = await userTaskData.save();
        res.status(201).json({message: 'User saved successfully ' , task});
    } catch (error) {
        res.status(400).json({message: 'Error saving user', error});
    }

    
})

// get all tasks in authenticate user API

router.get('/getTask', async (req, res) => {
    const token = req.cookies.token
    const data =  jwt.verify(token, process.env.SECRET)
    const Email = data.email
    const getTask = await Task.find({email:Email})
    res.status(201).json({message: 'User saved successfully ', getTask});
})




module.exports = router