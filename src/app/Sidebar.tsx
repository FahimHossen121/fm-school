"use client";
import React from "react";
import Link from "next/link";
interface SidebarItem {
  title: string;
  slug: string;
  content?: string;
}
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  topic?: string;
  sidebarContents: SidebarItem[];
  currentSlug?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, topic, sidebarContents, currentSlug }) => {

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform transform h-full w-[--sidebar-width] ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:z-auto`}
      >
        <div className="bg-sidebar text-sidebar-foreground flex flex-col w-full h-full">
          <div className="p-4">
            <h1 className="text-xl font-semibold">HTML Tutorial</h1>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <div
              data-sidebar="content"
              className="flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden gap-0 pt-2 pb-16"
            >
              {Array.isArray(sidebarContents) && sidebarContents.map((item, index) => {
                const isActive = currentSlug === item.slug;
                return (
                  <div
                    key={index}
                    data-state="closed"
                    className="group/collapsible"
                  >
                    <div
                      data-sidebar="group"
                      className="relative flex w-full min-w-0 flex-col p-2"
                    >
                      <Link href={`/tutorial/${topic}/${item.slug}`}>
                        <button
                          type="button"
                          aria-controls={`radix-:r${index}:`}
                          aria-expanded="false"
                          data-state="closed"
                          className={`duration-200 flex h-8 shrink-0 items-center rounded-md px-2 font-medium outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 group/label text-sm w-full whitespace-normal break-words ${isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                            }`}
                          data-sidebar="group-label"
                        >
                          <div
                            className="flex items-center w-full"
                            data-state="closed"
                          >
                            <div className="flex-grow text-left overflow-hidden text-ellipsis whitespace-nowrap pr-2 min-w-0">
                              {item.title}
                            </div>
                            {isActive && (
                              <div className="w-2 h-2 bg-current rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                        </button>
                      </Link>
                      <div data-state="closed" id={`radix-:r${index}:`} hidden>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
