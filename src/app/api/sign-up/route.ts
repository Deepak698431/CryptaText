import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import bcrypt from "bcrypt"
import { sendVarificataionEmail } from "@/helpers/sendVerificationEmail";
import { date, success } from "zod";

export async function POST(request : Request){
    await dbConnect ()
    try {
        const {username , email , password} = await request.json() 
        const ExistingUserVerifiedByUsername = await userModel.findOne({
            username  ,
            isVerified : true
        })
        if(ExistingUserVerifiedByUsername){
            return Response.json({
                success : false , 
                message : "Username is Already existes" 
            } , {status : 400})
        }
        const existingUserByEmail = await userModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success : false , 
                    message : "User already exists with this email" 
                } , {status : 400})
            }
            else{
                const hashedPassword = await bcrypt.hash(password , 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.username = username;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCode_Expiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save();
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password , 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+1)
 
            const newUser = new userModel({
                    username ,
                    email ,
                    password : hashedPassword,
                    verifyCode ,
                    verifyCode_Expiry : expiryDate,
                    isVerified : false ,
                    isAcceptingMessage : true,
                    message : [] 
            })
            await newUser.save()
        }
        // send email verification 
        const emailResponse = await sendVarificataionEmail(
            email ,
            username ,
            verifyCode
        )
        if(!emailResponse.success){
            return Response.json({
                success : false ,
                message : emailResponse.message
            }, {status : 500})
        }
        return Response.json({
                success : true ,
                message : "User Regestration Successfully. Please verify your Email!"
            }, {status : 201})
    } catch (error) {
        console.error("Error regestering user" , error)
        return Response.json(
            {
                success : false,
                message : "Error regestration user"
            },
            {
                status : 500
            }
        )
    }
}