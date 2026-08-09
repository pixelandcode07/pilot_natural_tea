import { z } from "zod";

export const AuthValidation = {
  loginSchema: z.object({
    email: z.string({ message: "Email is required" }).email("Invalid email address"),
    password: z.string({ message: "Password is required" }),
  }),
  
  googleLoginSchema: z.object({
    credential: z.string({ message: "Google credential token is required" }),
  }),
};