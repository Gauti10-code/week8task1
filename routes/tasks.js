const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// POST route to add a task
router.post('/', async (req, res) => {
    try {
        const { courseId, taskName, dueDate, details } = req.body;
        const newTask = new Task({ courseId, taskName, dueDate, details });
        await newTask.save();
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding task', error });
    }
});

// GET route to retrieve tasks by course ID
router.get('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    try {
        const tasks = await Task.find({ courseId });
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this course' });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error });
    }
});

module.exports = router;
