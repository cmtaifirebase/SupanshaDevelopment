// src/layouts/AdminLayout.tsx
import React from "react";
import Sidebar from "@/pages/admin/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 transition-all duration-1000 ease-in-out md:ml-16">
        {/* Main content area */}
        <main className="min-h-screen p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;