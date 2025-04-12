"use client";
import React from "react";
import Link from "next/link";
import { sidebarContents } from "./tutorial/overview/[slug]/overviewData";

interface SidebarProps {
  isOpen: boolean; // Indicates whether the sidebar is open or closed
  toggleSidebar: () => void; // Function to toggle the sidebar state
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 transition-transform transform h-full ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:relative md:flex md:w-[--sidebar-width]`}
    >
      {/* Sidebar container with responsive behavior */}
      <div className="bg-sidebar text-sidebar-foreground flex flex-col w-[--sidebar-width] h-full">
        <div className="p-4">
          <h1 className="text-xl font-semibold">HTML Tutorial</h1>
          {/* Sidebar title */}
        </div>
        <nav className="flex-1 overflow-y-auto">
          {/* Navigation section for sidebar contents */}
          <div
            data-sidebar="content"
            className="flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden gap-0 pt-2 pb-16"
          >
            {sidebarContents.map((item, index) => {
              const slug = item.toLowerCase().replace(/\s+/g, "-"); // Convert item to slug
              return (
                <div
                  key={index}
                  data-state="closed"
                  className="group/collapsible"
                >
                  {/* Collapsible group for each sidebar item */}
                  <div
                    data-sidebar="group"
                    className="relative flex w-full min-w-0 flex-col p-2"
                  >
                    <Link href={`/tutorial/${slug}`}>
                      <button
                        type="button"
                        aria-controls={`radix-:r${index}:`}
                        aria-expanded="false"
                        data-state="closed"
                        className="duration-200 flex h-8 shrink-0 items-center rounded-md px-2 font-medium outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full whitespace-normal break-words"
                        data-sidebar="group-label"
                      >
                        {/* Button to toggle the collapsible group */}
                        <div
                          className="flex items-center w-full"
                          data-state="closed"
                        >
                          <div className="flex-grow text-left overflow-hidden text-ellipsis whitespace-nowrap pr-2 min-w-0">
                            {item}
                            {/* Sidebar item label */}
                          </div>
                        </div>
                      </button>
                    </Link>
                    <div data-state="closed" id={`radix-:r${index}:`} hidden>
                      {/* Collapsible content (hidden by default) */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={toggleSidebar}
        >
          {/* Close button for mobile view */}
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
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
