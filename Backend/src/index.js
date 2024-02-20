require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./config/db-config');
const app = express();
const apiRoutes = require('./routes/index');
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api',apiRoutes);

app.listen(PORT, async() => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connect();
});

