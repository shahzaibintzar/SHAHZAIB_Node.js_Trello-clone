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


// get tasks by id

router.get('/getTaskById/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const taskData = await Task.findById(userId);

        if(!taskData){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(201).json({message: 'User saved successfully ', taskData});
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
})
// update tasks by id

router.put("/updateTaskById/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
        };
        const updateData = await Task.findByIdAndUpdate(taskId, updatedTask, {
            new: true,
        });

        if (!updateData) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', updateData });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// delete tasks by id

router.delete("/deleteTaskById/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const deleteData = await Task.findByIdAndDelete(taskId);

        if (!deleteData) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', deleteData });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


// update one item in Task list


router.put("/updateOneItemById/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedOneItemTask = (req.body)
        const updateOneItemData = await Task.findByIdAndUpdate(taskId, updatedOneItemTask, {
            new: true,
        });

        if (!updateOneItemData) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', updateOneItemData });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


module.exports = router