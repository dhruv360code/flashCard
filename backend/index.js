const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const prcess = require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
const cardRouter = require('./routes/index');
app.use('/flash',cardRouter);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
