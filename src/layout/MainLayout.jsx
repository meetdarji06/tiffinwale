// import { Sidebar } from 'lucide-react'
import BottomNavigation from "@/components/BottomNavigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import React from 'react'

function MainLayout({ children }) {
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-full">
          <Navbar />
          <div className="px-4 py-4 h-[calc(100vh-4rem)] overflow-y-auto scrollbar">
            <Outlet />
            <p className="text-xs text-center py-4 text-gray-400 md:hidden">
              Designed & Developed By Meet Darji
            </p>
            <div className="mt-12 md:hidden"></div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}

export default MainLayout;
