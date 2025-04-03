// import { GraduationCap, SandwichIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "./theme-provider";

function Logo({ className }) {
  return (
    <NavLink to={"/"}>
      <h2
        className={`text-xl font-bold mb-4 text-[var(--primary-color)] dark:text-white px-3 flex items-center gap-1.5 ${className}`}
      >
        <LogoIcon /><span>TiffinWale</span>
      </h2>
    </NavLink>
  );
}

export const LogoIcon = ({ fill }) => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    setIsDark(theme === "dark"); // Update state when theme changes
  }, [theme]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="24"
      height="24"
    >
      <path
        fill={isDark ? "white" : "#8370fe"}
        d="M 25.5 2.0917969 C 22.425329 2.0917969 20 4.7934879 20 8 L 18 8 C 15.804545 8 14 9.8045455 14 12 L 14 15 C 13.45 15 13 15.45 13 16 C 13 16.55 13.45 17 14 17 L 14 24 C 13.45 24 13 24.45 13 25 C 13 25.55 13.45 26 14 26 L 14 34 C 13.45 34 13 34.45 13 35 C 13 35.55 13.45 36 14 36 L 14 43 C 14 45.195455 15.804545 47 18 47 L 33 47 C 35.195455 47 37 45.195455 37 43 L 37 36 C 37.55 36 38 35.55 38 35 C 38 34.45 37.55 34 37 34 L 37 26 C 37.55 26 38 25.55 38 25 C 38 24.45 37.55 24 37 24 L 37 17 C 37.55 17 38 16.55 38 16 C 38 15.45 37.55 15 37 15 L 37 12 C 37 9.8045455 35.195455 8 33 8 L 31 8 C 31 4.7934879 28.574671 2.0917969 25.5 2.0917969 z M 25.5 4.0917969 C 27.395329 4.0917969 29 5.7845121 29 8 L 22 8 C 22 5.7845121 23.604671 4.0917969 25.5 4.0917969 z M 18 10 L 33 10 C 34.104545 10 35 10.895455 35 12 L 35 15 L 16 15 L 16 12 C 16 10.895455 16.895455 10 18 10 z M 16 17 L 35 17 L 35 24 L 16 24 L 16 17 z M 16 26 L 35 26 L 35 34 L 16 34 L 16 26 z M 16 36 L 35 36 L 35 43 C 35 44.104545 34.104545 45 33 45 L 18 45 C 16.895455 45 16 44.104545 16 43 L 16 36 z"
      />
    </svg>
  );
};

export default Logo;
