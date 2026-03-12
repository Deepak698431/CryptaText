import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import {success, z} from "zod"
import { usernameValidation } from "@/Schemas/signupSchemas";

const UsesrnameQuerySchema = z.object({
    username : usernameValidation
})

export async function GET(request:Request) {
    await dbConnect();
    try {
        // get the username in the url by get request
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username : searchParams.get('username')
        }
        // validate with zod
        const result = UsesrnameQuerySchema.safeParse(queryParam);
        console.log(result) //TODO: Remove
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                 success: false,
                 message : usernameErrors.length > 0 ? usernameErrors.join(", ") : 'Invalid query parameter'
            },{status:400})
        }
        const {username} = result.data
        const ExistingVerifiedUser = await userModel.findOne({
            username ,
            isVerified : true
        })
        if(ExistingVerifiedUser){
            return Response.json({
                 success: false,
                 message : "Username is already taken"
            },{status:400})
        }
        return Response.json({
            success: true,
            message : "Username is available"
        },{status:200})



    } catch (error) {
        console.error("Error in checking the Username " , error)
        return Response.json({
            success : false,
            message : "Error in checking in Username"
        },{status:500})
    }
}