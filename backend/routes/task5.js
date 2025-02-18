const express = require("express");
const router = express.Router();
const { User, Task5} = require("../db"); // Correct import

router.post('/readytask', async (req, res) => {
    try {
        const body = req.body;
        const task = await Task5.create(body);
        res.status(201).json({ success: true, task }); // Send success response
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); // Send error response
    }
});

router.get('/rtasks', async (req, res) => {
    try {
        const tasks = await Task5.find(); // Fetch all tasks
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;
