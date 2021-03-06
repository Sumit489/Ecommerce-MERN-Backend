const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripepayment")
require('dotenv').config();

//db conncetions
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true}).then(()=>{
        console.log("DB CONNECTED"); 
    });

//middle ware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//my routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",stripeRoutes)



//ports
const port = 8000
//starting server
app.listen(port, ()=>{
    console.log(`app is runnig  at ${port}`);
})
