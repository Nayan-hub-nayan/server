const {z} = require('zod');

// Define the schema for contact validation

const serviceValidate = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    description: z.string().min(10, "Message must be at least 10 characters long").max(500, "Message must be at most 500 characters long"),
    image: z.string("must be a number"),
})
const validateService = (data) => {
    try {
        result= serviceValidate.parse(data)
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
module.exports = {serviceValidate,validateService};