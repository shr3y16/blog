import { createPool } from "mysql2";
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const db = createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
    waitForConnections: true,  
    connectionLimit: 10,     
    queueLimit: 0              
});

export default db;
