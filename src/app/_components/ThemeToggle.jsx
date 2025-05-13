"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle({ children }) {
  const { theme , setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className={theme }>
      <div className="bg-white text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-gray-300 min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default ThemeToggle;
