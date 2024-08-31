import { Router } from "express";
import register from "./register.js";
import login from "./login.js";
import logout from "./logout.js";
const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
