const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

dotenv.config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("connected to MongoDB"))
}

connectDB();


//middleware    
app.use(express.json());
app.use(helmet());
app.use(morgan('common'))


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

app.listen(8800, () =>{
    console.log('Backend server is running');
})

// app.get("/", () => {
//   console.log("Backend server is running");
// });