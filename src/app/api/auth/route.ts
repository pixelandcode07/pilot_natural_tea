import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import { User } from "@/modules/user/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // ১. যখন ইউজার গুগল দিয়ে লগইন করবে (টাইপ ফিক্স করা হয়েছে)
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === "google") {
        await connectDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          
          // যদি ডাটাবেসে ইউজার না থাকে, তবে নতুন ইউজার তৈরি করবে
          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              googleId: user.id,
              avatar: user.image,
              role: "user",
              status: "Active" // 📌 Status Active রাখা জরুরি
            });
          }
          return true; 
        } catch (error) {
          console.error("Error saving user:", error);
          return false;
        }
      }
      return true;
    },
    
    // ২. টোকেনে ইউজারের ডাটাবেস ID এবং Role যুক্ত করা (টাইপ ফিক্স করা হয়েছে)
    async jwt({ token, user, account }: { token: any; user: any; account: any }) {
      if (account?.provider === "google" && user?.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        }
      }
      return token;
    },
    
    // ৩. সেশনে ইউজারের ID এবং Role পাস করা (টাইপ ফিক্স করা হয়েছে)
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };