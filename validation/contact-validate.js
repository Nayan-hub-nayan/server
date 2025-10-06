const {z} = require('zod');

// Define the schema for contact validation

const contactValidate = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    phoneno: z.string("must be a number").min(10, "Phone number must be at least 10 digits long").max(10, "Phone number must be at most 15 digits long"),
    message: z.string().min(10, "Message must be at least 10 characters long").max(500, "Message must be at most 500 characters long"),
})
const validateContact = (data) => {
    try {
        result= contactValidate.parse(data)
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
module.exports = {contactValidate,validateContact};