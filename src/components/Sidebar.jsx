import {
  BookCheck,
  BookText,
  User2Icon,
  LayoutDashboard,
  LogOut,
  NotebookPen,
  Settings2,
  SandwichIcon,
  UserPlus2Icon,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "@/context/authContext";
// import Logo from './Logo'

function Sidebar() {
  const SidebarLinks = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      to: "/",
    },
    {
      title: "Payments",
      icon: BookCheck,
      to: "/payments",
    },
  ];

  const { user } = useAuth();
  return (
    <>
      <div className="w-56 hidden md:flex min-h-screen bg-[var(--secondary-color)] text-[var(--text-color)] p-4 py-5 flex-col dark:bg-background dark:text-[var(--primary-color)] dark:border-r">
        <Logo />
        <nav className="flex flex-col flex-grow mt-4">
          <ul className="space-y-2">
            {SidebarLinks.map((link, index) => (
              <SidebarLink key={index} {...link} />
            ))}
          </ul>
          <div className="mt-auto space-y-2">
            {/* {console.log(user?.role)} */}
            <SidebarLink
              classname={`${user?.role === "ADMIN" ? "block" : "hidden"}`}
              title="Admin"
              icon={UserPlus2Icon}
              to="/admin"
            />
            <SidebarLink title="Logout" icon={LogOut} to="/logout" />
          </div>
        </nav>
        <p className="text-[8px] text-center pt-4 text-gray-400 bottom-0">
          Designed & Developed By Meet Darji
        </p>
      </div>
    </>
  );
}

const SidebarLink = ({ title, icon: Icon, to, classname }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-[var(--primary-color)] text-white dark:bg-white dark:text-black"
            : "text-black dark:text-white"
        } cursor-pointer font-medium text-sm p-3 hover:text-[var(--secondary-color)] hover:bg-[var(--primary-color)] dark:hover:bg-white dark:hover:text-black  flex items-center gap-2 rounded-full ${classname}`
      }
    >
      <li className="flex gap-2">
        <Icon className="w-5 h-5" />
        <span>{title}</span>
      </li>
    </NavLink>
  );
};

export default Sidebar;
