import { Router } from "express";
import db from "../database.js";
import loggedIn from "../controllers/loggedIn.js";
const pageRouter = Router();

pageRouter.get("/", loggedIn, (req, res) => {
    if (req.user) {
        db.query('SELECT * FROM blogs WHERE user_id = ?', [req.user.user_id], (err, blogs) => {
            if (err) throw err;
            res.render('index', { status: "loggedIn", user: req.user, blogs: blogs });
        });
    } else {
        res.render("index", { status: "no", user: "no" });
    }

})

pageRouter.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public" });
})

pageRouter.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public" });
})

export default pageRouter;