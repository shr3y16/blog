import db from "../database.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "Please enter email and password" });
    else {
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: "error", error: "Email already registered" })
            else {
                const hashedPassword = await bcrypt.hash(password, 8);
                db.query('INSERT INTO users SET ?', { email: email, password: hashedPassword }, (error, results) => {
                    if (error) throw error;
                    return res.json({ status: "success", success: "User Registered, Please Login to Continue" });
                })
            }
        })
    }
}

export default register;