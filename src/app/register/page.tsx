"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { 
  UserRound, 
  KeyRound, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail,
  MapPin
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // API পাথ আপডেট করা হয়েছে: /v1/auth/register
      const res = await fetch("/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          // address: formData.address // মডেল অনুযায়ী যদি address অ্যাড করেন, তবে এটি আনকমেন্ট করবেন
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      setSuccess("Account created successfully! Redirecting to login...");
      
      // ২ সেকেন্ড পর লগইন পেজে নিয়ে যাবে
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E7] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Main Card */}
      <div className="max-w-[1000px] w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-10 lg:p-12">
        
        {/* === Header Section === */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <div className="w-16 h-16 bg-[#F58634] rounded-2xl flex items-center justify-center mb-4 shadow-sm relative">
            <UserRound className="w-8 h-8 text-white absolute -ml-2 -mt-2" strokeWidth={1.5} />
            <KeyRound className="w-5 h-5 text-white absolute bottom-3 right-3" strokeWidth={2} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Create New Account</h1>
          <p className="text-gray-500 text-sm">Register to get started</p>
        </div>

        {/* === Form Container (Grid Setup) === */}
        <div className="flex flex-col md:flex-row relative gap-y-8 md:gap-y-0">
          
          {/* 1. Left Column: OTP Signup (Static for now) */}
          <div className="flex-1 bg-[#F9F9F9] rounded-xl p-6 sm:p-8 border border-gray-100 h-fit">
            <h2 className="text-[17px] font-medium text-gray-800 mb-6">
              Signup With Mobile Number
            </h2>
            
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-[#F58634]" strokeWidth={1.8} />
                </div>
                <input
                  type="text"
                  placeholder="01*********"
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F58634] focus:border-[#F58634] transition-colors"
                />
              </div>

              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#F58634] hover:bg-[#e0762a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F58634]"
              >
                Send OTP
              </button>
            </div>
          </div>

          {/* === OR Divider === */}
          <div className="flex items-center justify-center relative py-8 md:py-0 md:px-8">
            <div className="absolute w-full h-px md:w-px md:h-[90%] bg-gray-200"></div>
            <div className="relative z-10 w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-xs font-semibold text-gray-400">OR</span>
            </div>
          </div>

          {/* 2. Right Column: Credentials Register */}
          <div className="flex-[1.2] bg-[#F9F9F9] rounded-xl p-6 sm:p-8 border border-gray-100">
            <h2 className="text-[17px] font-medium text-gray-800 mb-6">
              Register a new account
            </h2>
            
            {/* Show Messages */}
            {error && <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">{error}</div>}
            {success && <div className="mb-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <UserRound className="h-5 w-5 text-[#F58634]" strokeWidth={1.8} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F58634] focus:border-[#F58634] transition-colors"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#F58634]" strokeWidth={1.8} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F58634] focus:border-[#F58634] transition-colors"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#F58634]" strokeWidth={1.8} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="block w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F58634] focus:border-[#F58634] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" strokeWidth={1.8} />
                  ) : (
                    <Eye className="h-5 w-5" strokeWidth={1.8} />
                  )}
                </button>
              </div>

              {/* Address Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-[#F58634]" strokeWidth={1.8} />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F58634] focus:border-[#F58634] transition-colors"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 mt-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#F58634] hover:bg-[#e0762a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F58634] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register account"
                )}
              </button>
            </form>
          </div>
          
        </div>

        {/* === Social Login Section === */}
        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or signup with</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            {/* Google NextAuth Button */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-12 h-12 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all focus:outline-none"
              aria-label="Sign up with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* === Footer / Login Link === */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#F58634] hover:underline">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}