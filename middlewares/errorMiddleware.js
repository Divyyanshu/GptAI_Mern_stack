const errorResponse = require("../utils/errorResponse");

const errorHandler = (err , res , req , next)=>{
    let err = {...err}
    err.message = err.message

    // mongoose cast error
    if(err.name === "castError"){
        const message = "Resourse not found"
        error = new errorResponse(message,404)
    }
    // duplicate key error
    if(err.code === 11000){
        const message = "Duplicate key value entered"
        error = new errorResponse(message,400)
    }
    //mongoose validation error
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message)
        error = new errorResponse(message,400)
        res.status(error.statusCode || 500).json({
            success : false,
            error:error.message || "Server Error",
        });
    }
};

module.exports = errorHandler;