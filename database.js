import { createConnection } from "mysql2";
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const db = createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

export default db;
