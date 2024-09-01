import { Router } from "express";
import db from "../database.js";
import loggedIn from "../controllers/loggedIn.js";
const blogRouter = Router();

blogRouter.delete('/:id', loggedIn, (req, res) => {
    const blogId = req.params.id;

    db.query('DELETE FROM blogs WHERE blog_id = ? AND user_id = ?', [blogId, req.user.user_id], (err, result) => {
        if (err) {
            return res.json({ status: 'error', error: 'Failed to delete the blog post.' });
        }

        if (result.affectedRows === 0) {
            return res.json({ status: 'error', error: 'No blog post found or you do not have permission to delete it.' });
        }

        return res.json({ status: 'success', success: 'Blog post deleted successfully.' });
    });
});

blogRouter.post('/', loggedIn, (req, res) => {
    const { title, content } = req.body;

    db.query('INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)', 
        [title, content, req.user.user_id], 
        (err, result) => {
            if (err) {
                return res.status(500).send('Failed to add the blog.');
            }
            res.redirect('/'); 
        });
});


export default blogRouter;
