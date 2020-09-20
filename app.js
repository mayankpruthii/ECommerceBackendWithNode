require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose.connect(process.env.DATABASE, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }).then(() => {
                    console.log("DB connected!")
                });

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
const authRoutes = require("./routes/auth.js");
app.use("/api", authRoutes);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`running on ${port}`);
})