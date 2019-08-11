const {Schema, model} = require('mongoose');

const DevSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    bio: String,
    avatar:{
        type: String,
        required: true
    },
    //associando os likes e dislikes com o ID criado automaticamente
    likes: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],

}, 
{   timestamps: true    });

module.exports = model('Dev', DevSchema);