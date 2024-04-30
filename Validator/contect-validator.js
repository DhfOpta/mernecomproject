const {z}=require('zod')


const contctSchema=z.object({
    username:z.string({required_error:"UserName Field require"}).trim().min(3,{message:"Username must Be a 3 charaters"}),
    email:z.string({required_error:"Email is required"}).email({required_error:"Email fill is wrong"}).trim(),
    message:z.string().trim().min(3,{message:"Message must be 3 latter"})

})
module.exports=contctSchema