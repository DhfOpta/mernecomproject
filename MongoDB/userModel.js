const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dataSchemaUser = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    isAdmin: {
        type: Boolean, default: false
    }
});


//bcrypt password start:)
//save:before  controller save the data  in DB ,this part run:)  
dataSchemaUser.pre('save', async function (next) {
    console.log("pre " + this);
    const user = this;
    console.log(user,'user');
    if (!user.isModified('password')) {
        //next  is a middelware:)
        next();//if password is not changing then  goto next staep that is store in DB steap
    }
    try {
        const salt = await bcrypt.genSalt(10);

        const bcrypt_hash =await bcrypt.hash(user.password, salt)
        console.log("123456799",bcrypt_hash)
        user.password = bcrypt_hash
    } catch (error) {
        next(error);
    }
});
//bcrypt password end:)



//this is called instance method.
//we  can create many instance method. 
//JWT:)
dataSchemaUser.methods.getTokenJWT = async function () {
    try {
        return jwt.sign(
            //payload
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin

            }
            //Signature
            , process.env.JWT_TKEY,
            //
            { expiresIn: '.5d' })
    } catch (error) {
        console.error(error);
    }
}

dataSchemaUser.methods.gtToknFrLogn = async function () {
    try {
        return jwt.sign({
            email: this.email,
            password: this.password
        },
            process.env.JWT_TKEY, { expiresIn: "1d" })
    } catch (error) {
        console.error(error)
    }
}
dataSchemaUser.methods.paswordCompr = async function (thi) {
    try {
        console.log(this,"this");
        console.log(thi,':thi');
        const data=await bcrypt.compare(thi,this.password)
        console.log(data,'datadata');
        if (data) {console.log(data,'datadatadatadatadatadaytafdata');}
            return  await bcrypt.compare(thi,this.password) 
        // }else{ return false}
        
    } catch (error) {
        console.error(error)
    }
}

const Datauser = new mongoose.model('Datauser', dataSchemaUser);

module.exports = Datauser;
