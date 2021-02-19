require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./models')
const errorHandler = require('./utils/error-handler')

// Routes
const tweetRoutes = require('./routes/tweet.routes');
const userRoutes = require('./routes/user.routes');



app.use(cors({ origin: "http://localhost:8000"}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

db.sequelize.sync({  });


// Simple route for testing
app.get("/", (_, res) => {
    res.json(
        {
            message: "Hello, your app is running smoothly."
        }
    )
})

// Defining routes
app.use('/tweet', tweetRoutes)
app.use('/user', userRoutes)

app.use(errorHandler)

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`, ``)
})

