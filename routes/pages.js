import { Router } from "express";
import loggedIn from "../controllers/loggedIn.js";
const pageRouter = Router();

pageRouter.get("/", loggedIn, (req, res) => {
    if(req.user){
        res.render("index", {status: "loggedIn", user: req.user});
    }else{
        res.render("index", {status: "no", user: "nothing"});
    }
    
})

pageRouter.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public" });
})

pageRouter.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public" });
})

export default pageRouter;