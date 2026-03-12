import  {resend}  from "@/lib/resend";
import VerificationEmail from "../../components/emails/VerificationEmail";
import { ApiResponse } from "@/types/API_Response";

export async function sendVarificataionEmail(
    email : string,
    username : string ,
    verifyCode : string
) : Promise<ApiResponse>{
    try{
        const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Varification code ',
        react: VerificationEmail({username , verifyCode})
    });
        return {success : true , message : "successfully Email is send"}
    }catch(Emailerror){
        console.log("Error Sending in Email" , Emailerror)
        return {success : false , message : "Failed to send Email"}
    }
}