require('dotenv').config();

const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL
const connect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

module.exports = connect;