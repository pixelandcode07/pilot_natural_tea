import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/modules/user/user.model";

export async function POST(req: NextRequest) {
  try {
    // ১. ডাটাবেস কানেকশন
    await connectDB();
    
    // ২. ফ্রন্টএন্ড থেকে আসা ডেটা রিসিভ করা
    const body = await req.json();
    const { name, email, password } = body;

    // ৩. ভ্যালিডেশন (কোনো ফিল্ড ফাঁকা আছে কি না)
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required!" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // ৪. ইমেইলটি আগে থেকেই আছে কি না চেক করা
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email! Please sign in." },
        { status: 400 }
      );
    }

    // ৫. নতুন ইউজার তৈরি করা (পাসওয়ার্ড user.model.ts এর কারণে অটোমেটিক Hash হয়ে যাবে)
    const newUser = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    // ৬. সাকসেস রেসপন্স পাঠানো
    return NextResponse.json(
      { success: true, message: "Account created successfully!", data: newUser },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong!" },
      { status: 400 }
    );
  }
}