"use client";

import { Helmet } from "react-helmet";
import { Typography } from "antd";
import TaskForm from "@/components/TaskForm";
import FilterTabs from "@/components/FilterTabs";
import TaskList from "@/components/TaskList";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useRef } from "react";

const { Title } = Typography;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Optional: graceful fade-in animation
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.classList.add("fade-in-up");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Task Manager – Minimal Edition</title>
        <meta
          name="description"
          content="A clean, minimal task manager built with Next.js, Tailwind & Ant Design."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Task Manager" />
        <meta
          property="og:description"
          content="Organize your tasks with clarity and focus."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://your-domain.com" />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-3xl mx-auto" ref={containerRef}>
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <Title
              level={2}
              className="!m-0 text-gray-900 dark:text-gray-100 font-bold tracking-tight"
            >
              Task Manager
            </Title>
            <ThemeToggle />
          </header>

          {/* Content Card */}
          <section
            className="card space-y-6"
            style={{ animationDelay: "0.1s" } as React.CSSProperties}
          >
            <TaskForm />
            <FilterTabs />
            <TaskList />
          </section>
        </div>
      </main>
    </>
  );
}
