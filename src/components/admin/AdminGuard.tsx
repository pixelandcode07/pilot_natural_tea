"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return; 

    const manualUserStr = localStorage.getItem("manual_user");
    const manualUser = manualUserStr ? JSON.parse(manualUserStr) : null;

    const user = (session?.user as any) || manualUser;

    // ইউজার না থাকলে বা ইউজারের role 'admin' না হলে হোমে পাঠিয়ে দেবে
    if (!user || user.role !== "admin") {
      router.replace("/"); 
    } else {
      setIsAuthorized(true); 
    }
  }, [session, status, router]);

  if (!isAuthorized) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F4F7FC]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1E5E3A]"></div>
      </div>
    );
  }

  return <>{children}</>;
}