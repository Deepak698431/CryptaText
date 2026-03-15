import userModel from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import { sendVarificataionEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request : Request){
    await dbConnect();
    try {
        const {username} = await request.json();
        const user = await userModel.findOne({
            username
        })
        if(!user){
            return Response.json({
                success : false , 
                message : "User does not found" 
            } , {status : 400})
        }
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        user.verifyCode = verifyCode;
        user.verifyCode_Expiry = new Date(Date.now() + 3600000)
        user.save();
        
        const emailResponse = await sendVarificataionEmail(
            user.email ,
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
                message : "Email send Successfully."
        }, {status : 201})

    } catch (error) {
        console.log("Error in sending Email")
    }
}