import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user"; 

// This is basically the sign in logic
export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials : any) : Promise<any>{
                await dbConnect();
                try {
                    const user = await userModel.findOne({
                        $or : [
                            {email : credentials.identifier},
                            {username : credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("No User found with this email");
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account first before login");
                    }
                    const isPassword = await bcrypt.compare(credentials.password, user.password)
                    if(!isPassword){
                        throw new Error("Password is incorrect");
                    }
                    else{
                        return {
                            _id: user._id.toString(),
                            email: user.email,
                            username: user.username,
                            isVerified: user.isVerified,
                            isAcceptingMessage: user.isAcceptingMessage,
                        };
                    }
                } catch (err : any) {
                    throw new Error(err);
                }
            }
            })
        ],
        callbacks:{
            async jwt({token , user}){
                if(user){
                    token._id = user._id?.toString();
                    token.isVerified = user.isVerified;
                    token.isAcceptingMessage = user.isAceptingMessage;
                    token.username = user.username;
                }
                return token;
            },
            async session({token , session}){
                if(token){
                    session.user._id = token._id as string;
                    session.user.isVerified = token.isVerified as boolean;
                    session.user.isAceptingMessage = token.isAceptingMessage as boolean;
                    session.user.username = token.username as string;
                }
                return session;
            },
        },
        pages: {
            signIn: '/signin'
        },
        session:{
            strategy : "jwt"
        }
        
    }
    secret: process.env.NEXTAUTH_SECRET