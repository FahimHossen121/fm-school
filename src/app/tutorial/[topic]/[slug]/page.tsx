"use client"; // Ensure this component is client-side rendered
<<<<<<< HEAD:src/app/tutorial/[slug]/page.tsx

import React, { useState, useEffect, useRef } from "react";
=======
import React, { useEffect } from "react";
>>>>>>> 97c1119 (Tutorial Done):src/app/tutorial/[topic]/[slug]/page.tsx
import { useParams } from "next/navigation";
import axios from "axios";
import { tutorials } from "@/app/tutorials/tutorialsData";

interface SidebarItem {
  title: string;
  slug: string;
  content?: string;
}

interface PageProps {
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
  </div>
);

const Page: React.FC<PageProps> = ({ toggleSidebar, isSidebarOpen }) => {
  // Use useParams to access the current route parameters
  const params = useParams();
  const topic = params?.topic;
  const slug = params?.slug;

  // Find current tutorial from tutorials data
  const currentTutorial = tutorials.find(tutorial => tutorial.topic === topic);

  const [sidebarContents, setSidebarContents] = React.useState<SidebarItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchSidebarContents = async () => {
      if (!topic) return;

      setLoading(true);
      try {
        const res = await axios.get(`/api/tutorial?topic=${topic}`);
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            setSidebarContents(res.data);
          } else {
            console.error("API response is not an array:", res.data);
            setSidebarContents([]);
          }
        } else {
          console.error("Failed to fetch sidebar contents");
        }
      } catch (error) {
        console.error("Error fetching sidebar contents:", error);
        setSidebarContents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarContents();
  }, [topic]);

  const currentContent = sidebarContents.find(item => item.slug === slug);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <header className="flex sticky top-0 bg-background h-16 items-center gap-2 border-b px-4">
          <button
            className="inline-flex items-center justify-center h-7 w-7"
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
                  {currentTutorial ? currentTutorial.title : `${topic ? (topic.toString().charAt(0).toUpperCase() + topic.toString().slice(1)) : ''} Tutorial`}
                </span>
              </li>
            </ol>
          </nav>
        </header>
        <main className="relative flex min-h-svh flex-1 flex-col bg-background overflow-x-hidden">
          <section className="p-4">
            <h1 className="text-2xl font-bold">
              {currentContent ? currentContent.title : (currentTutorial ? currentTutorial.title : `${topic ? topic.toString().charAt(0).toUpperCase() + topic.toString().slice(1) : ''} Tutorial`)}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {currentContent ? 'Learn about this topic in detail.' : (currentTutorial ? currentTutorial.description : `Learn the basics of ${topic}, the standard markup language for creating web pages.`)}
            </p>
            <div>
              <h2>Current slug: {slug}</h2>
              {currentTutorial && <p>Tutorial found: {currentTutorial.title}</p>}
            </div>
            <div className="content mt-6">
              {loading ? (
                <LoadingSpinner />
              ) : currentContent ? (
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentContent.content || 'No content available.' }} />
                </div>
              ) : (
                <p className="text-muted-foreground">Select a topic from the sidebar to view its content.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
