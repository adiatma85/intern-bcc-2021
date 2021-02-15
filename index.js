require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./models')


app.use(cors({ origin: "http://localhost:8000" }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

db.sequelize.sync();

// Simple route for testing
app.get("/", (_, res) => {
    res.json(
        {
            message: "Hello, your app is running smoothly"
        }
    )
})

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})

