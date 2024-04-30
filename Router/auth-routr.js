const express=require('express');
const {home,about,login,user,userAdmin,cart,cartgt,cartDelet,cartQunt,cartGetAll,chat,chatA,chatAllChatAdmin,chatAllChatUser,BuyData,qrCard} = require('./auth-Controllr');
const validate = require('../zodValidatr/validtr');
const {signUpSchema,loginSchema} = require('../Validator/auth-validatorzod');
const {dataValidt,dataAuthValidt} = require('../newMiddleWqareForJWT Verify');
const routr=express.Router();

routr.route('/').get(home);
routr.route('/register').post(validate(signUpSchema), about);
routr.route('/login').post(validate(loginSchema),login);
routr.route('/user').get(dataValidt,user);
routr.route('/admin').get(dataAuthValidt,userAdmin);
routr.route('/Cart').post(cart);
routr.route('/Cart').get(cartGetAll);

routr.route('/Cart/:id').patch(cartQunt);

routr.route('/Cartgt/:user_id').get(cartgt);
routr.route('/Cart/:id').delete(cartDelet);
routr.route('/cahtbyUser').post(chat);
routr.route('/cahtbyUser/:id').get(chatAllChatAdmin);
routr.route('/cahtbyUser/').get(chatAllChatUser);

routr.route('/cahtbyUser/:id').get(chatA);
routr.route('/BuyData').post(BuyData);

// validate(loginSchema),
routr.route('/qrCard').get(qrCard);


module.exports=routr