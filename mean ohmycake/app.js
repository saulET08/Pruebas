//importaciones------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//conexion a la base de datos------------------------------------------------------------------------
mongoose.connect(config.database, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.connection.on('conected', () =>{
    console.log('conected to database');
});

mongoose.connection.on('connected', () =>{
    console.log('connected to database');
});

mongoose.connection.on('error', () =>{
    console.log('database error');
});

// incializacion de app------------------------------------------------------------------------
const app = express();

//routes------------------------------------------------------------------------
const users = require('./routes/users');

//PORT------------------------------------------------------------------------
const port = process.env.PORT || 3000;

//middleware------------------------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users', users);

// index route------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('invalid end point');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

// server start------------------------------------------------------------------------
app.listen(port, () => 
console.log(`listening on http://localhost:${port}`));
