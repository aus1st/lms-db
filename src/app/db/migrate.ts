
//import { drizzle } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres'
import dotenv from 'dotenv'
import pkg from 'pg';

const { Pool } = pkg;
//const env = dotenv.config();
dotenv.config();
console.log(process.env.POSTGRES_USER);

// const pool = new Pool({
//     connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}?sslmode=require`

// });


const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}?sslmode=require`;
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);


// migrate(db, { migrationsFolder: "drizzle" }).then((value) => {
//     console.log('migration executed')
// }, (err) => {
//     console.log('Error Occured', err);
// });

migrate(db, { migrationsFolder: "drizzle" }).then(msg => {
    console.log(msg)
}).catch(err => {
    console.log(err);
});

