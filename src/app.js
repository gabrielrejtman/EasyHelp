const express = require('express');
const router = require('./router');
const app = express();


app.use(express.static('public'));
app.use(router);
app.set('view engine', 'ejs');


module.exports = app;