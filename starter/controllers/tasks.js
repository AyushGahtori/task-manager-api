const task = require('../models/task'); // Import the Task model for database operations

// Get all tasks from the database
const getAllTasks = async (req, res) => {
    try {
        // Fetch all tasks using the model's find() method
        const tasks = await task.find();
        // Respond with the list of tasks and status 200
        res.status(200).json({ tasks });
    } catch (error) {
        // Handle errors and respond with status 500
        res.status(500).json({ error: error.message });
    }
}

// Create a new task in the database
const createTask = async (req, res) => {
    try {
        // Create a new task using the request body data
        const newTask = await task.create(req.body);
        // Respond with the created task and status 201
        res.status(201).json({ task: newTask });
    } catch (error) {
        // Handle errors and respond with status 500
        res.status(500).json({ error: error.message });
    }
}

// Get a single task by its ID
const getTask = async (req, res) => {
    try {
        // Find the task by ID from the request parameters
        const foundTask = await task.findById(req.params.id);
        if (!foundTask) {
            // If not found, respond with status 404
            return res.status(404).json({ error: 'Task not found' });
        }
        // Respond with the found task and status 200
        res.status(200).json({ task: foundTask });
    } catch (error) {
        // Handle errors and respond with status 500
        res.status(500).json({ error: error.message });
    }
}

// Update a task by its ID
const updateTask = async (req, res) => {
    try {
        // Find the task by ID and update it with request body data
        // { new: true } returns the updated document
        // { runValidators: true } ensures validation rules are applied
        const updatedTask = await task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTask) {
            // If not found, respond with status 404
            return res.status(404).json({ error: 'Task not found' });
        }
        // Respond with the updated task and status 200
        res.status(200).json({ task: updatedTask });
    } catch (error) {
        // Handle errors and respond with status 500
        res.status(500).json({ error: error.message });
    }
}

// Delete a task by its ID
const deleteTask = async (req, res) => {
    try {
        // Find the task by ID and delete it
        const deletedTask = await task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            // If not found, respond with status 404
            return res.status(404).json({ error: 'Task not found' });
        }
        // Respond with the deleted task and status 200
        res.status(200).json({ task: deletedTask });
    } catch (error) {
        // Handle errors and respond with status 500
        res.status(500).json({ error: error.message });
    }
}

// Export all controller functions for use in routes
module.exports = {
    getAllTasks, createTask,
    getTask, updateTask, deleteTask
}