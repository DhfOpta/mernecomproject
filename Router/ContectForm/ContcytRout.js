const express=require('express')
const routr=express.Router()
const contctFun=require('./contctControll')
const contctSchema=require('D:/reactfirst/mern/Server/Validator/contect-validator.js')
const ValidatContect=require('D:/reactfirst/mern/Server/zodValidatr/contectValidtr.js')
routr.route('/').post(ValidatContect(contctSchema),contctFun);
module.exports=routr