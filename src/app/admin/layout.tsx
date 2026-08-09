import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import AdminGuard from "@/components/admin/AdminGuard";

export const metadata = {
  title: "Admin Dashboard | Pilot Natural",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex h-screen bg-[#F4F7FC] overflow-hidden font-sans">
        {/* Sidebar - Fixed on left */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar - Fixed on top of content */}
          <Topbar />
          
          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}