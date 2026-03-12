import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import { now } from "mongoose";

export async function POST(request : Request){
    await dbConnect();
    try {
        const {username , verifyCode} = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await userModel.findOne({
            username : decodedUsername
        })
        if(!user){
            return Response.json({
            success : false,
            message : "User not found"
            },{status:500})
        }
        const isCodeValid = user.verifyCode === verifyCode;
        const UserNotExpiry = new Date(user.verifyCode_Expiry) > new Date()
        if(isCodeValid && UserNotExpiry){
            console.log("Validity is here total")
            user.isVerified = true;
            await user.save()
            return Response.json({
            success : true,
            message : "Account Varified Successfully"
            },{status:200})
        }
        else if(isCodeValid){
            return Response.json({
            success : false,
            message : "Time exceeded for Varification code. Please signup again to get a new code"
            },{status:500})
        }
        else{
            console.log("no validity is here ")
            return Response.json({
            success : false,
            message : "Varification code is incorrect "
            },{status:500})
        }

    } catch (error) {
        console.error("Error in Verifying user " , error)
        return Response.json({
            success : false,
            message : "Error in Verifying user"
        },{status:500})
    }
}

