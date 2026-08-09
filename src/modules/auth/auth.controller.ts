import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "./auth.service";
import { AuthValidation } from "./auth.validation";
import { UserValidation } from "../user/user.validation";
import { UserService } from "../user/user.service";

// Register
export const registerController = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = UserValidation.createUserSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await UserService.findUserByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    const newUser = await UserService.createUser(validatedData);
    return NextResponse.json({ success: true, data: newUser, message: "User registered successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};

// Login
export const loginController = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = AuthValidation.loginSchema.parse(body);
    
    const { user, token } = await AuthService.loginUser(validatedData);

    const response = NextResponse.json({ success: true, message: "Login successful", data: user });
    
    // Set HTTP-only Cookie
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 7 * 24 * 60 * 60 });
    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
};

// Google Login
export const googleLoginController = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { credential } = AuthValidation.googleLoginSchema.parse(body);
    
    const { user, token } = await AuthService.googleLogin(credential);

    const response = NextResponse.json({ success: true, message: "Google Login successful", data: user });
    
    // Set HTTP-only Cookie
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 7 * 24 * 60 * 60 });
    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
};

// Logout
export const logoutController = async () => {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete("token");
  return response;
};