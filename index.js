const express = require('express')
var cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require("./routes/postRoutes")
const mongoose =  require("mongoose")
const dotenv = require('dotenv');

dotenv.config();

const app = express()

const username = "blob";
const password = "E1qZvAEr1tciT8wg";
const cluster = "test1";
const dbname = "test";

const CON_URL =`mongodb+srv://${username}:${password}@${cluster}.rkve9pp.mongodb.net/${dbname}`


app.use(cors())
app.use(express.json())
app.use("/user", userRoutes)
app.use("/post", postRoutes)


// app.use((req, res)=>{
//     next()
// })

app.get("/", (req, res)=>{
    res.send("hello")
})



mongoose.connect(CON_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server started")
    })
})
.catch((err)=>{
 console.log("connection failed "+ err)   
})


