const jwt = require("jsonwebtoken");
const Datauser = require('./MongoDB/userModel')

const dataValidt = async (req, res, next) => {
    const tokn = await req.header('Authorization')
    console.log('validate' + tokn);
    if (!tokn) {
        res.status(500).json({ msg: "Invalid HTTP Request" })
    } 
    else {
        try {
            const datTokn = await jwt.verify(tokn, process.env.JWT_TKEY)
            console.log('tknData ');
            console.log(datTokn);
            const userComplTDTa = await Datauser.findOne({ email: datTokn.email }).select({ password: 0 })
            console.log(userComplTDTa);
            if (userComplTDTa) {
                req.user = userComplTDTa;
                req.tokn = datTokn
                req.id = userComplTDTa._id
                next()
    
            }
    
        } catch (error) {
    
            res.status(500).json({ msg: 'JWT VERYFY ERR: ' + error })
            // throw(error)
            // next()
        }
    }

    

}



const dataAuthValidt = async (req, res, next) => {
    const tokn = await req.header('Authorization')
    console.log('validate' + tokn);


    try {
        if (!tokn) {
            res.status(500).json({ msg: "Invalid HTTP Request" })
        }else{
            const datTokn = await jwt.verify(tokn, process.env.JWT_TKEY)
            console.log('tknData ');
            console.log(datTokn);
            const userComplTDTa = await Datauser.findOne({ email: datTokn.email }).select({ password: 0 })
            console.log(userComplTDTa);
            if (userComplTDTa.isAdmin) {
                req.user = userComplTDTa;
                req.tokn = datTokn
                req.id = userComplTDTa._id
                next()
            }
        }
       
        //         else {
        // // res.status(500).json({ok:false})
        // // next()
        //         }

    } catch (error) {
        res.status(500).json({ msg: 'JWT VERYFY ERR: ' + error })
    }

}




module.exports = { dataValidt, dataAuthValidt }