const {z}=require('zod')
const signUpSchema=z.object({
    name:z.string({required_error:"Name required"}).trim().min(3,{message:"Name must be  at leat 3 Charater"}),
    email:z.string({required_error:"Email required"}).trim().email({message:"Invalid Email Address"}),
    password:z.string({required_error:"Password require"}).trim()
    // .min(8,{message:'Password must be 8 Charater'})
})

const loginSchema=z.object({
    // name:z.string({required_error:"Name required"}).trim().min(3,{message:"Name must be  at leat 3 Charater"}),
    email:z.string({required_error:"Email required"}).trim().email({message:"Invalid Email Address"}),
    password:z.string({required_error:"Password require"}).trim()
})
module.exports={signUpSchema,loginSchema};