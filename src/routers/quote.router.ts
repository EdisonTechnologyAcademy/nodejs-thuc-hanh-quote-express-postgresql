import express from 'express';
import pool from '../services/db';

const quoteRouter = express.Router();
quoteRouter.get('/list', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM quote ORDER BY id ASC');
        res.status(200).json({ quotes: data.rows })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
});

quoteRouter.post('/add', async (req, res) => {
    try {
        const { quote, author } = req.body;
        console.log(quote, 'quote')
        const data = await pool.query('INSERT INTO quote (quote, author) VALUES ($1, $2) RETURNING *', [quote, author]);
        res.status(200).json({ quote: data.rows[0] });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

quoteRouter.put('/update/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { quote, author } = req.body;
        const data = await pool.query('UPDATE quote SET quote = $1, author = $2 WHERE id = $3 RETURNING *', [quote, author, id]);
        res.status(200).json({ quote: data.rows[0] });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

quoteRouter.delete('/delete/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await pool.query('DELETE FROM quote WHERE id = $1 RETURNING *', [id]);
        res.status(200).json({ quote: data.rows[0] });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

export default quoteRouter;
