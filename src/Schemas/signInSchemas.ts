// this is for final sign in into the website
import {z} from 'zod'

export const signInSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(1, "Password is required")
});