const { Pool } = require('pg');

const connectionDevelopment = {
    database: 'dreamsbridge', // Replace this with your DB name
    user: 'liam', // If you have a different postgres user, replace here
    password: 'password', // If you have a postgres password, write it here
    host: 'localhost'
}

const connectionProduction = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connectionDevelopment)




module.exports = {
    pool
}