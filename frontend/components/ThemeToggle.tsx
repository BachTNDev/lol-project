"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-white text-black hover:opacity-90 transition-opacity dark:bg-black dark:text-white dark:hover:bg-[#0d1520]"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default dynamic(() => Promise.resolve(ThemeToggle), { ssr: false });