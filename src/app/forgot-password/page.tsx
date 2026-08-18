"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, KeyRound, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset link.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E7] flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-[480px] w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 border border-gray-100">
        
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-[#F58634] rounded-2xl flex items-center justify-center mb-4 shadow-sm text-white">
            <KeyRound className="w-8 h-8" strokeWidth={1.8} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your registered email and we'll send you a link to reset your password.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Check Your Email</h3>
            <p className="text-sm text-gray-600">
              We have sent a password reset link to <strong className="text-gray-900">{email}</strong>. Please check your inbox (or spam folder).
            </p>
            <div className="pt-4">
              <Link
                href="/login"
                className="w-full inline-flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#F58634] hover:bg-[#e0762a] transition-colors shadow-sm"
              >
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#F58634]" strokeWidth={1.8} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="block w-full pl-11 pr-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58634] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#F58634] hover:bg-[#e0762a] transition-colors focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending Link...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}