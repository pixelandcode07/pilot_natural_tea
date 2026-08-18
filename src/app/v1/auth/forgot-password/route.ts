import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/modules/user/user.model";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 });
    }

    // 📌 টোকেন তৈরি (১৫ মিনিটের জন্য ভ্যালিড)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // 📌 ইমেইল পাঠানো
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Pilot Natural Tea" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to set a new password. This link is valid for 15 minutes.</p>
          <a href="${resetLink}" style="background: #F58634; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Reset Password</a>
          <p style="margin-top: 20px; font-size: 12px; color: gray;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Password reset link sent to your email." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}