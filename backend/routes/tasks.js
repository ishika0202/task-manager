const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const result = await pool.query(
            'INSERT INTO tasks (title, status, createdAt) VALUES ($1, $2, NOW()) RETURNING *',
            [title, 'pending']
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error creating task:', err.message);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// GET a single task by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching task:', err.message);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});

// PUT update a task by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    try {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *',
            [title, status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

// DELETE a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err.message);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;
