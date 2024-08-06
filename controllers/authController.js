const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// JWT token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

// Register
exports.registerController = async (res, req, next) => {
  try {
    const { username, email, password } = req.body;
    // existing user
    const exisitingEmail = await userModel.findOne({ email });
    if (exisitingEmail) {
      return next(new errorResponse("Email already registerd", 500));
    }
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Login
exports.loginController = async (res,req,next) => {
    try {
        const {email,password} = req.body
        // validation
        if(!email || !password){
            return next(new errorResponse("Please provide email or password"));
        }
        const user = await userModel.findOne({email});
        if(!user){
            return next(errorResponse("Invalid creditial", 401))
        }
        const isMatch = await userModel.matchPassword(password);
        if(!isMatch){
            return next(errorResponse("Invalid creditial", 401))
        }
        // res
        sendToken(user,200,res);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
// LogOut
exports.logoutController = async (res,req) => {
    res.clearCookie("refreshToken")
    return res.status(200).json({
        success : true,
        message : "Logout Successfully"
    })
};
