const mongoose = require('mongoose')
const ProductData=require('../../../qrcode/src/Components/TASK/BACKEND/mongProdct')
const productdataStructur=require('../../../qrcode/src/Components/TASK/BACKEND/mongProdct')
const cartData = new mongoose.Schema({
    user_id:{type:Object},
    prodct_id:{type:Object},
    // prodct_id: [{ type: productdataStructur.Types.id, ref: ProductData }],

    title: {
        type: String, required: true
    },
    brand: {
        type: String, required: true
    },
    Qunt: {
        type: Number, required: true
    },
    price: {
        type: Number,required: true
    },
    img: {
        type: String,required: true
    }
    ,
    description:{
        type: String, required: true

    }
});
const CartData = new mongoose.model('CartData', cartData)
module.exports=CartData