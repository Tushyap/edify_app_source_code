const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();


dotenv.config({ path: './config.env' });
require('./database/connection');
//const User = require('./model/userSchema');
app.use(express.json());

app.use(require('./router/router'));

const PORT = process.env.PORT;
app.get('/', (req, res) => {
  res.send(`Hello world from server`);
});

// app.get('/contact',(req, res)=>{
//     res.send(`Hello world from contact `);
//   });

app.get('/signin',(req, res)=>{
    res.send(`Hello world from login`);
  });

// app.get('/register', (req, res) => {
//   res.send(`Hello world from register`);
// });

app.listen(PORT, () => {
  console.log(`server is running at port number ${PORT}`);
})