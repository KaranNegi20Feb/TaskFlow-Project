const express = require("express");
const router = express.Router();
const { User, Task3} = require("../db"); // Correct import

router.post('/inprogresstask', async (req, res) => {
    try {
        const body = req.body;
        const task = await Task3.create(body);
        res.status(201).json({ success: true, task }); // Send success response
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); // Send error response
    }
});

router.get('/itasks', async (req, res) => {
    try {
        const tasks = await Task3.find(); // Fetch all tasks
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;
