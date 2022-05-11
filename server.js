const express = require('express')
const { pool } = require('./db')

const app = express();
const PORT = 3030;

app.use(express.json())

app.get('/lawyers', async(req, res) => {

    try {
        const databaseResult = await pool.query("SELECT * FROM users WHERE is_lawyer = true")
        console.log(databaseResult)
        res.json({
            data: databaseResult.rows
        });
    } catch (err) {
        res.statusCode = 500;
        res.json({
            message: `WHOOPS! ${err.message}`
        })
    }
})

app.listen(PORT)