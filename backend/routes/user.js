const express = require("express");
const router = express.Router();
const { User, Task } = require("../db"); // Correct import

router.post('/user', async (req, res) => {
    try {
        const body = req.body;
        const user = await User.create(body);
        res.status(201).json({ success: true, user }); // Send success response
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); // Send error response
    }
});

router.get('/showusers', async (req, res) => {
    try {
        const user = await User.find(); // Fetch all tasks
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;


