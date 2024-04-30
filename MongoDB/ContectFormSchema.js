const { Schema, model } = require('mongoose')

const ContectSchem = new Schema({
    sender_Id: {
        type: String
    },
    recever_Id: {
        type: String
    },
    chat: {
        type: String
    }
})
module.exports = model('Contect', ContectSchem)