const Contect=require('D:/reactfirst/mern/Server/MongoDB/ContectFormSchema')
const contctFun=async(req,res)=>{
    try {
        
        const contctData= req.body;
      const dataContct=  await Contect.create(contctData)
      console.log(dataContct);
        res.status(200).json({msg:"Send Successfull"})
    } catch (error) {
        res.status(400).json({msg:"Not Send Successfull"})
    }
}

module.exports=contctFun