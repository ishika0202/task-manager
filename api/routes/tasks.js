const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows);
});

router.post('/', async (req, res) => {
    const { title } = req.body;
    const result = await pool.query(
        'INSERT INTO tasks (title, status, createdAt) VALUES ($1, $2, NOW()) RETURNING *',
        [title, 'pending']
    );
    res.json(result.rows[0]);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    res.json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
    const result = await pool.query(
        'UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *',
        [title, status, id]
    );
    res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted successfully' });
});

module.exports = router;
