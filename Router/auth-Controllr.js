const { query } = require('express');
const CartData = require('../MongoDB/CartSchema');
const Datauser = require('../MongoDB/userModel')
const bcrypt = require('bcrypt')
const validator = require('validator');
const ContectFormSchema = require('../MongoDB/ContectFormSchema');
// const buyData = require('../MongoDB/BuySchema');
const BuySchema = require('../MongoDB/BuySchema');
const home = async (req, res) => {
    try {
        res.status(200).send('Home router controler:)')

    } catch (error) {
        console.log(error); next(error)

    }
}
const about = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body
        const userExits = await Datauser.findOne({ email })
        if (userExits) {
            res.status(500).json({ msg: 'Exisit Email' })
        }

        //this tric is also valid:)
        //  const salt=10
        // const bcrypt_hash= await bcrypt.hash(password,salt)
        // const dataUser = await Datauser.create({ name, email, password:bcrypt_hash })

        //second method in model file:)
        // const dataUser = await Datauser.create({ name, email, password })




        // /JWT:)

        //JWT token stored in localstorage or cookies or clintSide  not in DB.
        //use for authenticaion And authorization
        //structure of JWT=>1.header  //which contain the metadat about token.
        //  2.payload //where we can add the user information as an entyty.
        //  3.Signature //it is a value which is only known by serever .


        // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
        // aB1@234@
        const validatorPassword = await validator.isStrongPassword(password);
        console.log(validatorPassword + ' tttt');
        if (!validatorPassword) {
            res.status(500).json({ msg: 'minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1' })
        }
        const dataUser = await Datauser.create({ name, email, password })

        res.status(201).json({ msg: 'registration Succesful:', token: await dataUser.getTokenJWT(), userId: dataUser._id.toString() })

    } catch (error) {
        console.log(error);
        // next(error)

    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password ,'ep');
        const userExist = await Datauser.findOne({ email });
        if (!userExist) {
            res.status(400).json({ msg: 'Invalid Credentials' })
        } else {
            // const validatorPassword = await validator.isStrongPassword(password);
            // console.log(validatorPassword + ' tttt');
            // if (!validatorPassword) {
            //     res.status(500).json({ msg: 'minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1' })
            // }
            // const password_compare=await bcrypt.compare(password,userExist.password)
            // console.log(password,'pawd');
            const password_compare = await userExist.paswordCompr(password)
            console.log(password_compare, 'tttttttttf');
            if (password_compare) {
                res.status(200).json({ msg: "login Succesful", token: await userExist.gtToknFrLogn(), userId: userExist._id.toString() })

            } else {
                res.status(401).json({ msg: "Envalid Email n Password " })

            }
        }

    } catch (error) {
        res.status(500).json({ msg: 'internal error' })
        // next(error)
    }
}
    ;
const user = async (req, res) => {

    const usserData = req.user;
    console.log('controlr');
    console.log(usserData);
    res.status(200).json({ msg: usserData })
}

const userAdmin = async (req, res) => {
    const data=req.user
    res.status(200).json({ ok: true,msg:data })
}
const qrCard = async (req, res) => {
    try {
        // const 
        res.end('<h1>QR code</h1>')
    } catch (error) {
        res.json({ msg: error })
    }
}



const cart = async (req, res) => {
    try {
        let { title, brand, price, Qunt, img, user_id, description, prodct_id } = req.body
        // const userExist = await CartData.find({ user_id })
        // console.log('userExist' );
        // console.log(userExist);
        // if (userExist) {


        const dataTxt = await CartData.find({ $and: [{ user_id }, { prodct_id }] })
        // const dataTxt=await CartData.find(prodct_id)
        console.log('txtxExist');
        console.log(dataTxt);
        if (dataTxt.length == 0) {

            const dataCart = await CartData.create({ user_id, title, brand, price, Qunt, img, description, prodct_id })
            res.status(200).json({ msg: dataCart })
        }
        else {
const dataUpdate= dataTxt[0]._id
console.log('id',dataUpdate);
const dataQuntUpdate = await CartData.findByIdAndUpdate({ _id:dataUpdate }, { Qunt ,price })

            // res.status(201).json({ msg: 'Data Allready In Cart:)' })

        }




    } catch (error) {
        res.json({ msg: error })
        console.log(error);
    }
}
const cartgt = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const dataCart = await CartData.find({ user_id })
        res.status(200).json({ msg: dataCart })
    } catch (error) {
        res.json({ msg: error })
        console.log(error);
    }
}
const cartDelet = async (req, res) => {
    const _id = req.params.id;
    const dataCart = await CartData.findByIdAndDelete({ _id })
    res.status(200).json({ msg: 'Data Deleted' })

}


const cartQunt = async (req, res) => {
    try {
        const { QunIncmnt, price, Qunt } = req.body
        const _id = req.params.id
        console.log(_id);
        const dataQuntUpdate = await CartData.findByIdAndUpdate({ _id }, { Qunt: QunIncmnt, price: price })
        console.log(dataQuntUpdate);
        res.status(200).json({ msg: dataQuntUpdate })

    } catch (error) {
        res.json({ msg: error })
        console.log(error);
    }
}
const cartGetAll = async (req, res) => {
    try {
        const dataQuntUpdate = await CartData.find({})
        console.log(dataQuntUpdate);

        const grapData = {
            smartPhone: '',
            laptop: "",
            fragrances: "",
            skincare: "",
            groceries: "",
            homeDecoration: ""

        }
        const smartPhone = await CartData.find({ $or: [{ brand: "Apple" }, { brand: "Huawei" }, { brand: "OPPO" }, { brand: "Samsung" }] })

        const laptop = await CartData.find({ $or: [{ brand: "Apple" }, { brand: "Microsoft Surface" }, { brand: "Infinix" }, { brand: "Samsung" }, { brand: "HP Pavilion" }] })

        const fragrances = await CartData.find({ $or: [{ brand: "Impression of Acqua Di Gio" }, { brand: "Royal_Mirage" }, { brand: "Fog Scent Xpressio" }, { brand: "Al Munakh" }, { brand: "Lord - Al-Rehab" }] })
        const groceries = await CartData.find({ $or: [{ brand: "Saaf & Khaas" }, { brand: "Bake Parlor Big" }, { brand: "Baking Food Items" }, { brand: "fauji" }, { brand: "Dry Rose" }] })
        const skincare = await CartData.find({ $or: [{ brand: "L'Oreal Paris" }, { brand: "Hemani Tea" }, { brand: "Dermive" }, { brand: "ROREC White Rice" }, { brand: "Fair & Clear" }] })
        const homeDecoration = await CartData.find({ $or: [{ brand: "Boho Decor" }, { brand: "Flying Wooden" }, { brand: "LED Lights" }, { brand: "luxury palace" }, { brand: "Golden" }] })
        console.log(fragrances);
        console.log(smartPhone);

        if (smartPhone) {
            grapData.smartPhone = smartPhone
        }
        if (laptop) {
            grapData.laptop = laptop

        }
        if (fragrances) {
            grapData.fragrances = fragrances

        }
        if (groceries) {
            grapData.groceries = groceries

        } if (skincare) {
            grapData.skincare = skincare

        }
        if (homeDecoration) {
            grapData.homeDecoration = homeDecoration

        }

        res.status(200).json({ msg: grapData })

    } catch (error) {
        res.json({ msg: error })
        console.log(error);
    }
}
const chat=async(req,res)=>{
    const {chat,sender_Id,recever_Id}=req.body
    console.log(chat,'cahtbyUser');
    console.log(sender_Id,'cahtbyAdmin');
    const dataPost =await ContectFormSchema.create({sender_Id,recever_Id,chat})
    console.log(dataPost,'dp');
}
const chatA=async(req,res)=>{
    const id=req.params.id
    console.log(id,'id');
const chatGt=await ContectFormSchema.find({recever_Id:id})
console.log(chatGt,'cg');
res.json({msg:chatGt})
}
const chatAllChatAdmin=async(req,res)=>{
    const id=req.params.id
    console.log(id,'id');
    // if(id=='dhfopta@gmail.com'){

    // }
   
//     ContectFormSchema.find({
//         $and: [
//             { $or: [{recever_Id: id}] }
//             // { $or: [{date_end: null}] }
//         ]
//     }
// )
    const chatGt=await   ContectFormSchema.find({
        $and: [
            {
                 $or: [{recever_Id: id},] },
            // { $or: [{sender_Id: id}] }
        ]
    }
)
res.json({msg:chatGt})
// console.log(chatGt,'cg..');
}

const chatAllChatUser=async(req,res)=>{
//     const id=req.params.id
//     console.log(id,'id');

    const chatGt=await   ContectFormSchema.find({
       
    }
)
res.json({msg:chatGt})
// console.log(chatGt,'cg..');
}
const BuyData=async(req,res)=>{
    console.log(req.body,"kkk");
   
const {UserName,UserId,date,ProductTitle,Pprice,Pquntt,Address,City,State,ZipCode,CardName,CardNumbr,Expmnth,Expyear,cvv}=req.body;
if(Address==undefined||City==undefined||State==undefined||ZipCode==undefined||CardName==undefined||CardNumbr==undefined||Expmnth==undefined||Expyear==undefined||cvv==undefined){
    res.status(400).json({ msg: 'Please fill all the data ' })
    console.log('nononono');

}else{
    const data=await BuySchema.create({UserName,UserId,date,ProductTitle,Pprice,Pquntt,Address,City,State,ZipCode,CardName,CardNumbr,Expmnth,Expyear,cvv});
    res.status(200).json({ msg: 'Payment Successful ' })
    console.log(data,'dadatta');
}
   


}
// const cartQunt = async (req, res) => {
//     try {
//         let { title, brand, price, Qunt, img, user_id, description, prodct_id, QunIncmnt } = req.body
//         console.log('vccvcvcv' + Qunt);
//         const dataTxt = await CartData.findOne({ $and: [{ user_id }, { prodct_id }] })
//         // const dataTxt=await CartData.find(prodct_id)
//         console.log('txtxExist');
//         console.log(dataTxt);
//         if (dataTxt) {
//             // const {q}=req.query
//             // const {QunUpdatet}=req.body
//             // console.log('q'+q);
//             // let q=Qunt++
//             const dataCart = await CartData.updateOne({ _id: dataTxt._id }, { Qunt: QunIncmnt })
//             res.status(200).json({ msg: dataCart })
//             // res.status(200).json({ msg: 'dataCart' })

//         }

//     } catch (error) {
//         res.json({ msg: error })
//         console.log(error);
//     }
// }
module.exports = { home, about, login, user, userAdmin, cart, cartgt, cartDelet, cartQunt, cartGetAll,chat,chatA,chatAllChatAdmin,chatAllChatUser,BuyData, qrCard } 