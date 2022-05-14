const { response } = require('express');
const express = require('express');
const cors = require('cors');

const { pool } = require('./db')

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(cors());

const createTimeStamp = () => {
    var m = new Date();
    var dateString =
        m.getUTCFullYear() + "-" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);

    return dateString;
}

// api route to add a new user to our users table TO BE USED FOR CLIENTS, LAWYERS WILL NOT SIGN UP THROUGH THIS ROUTE
// REQUIREMENTS FOR THE BODY TO USE THIS ROUTE: firstName -> what is the first name of the user that is signing up?
//                                              lastName -> what is the last name of the user that is signing up?
//                                              email -> what is the email that they are signing up with?
//                                              password -> what is the password they chose to sign in with this account?
app.post('/newUser', async(req, res) => {
    const clientFirstName = req.body.firstName
    const clientLastName = req.body.lastName
    const clientEmail = req.body.email
    const clientPassword = req.body.password

    console.log(req.body)

    try {
        const sql = `INSERT INTO users (first_name, last_name, email, password, profile_pic_link, is_lawyer, firm, bio)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *;`
        const databaseResult = await pool.query(sql, [clientFirstName, clientLastName, clientEmail, clientPassword, null, false, null, null])
        console.log(databaseResult);
        res.status(201).json({ newClient: databaseResult.rows[0] })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
})

// API route to post a new review for a lawyer
// REQUIREMENTS FOR THE BODY TO USE THIS ROUTE: lawyer_id -> who is the lawyer that this review is for?
//                                              review_body -> what is the actualy text of the review?
//                                              client_id -> which client left this review?
app.post('/reviews', async(req, res) => {
        const lawyerId = req.body.lawyer_id
        const review = req.body.review_body
        const reviewer = req.body.client_id

        try {
            const sql = `INSERT INTO reviews (review_body, lawyer_id, client_id)
        VALUES ($1, $2, $3) returning *;`
            const databaseResult = await pool.query(sql, [review, lawyerId, reviewer])
            res.status(201).json({ newReview: databaseResult.rows[0] })
        } catch (err) {
            res.status(500).json({ message: `${err.message}` })
        }
    })
    // api route for getting the list of lawyers from the users table
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

// api route to get a specific lawyers information
app.get('/lawyers/:id', async(req, res) => {
    const lawyerId = req.params.id;
    try {
        const sql = `SELECT * from users
        where user_id = $1 and is_lawyer = true;`
        const databaseResult = await pool.query(sql, [lawyerId])
        res.status(200).json({ lawyerInfo: databaseResult.rows[0] });
    } catch (err) {
        res.status(500).json({ message: `${err.message}` });
    }
})

// API route to get a list of clients that a lawyer has 
app.get('/lawyers/:id/clients', async(req, res) => {
    const lawyerId = req.params.id;

    try {
        const sql = `SELECT person1, users.first_name, users.last_name, users.profile_pic_link, users.email, users.bio
        from conversations
        join users on users.user_id = person1
        where person2 = $1
        GROUP BY 1,2,3,4,5,6;`

        const databaseResult = await pool.query(sql, [lawyerId])
        res.status(200).json({ clients: databaseResult.rows })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` });
    }
})

// API route to get all reviews for a lawyer
app.get('/lawyers/:id/reviews', async(req, res) => {
    const lawyerId = req.params.id;
    try {
        const sql = `SELECT lawyer_id, review_body, client_id, users.first_name, users.last_name
        from reviews
        join users on reviews.client_id = users.user_id
        where lawyer_id = $1;`
        const databaseResult = await pool.query(sql, [lawyerId])
        res.status(200).json({ reviews: databaseResult.rows })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` });
    }
})


// api route to get all conversations for a specific user TO BE USED FOR LAWYERS NOT CLIENTS
app.get('/lawyers/:id/inbox', async(req, res) => {
    const lawyerId = req.params.id
    try {

        const sql = `SELECT conversations.convo_id, conversations.person1, users.first_name, users.last_name, users.profile_pic_link
        from conversations
        join users
        on conversations.person1 = users.user_id
        where conversations.person2=$1
        GROUP BY
        1,2,3,4,5;`

        const databaseResult = await pool.query(sql, [lawyerId])
        res.status(200).json({ conversations: databaseResult.rows })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
})

// api route to add a new entry to the conversations table
// requirements for the body -> person1 -> user id (client)
//                              person2 -> user id (lawyer)
app.post('/conversations', async(req, res) => {
    const client = req.body.person1;
    const lawyer = req.body.person2;

    try {
        const sql = `INSERT INTO conversations (person1, person2)
        VALUES ($1, $2) returning *;`
        const databaseResult = await pool.query(sql, [client, lawyer]);
        res.status(201).json({ conversation: databaseResult.rows })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
})

//api route to get the most recent message from a conversation
app.get('/conversations/:id/mostRecent', async(req, res) => {
    const convoId = req.params.id;

    try {
        const sql = `SELECT message_body, "TIME_STAMP", convo_id
        from messages
        where convo_id = $1
        ORDER BY "TIME_STAMP" DESC
        LIMIT 1;`

        const databaseResult = await pool.query(sql, [convoId]);
        res.status(200).json({ mostRecentMessage: databaseResult.rows })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }

})

// api route to add a message sent to a specific conversation
// requirements for the body of the request, is_sender_lawyer boolean -> if client sent message its false 
//                                          message -> what is the message that was sent? 
app.post('/conversations/:id', async(req, res) => {
    const timeSent = createTimeStamp();
    const messageBody = req.body.message
    const convoId = req.params.id;
    const bool = req.body.is_sender_lawyer

    try {
        const sql = `INSERT INTO messages (convo_id, message_body, "TIME_STAMP", is_sender_lawyer)
        VALUES ($1, $2, $3, $4) returning *;`

        const databaseResult = await pool.query(sql, [convoId, messageBody, timeSent, bool])
        res.status(201).json({ newMessage: databaseResult.rows })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
})

// api route to get all conversations for a specific user TO BE USED FOR CLIENTS NOT LAWYERS
app.get('/clients/:id/inbox', async(req, res) => {
    const clientId = req.params.id
    try {

        const sql = `SELECT conversations.convo_id, conversations.person2, users.first_name, users.last_name, users.profile_pic_link
        from conversations
        join users
        on conversations.person2 = users.user_id
        where conversations.person1=$1
        GROUP BY
        1,2,3,4,5;`

        const databaseResult = await pool.query(sql, [clientId])
        res.status(200).json({ conversations: databaseResult.rows })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
})

app.listen(PORT)