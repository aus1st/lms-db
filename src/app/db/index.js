
import {drizzle} from 'drizzle-orm/node-postgres';
import {migrate} from 'drizzle-orm/node-postgres/migrator';
import postgres from 'postgres'
import dotenv from 'dotenv'
import pkg from 'pg';

const { Pool } = pkg;
const env = dotenv.config();

const pool = new Pool({
   // connectionString: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:5432/${env.POSTGRES_DATABASE}?sslmode=require`
    connectionString: 'postgres://default:4UzYjlxt6HFR@ep-old-river-424254-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require'
});


const db = drizzle(pool);


migrate(db,{migrationsFolder:"drizzle"}).then((value)=>{
    console.log('migration executed')
},(err)=>{
    console.log('Error Occured',err);
});
