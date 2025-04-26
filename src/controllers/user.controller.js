import { apierror } from "../utils/apiError.js";
import { apiresponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";



const registerUser = asynchandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullName, email, password } = req.body
    console.log("email: ", email);

    if (
        [fullName, email,  password].some((field) => field?.trim() === "")
    ) {
        throw new apierror(400, "All fields are required")
    }

    const existedUser = await User.findOne({email})

    if (existedUser) {
        throw new apierror(409, "User with email  already exists")
    }
    //console.log(req.files);

    
   

    const user = await User.create({
        fullName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new apierror(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new apiresponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asynchandler (async(req,res)=>{
    //req body ->data
    // check username and email
    // find user
    //check password
    // access token and refresh token
    //send cookies

    const { email, password}= req.body

    if(!email){
        throw new apierror(400, "username or email is required")
    }
        const user =await User.findOne({email })
    if (!user) {
        throw new apierror (404, "the user is not registered")   
    }
    const isPasswordvalid= await user.isPasswordCorrect(password)
    if (!isPasswordvalid) {
        throw new apierror (401, "password is incorrect")      
    }
   

   const loggendUser= await User.findById(user._id).
   select("-password ")

   return res.status(200)
   .json(
        new apiresponse(
                200,
                {
                    user: loggendUser
                },
  
                "user loggend sucessfully"
            ))
})



export {
    registerUser,
    loginUser
}