// this is the regestration Schema
import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2 , "Username must be at least  2 charator")
    .max(20,  "Username must be atmost 20 charator")
    .regex(/^[a-zA-Z0-9]{3,15}$/,"Username must not contain special charator")

export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email("Invalid Email"),
    password : z.string().min(20 , "Password must be minimum of 20 charactor")
}); 