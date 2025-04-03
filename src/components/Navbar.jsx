import React from "react";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";
// import { GraduationCap, SandwichIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

import { LogoIcon } from "./Logo";
function Navbar() {
  return (
    <nav className="flex justify-between items-center h-16 border-b text-[var(--text-color)] relative px-6 dark:text-white">
      <h2 className="font-medium text-xl hidden md:block">
        Good Morning, Meet
      </h2>
      <div className="h-full flex items-center md:hidden">
        <NavLink to={"/"}>
          <h2
            className={`text-xl font-medium text-[var(--primary-color)] flex items-center gap-1 dark:text-white`}
          >
            <LogoIcon />
            <span className="mt-0.5">TiffinWale</span>
          </h2>
        </NavLink>
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <ThemeToggle />
        </div>
        {/* <Button variant="outline" className="rounded-full flex px-4">
                    <User />
                    <span className='text-[10px]'>Meet Darji</span>
                </Button> */}
        <UserProfile />
        {/* <Button size="icon" variant="outline" className="rounded-full"><Settings /></Button> */}
      </div>
    </nav>
  );
}

export default Navbar;
