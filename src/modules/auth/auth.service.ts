import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";

const googleClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Email & Password Login
const loginUser = async (payload: any) => {
  const user = await UserService.findUserByEmail(payload.email);
  if (!user || !user.password) throw new Error("Invalid credentials");

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatched) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  return { user, token };
};

// Google Login
const googleLogin = async (credential: string) => {
  // Verify token from Google
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  });
  
  const payload = ticket.getPayload();
  if (!payload || !payload.email) throw new Error("Invalid Google Token");

  let user = await UserService.findUserByEmail(payload.email);

  // If user doesn't exist, create a new one
  if (!user) {
    user = await User.create({
      name: payload.name,
      email: payload.email,
      googleId: payload.sub,
      avatar: payload.picture,
      role: "user",
    });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  return { user, token };
};

export const AuthService = {
  loginUser,
  googleLogin,
};