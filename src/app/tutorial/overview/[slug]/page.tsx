"use client"; // Indicates this is a client-side rendered component
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../../Sidebar";

const Page: React.FC = () => {
  // State to manage the sidebar's open/close status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Ref to track the sidebar DOM element
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Function to toggle the sidebar's visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Effect to handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false); // Close sidebar if clicked outside
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside); // Add event listener when sidebar is open
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Remove event listener when sidebar is closed
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener on unmount
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar container */}
      <div ref={sidebarRef}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      {/* Main content area */}
      <div className="flex-1">
        {/* Header section */}
        <header className="flex sticky top-0 bg-background h-16 items-center gap-2 border-b px-4">
          {/* Button to toggle sidebar visibility */}
          <button
            className="inline-flex items-center justify-center h-7 w-7 md:hidden"
            onClick={toggleSidebar}
          >
            {/* Icon for the toggle button */}
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
          {/* Breadcrumb navigation */}
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
              {/* Link to tutorials */}
              <li className="items-center gap-1.5 hidden md:block">
                <a
                  className="transition-colors hover:text-foreground"
                  href="/tutorials"
                >
                  Tutorials
                </a>
              </li>
              {/* Separator icon */}
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
              {/* Current page indicator */}
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
        {/* Main content section */}
        <main className="relative flex min-h-svh flex-1 flex-col bg-background overflow-x-hidden">
          <section className="p-4">
            {/* Page title */}
            <h1 className="text-2xl font-bold">HTML Tutorial</h1>
            {/* Page description */}
            <p className="mt-2 text-sm text-muted-foreground">
              Learn the basics of HTML, the standard markup language for
              creating web pages.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
