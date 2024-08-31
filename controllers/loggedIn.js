import db from "../database.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


const loggedIn = (req, res, next) => {
    if (!req.cookies.userRegistered) return next();
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        db.query('SELECT * FROM users WHERE user_id = ?', [decoded.user_id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            return next();
        })

    }
    catch (err) {
        if (err) return next();
    }
}

export default loggedIn;