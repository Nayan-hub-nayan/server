const contactModel = require("../models/contact-model");
const { validateContact }= require("../validation/contact-validate.js");
// Controller function to handle contact page requests
const contact = async(req, res) => {
  
  try {
    const msg =req.body;
    //validate the contact data
    const validationResult = validateContact(msg); //function to validate the contact data
    //if validation fails, send error response
    if(!validationResult.success){
      
      return res.status(400).json({msg:"Validation failed", error: validationResult.err, success: false});
    }
    console.log(validationResult);
    // Destructure name, email, number, and message from the request body
    const {name,email,number,message} = msg;
    const newContact = await contactModel.create({name,email,number,message})
    res.status(200).json({contact:newContact ,success: true, msg: "Message sent successfully" });
    console.log("Message sent successfully");
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
    console.error(error);
  }
}
module.exports = { contact };