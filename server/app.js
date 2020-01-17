const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
require('./config/passport');

mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', routes);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(8080, () => console.log('Server started...!'));
