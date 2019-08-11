//necessário importar express no npm
const express = require('express');

//parsar a requisição que chega
const bodyParser = require('body-parser');

//mongoose é um simplificador de linguagem SQL para JS, precisa ser instalado previamente via package manager 
const mongoose = require('mongoose');
const routes = require('./routes');

//cors permite que outras aplicações chamem esse back
const cors = require('cors');

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

//conecta o banco, string de conexão de MongoDB Atlas
mongoose.connect('mongodb+srv://ciscoproo0:Cisco141290@cluster0-zxsfz.mongodb.net/tindev?retryWrites=true&w=majority', {useNewUrlParser: true})


//server utilizando arquivo routes
server.use(routes);


server.listen(3000);