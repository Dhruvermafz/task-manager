"use client";

import { Helmet } from "react-helmet";
import { Card, Space, Typography } from "antd";
import TaskForm from "@/components/TaskForm";
import FilterTabs from "@/components/FilterTabs";
import TaskList from "@/components/TaskList";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useRef } from "react";

const { Title } = Typography;

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse glow effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* ───── Helmet ───── */}
      <Helmet>
        <title>Task Manager – Minimal & Glassy</title>
        <meta
          name="description"
          content="A beautiful, dark-mode-ready task manager built with Next.js, Tailwind & Ant Design."
        />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph */}
        <meta property="og:title" content="Task Manager" />
        <meta
          property="og:description"
          content="Organise your day with style."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://your-domain.com" />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black p-4 md:p-8 transition-all duration-700">
        <div className="max-w-4xl mx-auto">
          <div
            ref={cardRef}
            className="glass-card floating"
            style={
              { "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Title
                level={2}
                className="m-0 text-gradient font-extrabold tracking-tight"
              >
                Task Manager
              </Title>
              <ThemeToggle />
            </div>

            <div className="mb-6">
              <TaskForm />
            </div>

            <div className="mb-6">
              <FilterTabs />
            </div>

            <TaskList />
          </div>
        </div>
      </main>
    </>
  );
}
