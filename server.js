const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRouter = require('./routes/todos.router')
const port = 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* MongoDB Connection */
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true});
const connection = mongoose.connection;

/* MongoDB connection is successfully connected */
connection.once('open', () => {
    console.log('DB is connected');
});

/* End-Point Middleware */
app.use('/', todoRouter);

/* ERROR:404 Handler */
app.use((req, res, next) => {
    res.status(404).send("Page Not Found!!! Return to Home...");
});

/* Running server at loaclhost:port=4000 */
app.listen(port, () => {
    console.log(`server is running on localhost:${port}`);
});