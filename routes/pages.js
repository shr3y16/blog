import { Router } from "express";
const pageRouter = Router();

pageRouter.get("/", (req,res) => {
    res.render("index");
})

pageRouter.get("/register", (req,res) => {
    res.sendFile("register.html", {root: "./public"});
})

pageRouter.get("/login", (req,res) => {
    res.sendFile("login.html", {root: "./public"});
})

export default pageRouter;