const express = require('express');const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})
app.use('/api', routes);

app.listen(8080, () => console.log(`Server started...!`))
