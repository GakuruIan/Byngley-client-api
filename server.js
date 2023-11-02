const express = require('express');

const app = express();
const router = require('./Routes/router')
const passport = require('passport')
const session =require('express-session')
const cors =require('cors')

require('./Utils/passport')(passport)
require('./Utils/auth')(passport);
require('dotenv').config();

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

//moongose connection
mongoose.connect(process.env.LOCAL_URI)
.then(()=>{
    console.log("DB connection successfull")
})
.catch(err=>{
    console.log(err)
})

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//express session
app.use(session({secret:'secret',resave:true,saveUninitialized:true}));

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// prevent cross site error

app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials:true
}));


//routes
app.use(router);

app.listen(PORT,(req,res)=>{
    console.log(`Server started: http://localhost:${PORT}`);
})