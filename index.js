const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const cors = require('cors');
app.use(cors({
    origin: ['https://front-todo-hazel.vercel.app', 'http://localhost:5173'],
    credentials: true
}));

app.use(express.json());

const authRoutes = require('./router/user.route');
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5630;
const MONGO_URI = process.env.URI || process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() =>
        console.log("Connected to MongoDB"))
    .catch((err) =>
        console.error("Error connecting to MongoDB:", err));

app.listen(port, () => {
    console.log(`app is currently running on port ${port}`);

})