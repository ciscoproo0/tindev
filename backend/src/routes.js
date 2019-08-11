const express = require('express');
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const routes = express.Router();


//Listar desenvolvedores
routes.get('/devs', DevController.index);

//manter desenvolvedores
routes.post('/devs', DevController.store);

//Controle de likes
routes.post('/devs/:devId/likes', LikeController.store);

//Controle de dislikes
routes.post('/devs/:devId/dislikes', DislikeController.store);


module.exports = routes;