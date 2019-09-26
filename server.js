const express = require('express');
const mongoose = require('mongoose'); // importing mongoose, ,used for connecting server to mongoDB
const bodyParser = require('body-parser')

const users = require('./routes/api/users'); // importing users route
const profile = require('./routes/api/profile'); // importing profile route
const posts = require('./routes/api/posts'); // importing posts route

// DB config
const db = require('./config/keys').mongoURI; //importing config file

// connect to mongoDB
mongoose
.connect(db)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

const app = express();// creating an instance of express app

// BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', 
    (req, res) => res.send("Hello!!!")
); //creating a simple route

// Use Routes
app.use('/api/users', users); // using imported users route
app.use('/api/posts', posts); // using imported posts route
app.use('/api/profile', profile); // using imported profile route

const port = process.env.PORT || 5000;//creating a variable for storing port

app.listen(port, () => console.log(`Server is running on port ${port}`))