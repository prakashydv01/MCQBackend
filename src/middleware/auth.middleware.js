import { asynchandler } from "../utils/asyncHandler";
import { apierror } from "../utils/apiError";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const verifyJWT= asynchandler (async (req , _ , next)=>
    {
       try {
           const token= req.cookies?.accessToken || req.header ("Authorization")?.replace("bearer", "")
       
           if (!token) {
               throw new apierror(401, "unauthorization access")  
           }
           const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
       
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
       
            if (!user) {
               throw new apierror(401, "invalid accessToken")
            }
            req.user= user;
            next()
       } catch (error) {
           throw new apierror(401, error?.message || "invalid access Token")
       }
   })