const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://teste:pass@testes-rkghc.mongodb.net/testes?retryWrites=true&w=majority',
{ useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});

app.use(express.json());
app.use(routes)


app.listen(3000);
