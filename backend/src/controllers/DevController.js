const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {

    //Lista Devs
    async index(req, res){
        const {user} = req.headers;

        //procura o user logado no banco
        const loggedDev = await Dev.findById(user);

        //condiciona com um único AND 3 itens
        const users = await Dev.find({
            $and:[
                {_id: {$ne: user}},
                {_id: {$nin: loggedDev.likes}},
                {_id: {$nin: loggedDev.dislikes}}
            ],
        })
        
        return res.json(users);
    },

    //Armazena Devs
     async store(req, res){
        const {username} = req.body;
        const userExists = await Dev.findOne({user: username});

        if(userExists){
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        const { name, bio, avatar_url: avatar} = response.data;

        //salva usuário no db
        const dev = await Dev.create({
            name, user: username, bio, avatar
        });
        return res.json(dev);

}
}; 