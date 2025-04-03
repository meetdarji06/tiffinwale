import React from "react";
import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  UserIcon,
  BookAIcon,
  UserCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const BottomNavigation = () => {
  const navigationInfo = [
    {
      title: "Home",
      icon: HomeIcon,
      to: "/",
    },
    {
      title: "Payments",
      icon: CalendarIcon,
      to: "/payments",
    },
  ];
  const { user } = useAuth();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t  dark:bg-background md:hidden">
      <div className="flex justify-around py-2">
        {/* <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                    <HomeIcon className="w-6 h-6" />
                    <span className="text-xs">Home</span>
                </button>
                <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                    <CalendarIcon className="w-6 h-6" />
                    <span className="text-xs">Calendar</span>
                </button>
                <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                    <ChartBarIcon className="w-6 h-6" />
                    <span className="text-xs">Reports</span>
                </button>
                <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                    <UserIcon className="w-6 h-6" />
                    <span className="text-xs">Profile</span>
                </button>*/}

        {navigationInfo.map((navItem, i) => (
          <BottomNavButton key={i} navItem={navItem} />
        ))}

        <BottomNavButton
          key={"admin"}
          navItem={{ to: "/admin", icon: UserCheck }}
          className={user?.role === "ADMIN" ? "block" : "hidden"}
        />
      </div>
    </div>
  );
};

const BottomNavButton = ({ navItem, className }) => {
  return (
    <NavLink
      to={navItem.to}
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-[var(--primary-color)] dark:bg-white dark:text-black    text-[var(--secondary-color)]"
            : ""
        } rounded-full p-2 h-12 w-12 flex justify-center items-center ${className}`
      }
    >
      {/* <Button size="icon" variant="link"> */}
      <navItem.icon className="w-7 h-7 mb-1" />
      {/* </Button> */}
    </NavLink>
  );
};

export default BottomNavigation;
