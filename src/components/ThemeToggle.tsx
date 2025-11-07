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

  return (
    <Button
      type="text"
      className="theme-toggle pulse-glow"
      icon={
        theme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )
      }
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
}
