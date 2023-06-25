
import {drizzle} from 'drizzle-orm/node-postgres';
import {migrate} from 'drizzle-orm/node-postgres/migrator';
import postgres from 'postgres'
import dotenv from 'dotenv'
import pkg from 'pg';

const { Pool } = pkg;
const env = dotenv.config();

const pool = new Pool({
   connectionString: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:5432/${env.POSTGRES_DATABASE}?sslmode=require`
   
});


const db = drizzle(pool);


migrate(db,{migrationsFolder:"drizzle"}).then((value)=>{
    console.log('migration executed')
},(err)=>{
    console.log('Error Occured',err);
});
