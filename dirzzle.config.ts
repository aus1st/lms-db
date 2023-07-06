import { Config } from 'drizzle-kit'

export default {
    schema: '@/db/schema/*',
    driver: 'pg',
    dbCredentials: {
        connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}?sslmode=require`
    },
    
    out: './drizzle',

} satisfies Config