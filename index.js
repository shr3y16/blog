import express, { static as expressStatic, json } from "express";
import db from "./database.js";
const app = express();
import cookie from "cookie-parser";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pageRouter from "./routes/pages.js";
import authRouter from "./controllers/auth.js";
import blogRouter from "./routes/blogRouter.js";
import methodOverride from 'method-override';

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 5000;
app.use("/js", expressStatic(__dirname + "/public/js"));
app.use("/css", expressStatic(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(json());
app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/blogs", blogRouter);
app.listen(PORT);