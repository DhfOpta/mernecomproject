const { Schema, model } = require('mongoose')

const BuyDataSchema = new Schema({
    UserName: { type: String },
    UserId: { type: String },

    date: {
        type: Date, default: new Date()
    },
    ProductTitle: {
        type: String, required: true
    },
    Pprice: {
        type: Number, required: true
    },
    Pquntt: {
        type: Number, required: true
    },
   
    Address: {
        type: String, required: true

    },
    City: {
        type: String, required: true

    }
    , State: {
        type: String, required: true

    }, ZipCode: {
        type: String, required: true

    },
    CardName: {
        type: String, required: true

    },
    CardNumbr: {
        type: String, required: true

    }, Expmnth: {
        type: String, required: true

    },
    Expyear: {
        type: String, required: true

    }, cvv: {
        type: String, required: true

    }


})
module.exports = model('UserBuyData', BuyDataSchema)

