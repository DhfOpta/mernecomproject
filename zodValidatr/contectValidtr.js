// const { schema } = require("../MongoDB/ContectFormSchema");

const ValidatContect=(schema)=>async(req,res,next)=>{
    try {
        const contcData=await schema.parseAsync(req.body)
        req.body=contcData
        next()
    } catch (error) {
        const er=error.issues[0].message
        res.json({msg:er})
    }
};
module.exports=ValidatContect