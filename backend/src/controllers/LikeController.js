const Dev = require('../models/Dev');

module.exports = {
    async store(req,res){

        const {devId} = req.params;
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        //verifica se o dev likado não existe
        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists'});
        }

        //verifica o match
        if(targetDev.likes.includes(loggedDev._id)){

            //user que deu o like
            const loggedSocket = req.connectedUsers[user];

            //user que recebeu o like
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            console.log("its a match!!");
                
            }
            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);
            console.log("its a match!!");
                
            }
        }

        //concatena os devs likados no array de likes que está no mongo
        loggedDev.likes.push(targetDev._id);

        //salva os likes
        await loggedDev.save();
        
        return res.json(loggedDev)
    }
}