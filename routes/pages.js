import { Router } from "express";
import db from "../database.js";
import loggedIn from "../controllers/loggedIn.js";
const pageRouter = Router();

pageRouter.get("/", loggedIn, (req, res) => {

    db.query(`
        SELECT blogs.*, users.email 
        FROM blogs 
        JOIN users ON blogs.user_id = users.user_id`, 
        (err, blogs) => {
            if (err) throw err;
            if (req.user) {
                res.render('index', { status: "loggedIn", user: req.user, blogs: blogs });
            } else {
                res.render('index', { status: "no", blogs: blogs });
            }
        });
    
})

pageRouter.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public" });
})

pageRouter.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public" });
})

export default pageRouter;