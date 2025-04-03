import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [isDark, setIsDark] = useState(theme === "dark");

    useEffect(() => {
        setTheme(isDark ? "dark" : "light");
    }, [isDark, setTheme]);

    return (
        <div
            className="w-20 h-10 flex items-center bg-[var(--primary-color)] dark:bg-[#272829] rounded-full p-1 relative cursor-pointer transition-all"
            onClick={() => setIsDark(!isDark)}
        >
            {/* Light Mode */}
            <div className={`flex-1 flex items-center justify-center transition-all text-[var(--primary-color)] dark:text-white`}>
                <Sun className="w-5 h-5" />
            </div>

            {/* Dark Mode */}
            <div className={`flex-1 flex items-center justify-center transition-all ${isDark ? "text-[var(--primary-color)]" : "text-[var(--secondary-color)]"}`}>
                <Moon className="w-5 h-5" />
            </div>

            {/* Active Indicator */}
            <div
                className={`text-[var(--primary-color)] dark:bg-white dark:text-black absolute top-1 left-1 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--secondary-color)] transition-all ${isDark ? "translate-x-10" : "translate-x-0"
                    }`}
            >
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
        </div>
    );
}
