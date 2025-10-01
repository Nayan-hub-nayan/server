const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // ✅ correct spelling
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
//securing password using pre method and bcrypt
userSchema.pre("save", async function(next){
  const user = this; //this all that may have save
  //check password is modified or not 
  if(!user.isModified("password")){
    next();
  }
  try {
    const saltRound=10;
    const hashPass = await bcrypt.hash(user.password,saltRound);
    user.password=hashPass;
  } catch (error) {
    next(error)
  }

})

userSchema.methods.genrateToken = async ()=>{
  //token genration logic
  try {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  } catch (error) {
    
  }
  
}
userSchema.methods.passCompare = async (pass)=>{

  return await bcrypt.compare(pass,userExist.password);
  
}
const userModel = mongoose.model("user2", userSchema); // ✅ Correct
module.exports = userModel; // ✅ Correct
