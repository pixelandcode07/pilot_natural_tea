import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/modules/user/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ success: false, message: "Invalid request!" }, { status: 400 });
    }

    // 📌 টোকেন ভেরিফাই করা
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded.id) {
      return NextResponse.json({ success: false, message: "Invalid or expired token!" }, { status: 400 });
    }

    // 📌 পাসওয়ার্ড হ্যাশ করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 📌 ডাটাবেস আপডেট করা
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    return NextResponse.json({ success: true, message: "Password updated successfully! You can login now." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Invalid or expired token!" }, { status: 400 });
  }
}