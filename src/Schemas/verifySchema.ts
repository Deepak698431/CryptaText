// this is the verification via OTP etc
import {z} from 'zod'

export const verifySchema = z.object({
    code : z.string()
    .length(6 , "Verification code must be 6 digits")
    .regex(/^[0-9]+$/, "Code must contain only numbers")
});