const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const colors = require("colors")
const bodyParser = require('body-parser')
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const errorHandler = require("./middlewares/errorMiddleware")
// router
const authRoutes = require("./routes/authRouters")


// .env setup
dotenv.config()

// rest objeet
const app = express();

// mongoose Connection
connectDB(process.env.MONGO_URI);

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(errorHandler)

const PORT = process.env.PORT || 8080;
// console.log(PORT)

// API routes
app.use("/api/v1/auth" , authRoutes);

// listen server
app.listen(8080, ()=>{
    console.log(`Server Running in ${process.env.DEV_MODE} or mode no port ${PORT}`.bgCyan.white);
});