import db from "../database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "Please enter email and password" });
    else {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;
            if (!result[0] || !await bcrypt.compare(password, result[0].password)) return res.json({ status: "error", error: "Incorrect email or password" })
            else {
                const token = jwt.sign({ user_id: result[0].user_id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie("userRegistered", token, cookieOptions);
                return res.json({ status: "success", success: "User Logged In" });
            }
        })
    }
}

export default login;
