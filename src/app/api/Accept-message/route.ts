import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import { User } from "next-auth";

export async function POST(request:Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success : false , 
            message : "Not Authonticate" 
        } , {status : 401})
    }
    const userID = user._id
    const {acceptMessage} = await request.json()
    try {
       const updatedUser =  await userModel.findOneAndUpdate({_id :userID }, {isAcceptingMessage : acceptMessage} , {new : true})
       if(!updatedUser){
        return Response.json({
            success : false , 
            message : "Failed to update the status"
        } , {status : 401})
       }
       else {
        return Response.json({
            success : true , 
            message : "Message is successfully updated"
        } , {status : 200})
    }
        
    } catch (error) {
        console.log("Failed to update the status")
        return Response.json({
            success : false , 
            message : "Failed to update the status"
        } , {status : 500})
    }

}
export async function GET(request:Request) {
     await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success : false , 
            message : "Not Authonticate" 
        } , {status : 401})
    }
    const userID = user._id
    try {
        const foundUser = await userModel.findById(userID)
        if(!foundUser){
            return Response.json({
                success : false , 
                message : "Failed to found the user"
            } , {status : 404})
        }
        return Response.json({
                success : true , 
                isAcceptingMessage : foundUser.isAcceptingMessage
            } , {status : 200})
    } catch (error) {
         console.log("Error in getting the message acceptence status")
        return Response.json({
            success : false , 
            message : "Error in getting the message acceptence status"
        } , {status : 500})
    }
}