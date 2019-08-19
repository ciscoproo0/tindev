//necessário importar express no npm
const express = require('express');

//mongoose é um simplificador de linguagem SQL para JS, precisa ser instalado previamente via package manager 
const mongoose = require('mongoose');
const routes = require('./routes');

//cors permite que outras aplicações chamem esse back
const cors = require('cors');

const app = express();

//aceitar não somente http
const server = require('http').Server(app);
//ouvir conexão do cliente
const io = require('socket.io')(server);

//exemplo simples para obter ID de usuário (id do mongo para cada user do git) sem persistência de dados, melhor prática para deploy em produção é persistir em bd.
const connectedUsers ={};

io.on('connection', socket => {
    const {user} = socket.handshake.query;

    connectedUsers[user] = socket.id;

});

//middleware para passar valor de user para controller
app.use((req, res, next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});


app.use(cors());

app.use(express.json());

//conecta o banco, string de conexão de MongoDB Atlas
mongoose.connect('mongodb+srv://ciscoproo0:Cisco141290@cluster0-zxsfz.mongodb.net/tindev?retryWrites=true&w=majority', {useNewUrlParser: true})


//app utilizando arquivo routes
app.use(routes);


server.listen(3000);