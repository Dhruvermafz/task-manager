"use client";

import { useTheme } from "next-themes";
import { Button } from "antd";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      type="text"
      className="theme-toggle"
      icon={
        isDark ? (
          <Sun className="w-5 h-5 text-gray-200" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
}
