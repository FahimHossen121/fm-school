"use client";

import Link from "next/link";
import { ModeToggle } from "./ui/toggle";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme(); // Use resolvedTheme
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Directly assign the system theme
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-300 sticky top-0 backdrop-blur z-50 md:h-[65px]">
      <div className="flex gap-2">
        <div className="md:hidden">
          <button className="mt-0 text-foreground focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {mounted && (
            <img
              src={
                resolvedTheme === "dark"
                  ? "/darkModeLogo.svg"
                  : "/lightModeLogo.svg"
              } // Use resolvedTheme
              className="h-8 w-auto"
              alt="Logo"
            />
          )}
        </div>
      </div>
      <ul className="hidden md:flex list-none gap-4 m-0 p-0">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/contact">Contact us</Link>
        </li>
      </ul>
      <ul className="flex list-none gap-1 m-0 p-0 ">
        <li>
          <ModeToggle></ModeToggle>
        </li>
        <li>
          <Button variant="default">Login</Button>
        </li>
        <li>
          <Button variant="destructive">Sign Up</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
