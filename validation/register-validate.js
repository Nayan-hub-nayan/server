const {z} = require('zod');

// Define the schema for contact validation

const registerValidate = z.object({
    username: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string("must be a number").min(8, "Password must be 8 digits long").max(100, "Phone number must be at most 15 digits long"),
})
const validateRegister = (data) => {
    try {
        result= registerValidate.parse(data)
        return { success: true, data: result };
    } catch (error) {
        msg = error.message
        const errors = JSON.parse(msg); // now it's an array of objects
        const errr=[];
        // errors.forEach(err => {
        //     errr.push(err.message);
        // console.log(err.message);
        // });
        const err= errors[0].message
        return {  err  };
        
    }
}
module.exports = {registerValidate,validateRegister};