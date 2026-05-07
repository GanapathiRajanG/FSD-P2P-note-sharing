import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dbGet, dbAll, dbRun } from '../database.js';

const router = express.Router();

// Get all board requests (visible to all authenticated users)
router.get('/', async (req, res) => {
  try {
    const rows = await dbAll(
      `SELECT b.id, b.title, b.description, b.status, b.createdAt,
              u.id as userId, u.name as userName, u.email as userEmail
       FROM board_requests b
       JOIN users u ON b.userId = u.id
       ORDER BY b.createdAt DESC`,
      []
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching board requests:', error);
    res.status(500).json({ error: 'Failed to fetch board requests' });
  }
});

// Create a new board request
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const id = uuidv4();
    const createdAt = new Date().toISOString();

    await dbRun(
      `INSERT INTO board_requests (id, userId, title, description, status, createdAt)
       VALUES (?, ?, ?, ?, 'open', ?)`,
      [id, userId, title, description || '', createdAt]
    );

    const user = await dbGet(`SELECT name, email FROM users WHERE id = ?`, [userId]);

    res.status(201).json({
      id, title, description: description || '', status: 'open', createdAt,
      userId, userName: user.name, userEmail: user.email
    });
  } catch (error) {
    console.error('Error creating board request:', error);
    res.status(500).json({ error: 'Failed to create request' });
  }
});

// Mark a board request as done (only the owner can do this)
router.put('/:id/done', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const request = await dbGet(`SELECT * FROM board_requests WHERE id = ?`, [id]);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.userId !== userId) return res.status(403).json({ error: 'Not authorized' });

    await dbRun(`UPDATE board_requests SET status = 'done' WHERE id = ?`, [id]);
    res.json({ message: 'Request marked as done', status: 'done' });
  } catch (error) {
    console.error('Error updating board request:', error);
    res.status(500).json({ error: 'Failed to update request' });
  }
});

// Delete a board request (only the owner can do this)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const request = await dbGet(`SELECT * FROM board_requests WHERE id = ?`, [id]);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.userId !== userId) return res.status(403).json({ error: 'Not authorized' });

    await dbRun(`DELETE FROM board_requests WHERE id = ?`, [id]);
    res.json({ message: 'Request deleted' });
  } catch (error) {
    console.error('Error deleting board request:', error);
    res.status(500).json({ error: 'Failed to delete request' });
  }
});

export default router;
