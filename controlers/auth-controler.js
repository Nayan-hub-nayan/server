// Import the user model to interact with the MongoDB users collection
const userModel = require("../models/user-model");
const { validateRegister } = require("../validation/register-validate");


// Hash the password using bcrypt for security
const bcrypt = require("bcrypt");
// Controller function to handle user registration
const register = async (req, res) => {
  try {
    // Log the incoming request body for debugging
    console.log(req.body);
    const validationResult = validateRegister(req.body); //function to validate the contact data
        //if validation fails, send error response
    if(!validationResult.success){
        
        return res.status(400).json({msg:"Validation failed", error: validationResult.err});
    }
    // Destructure username, email, and password from the request body
    const { username, email, password } = req.body;

    // Check if a user with the same email already exists in the database
    const userExist = await userModel.findOne({ email });

    // If a user is found, return an error response
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists", name: userExist.username }, console.log("Email already exists"));
    }
    // Hash the password using bcrypt for security
    // const saltRound=10;
    // const hashPass = await bcrypt.hash(password,saltRound);

    // Replace the plain text password with the hashed password
    
    // Create a new user in the database with the given data
    const newUser = await userModel.create({ username, email, password });

    // Send a success response with the newly created user's data
    res.status(200).json({newuser: newUser , msg: "User registered successfully", token: await newUser.genrateToken(), id: newUser._id.toString() });

    // Log a success message to the console
    console.log(`${username} registered successfully`);
  } catch (error) {
    // Log any errors that occur
    console.error(error);

    // Send a generic server error response
    res.status(500).json({ msg: "Server error" });
  }
};

//Login function
const login = async (req, res) => {
  user =req.body;
  const {email,password} = user;
  try {
    userExist = await userModel.findOne({email});
    if(!userExist){
      return res.status(400).json({msg:"User not found"});
    }
    const isMatch= await bcrypt.compare(password,userExist.password);
    //const isMatch = userExist.passCompare(password)
    if(!isMatch){
      return res.status(400).json({msg:"Invalid credentials or plase Enter valid password"});
    }
    res.status(200).json({user:userExist, token: await userExist.genrateToken(), id: userExist._id.toString() });
  } catch (error) {
    res.status(500).json({msg:"Server error"})
  }
}

// Controller function to handle the root "/" GET route
const home = (req, res) => {
  // Send a simple message when the home route is hit
  res.send("Home page running");
};

// Export the controller functions so they can be used in other files
module.exports = { register, login , home };
