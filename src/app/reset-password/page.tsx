"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2, Loader2, KeyRound } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or expired reset token. Please request a new link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[480px] w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 border border-gray-100">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-[#F58634] rounded-2xl flex items-center justify-center mb-4 shadow-sm text-white">
          <KeyRound className="w-8 h-8" strokeWidth={1.8} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Set New Password</h1>
        <p className="text-gray-500 text-sm mt-1">Please enter your new password below.</p>
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
          <h3 className="text-lg font-bold text-gray-800">Password Reset Complete!</h3>
          <p className="text-sm text-gray-600">Your password has been successfully updated. Redirecting to login...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#F58634]" strokeWidth={1.8} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="block w-full pl-11 pr-10 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58634] focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#F58634]" strokeWidth={1.8} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="block w-full pl-11 pr-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58634] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3.5 px-4 mt-2 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#F58634] hover:bg-[#e0762a] transition-colors focus:outline-none disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Updating Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      )}

      <div className="text-center mt-6">
        <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-800">
          Remember your password? <span className="text-[#F58634]">Sign In</span>
        </Link>
      </div>

    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F7F2E7] flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      <Suspense fallback={<div className="text-gray-500 font-medium animate-pulse">Loading form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}