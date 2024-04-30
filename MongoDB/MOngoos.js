const mongoose=require('mongoose')

const URI=process.env.MONGODB_URI
const conctDb=async()=>{
    try {
     await mongoose.connect(URI)
     console.log('conct DB')  
    } catch (error) {
        console.log(error);
   process.exit(0)
    }
}
module.exports=conctDb