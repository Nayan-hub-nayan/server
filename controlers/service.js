const serviceModel = require("../models/service-model");
const { validateService } = require("../validation/sevice-validate");
const addservice = async (req,res)=>{
    try {
        const msg =req.body;
        //validate the contact data
        const validationResult = validateService(msg); //function to validate the contact data
        //if validation fails, send error response
        if(!validationResult.success){
        
        return res.status(400).json({msg:"Validation failed", error: validationResult.err});
        }
        console.log(validationResult);
        console.log(msg);
        const {name,description , image}=req.body;
        console.log(name,description,image);
        const newService = await serviceModel.create({name,description,image});
        res.status(200).json({service:newService});
        console.log("Service added successfully");        
    } catch (error) {
            console.error("Service add Failed:",error);        

    }
}
module.exports={addservice};