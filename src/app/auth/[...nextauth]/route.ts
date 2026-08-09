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
    // যখন ইউজার গুগল দিয়ে লগইন করবে
    async signIn({ user, account }) {
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
            });
          }
          return true; // লগইন সফল
        } catch (error) {
          console.error("Error saving user:", error);
          return false;
        }
      }
      return true;
    },
    // টোকেনে ইউজারের ডাটাবেস ID এবং Role যুক্ত করা
    async jwt({ token, user, account }) {
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
    // সেশনে ইউজারের ID এবং Role পাস করা যাতে ফ্রন্টএন্ডে পাওয়া যায়
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
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