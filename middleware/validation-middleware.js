const validateContact = (data) => {
    try {
        return contactValidate.parse(data)  ;
    } catch (error) {
        msg = error.message
        const errors = JSON.parse(msg); // now it's an array of objects
        const errr=[];
        // errors.forEach(err => {
        //     errr.push(err.message);
        // console.log(err.message);
        // });
        const err= errors[0].message
        return { success: false,err  };
        
    }
}
module.exports = {validateContact};