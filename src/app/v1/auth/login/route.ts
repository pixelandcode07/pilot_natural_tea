import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { User } from "@/modules/user/user.model";

export async function POST(req: NextRequest) {
  try {
    // ১. ডাটাবেস কানেক্ট করা
    await connectDB();
    
    // ২. রিকোয়েস্ট থেকে ইমেইল ও পাসওয়ার্ড নেওয়া
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required!" }, 
        { status: 400 }
      );
    }

    // ৩. ডাটাবেসে ইউজার আছে কি না চেক করা
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials! User not found." }, 
        { status: 401 }
      );
    }

    // ৪. পাসওয়ার্ড ম্যাচ করা
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials! Wrong password." }, 
        { status: 401 }
      );
    }

    // ৫. JWT টোকেন তৈরি করা
    const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    // ৬. কুকিতে টোকেন সেট করে রেসপন্স পাঠানো
    const response = NextResponse.json(
      { 
        success: true, 
        message: "Login successful", 
        data: { _id: user._id, name: user.name, email: user.email, role: user.role } 
      }, 
      { status: 200 }
    );
    
    // Set HTTP-only Cookie
    response.cookies.set("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      path: "/", 
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;

  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong!" }, 
      { status: 500 }
    );
  }
}