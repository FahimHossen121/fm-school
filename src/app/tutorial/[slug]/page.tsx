"use client"; // Ensure this component is client-side rendered

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Sidebar from "../../Sidebar";

const Page: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Use useParams to access the current route parameters
  const params = useParams();
  const slug = params?.slug;

  return (
    <div className="flex min-h-screen">
      <div ref={sidebarRef}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex-1">
        <header className="flex sticky top-0 bg-background h-16 items-center gap-2 border-b px-4">
          <button
            className="inline-flex items-center justify-center h-7 w-7 md:hidden"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-panel-left"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M9 3v18"></path>
            </svg>
            <span className="sr-only">Toggle Sidebar</span>
          </button>
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
              <li className="items-center gap-1.5 hidden md:block">
                <a
                  className="transition-colors hover:text-foreground"
                  href="/tutorials"
                >
                  Tutorials
                </a>
              </li>
              <li
                role="presentation"
                aria-hidden="true"
                className="[&>svg]:w-3.5 [&>svg]:h-3.5 hidden md:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span
                  role="link"
                  aria-disabled="true"
                  aria-current="page"
                  className="font-normal text-foreground truncate max-w-[200px] md:max-w-none"
                >
                  HTML Tutorial
                </span>
              </li>
            </ol>
          </nav>
        </header>
        <main className="relative flex min-h-svh flex-1 flex-col bg-background overflow-x-hidden">
          <section className="p-4">
            <h1 className="text-2xl font-bold">HTML Tutorial</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn the basics of HTML, the standard markup language for
              creating web pages.
            </p>
            <div>
              <h2>Current slug: {slug}</h2>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
