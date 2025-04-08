"use client";

import Link from "next/link";
import { ModeToggle } from "./ui/toggle";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for dropdown menu

  useEffect(() => {
    setMounted(true);
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact us" },
  ];

  return (
    <nav className="p-4 bg-card/80 sticky top-0 border-b backdrop-blur z-50 border-card">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Hamburger Menu */}
        <div className="flex gap-2">
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              className="mt-0 text-foreground focus:outline-none"
              onClick={toggleMenu}
            >
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
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center space-x-2">
              {mounted && (
                <Image
                  src={
                    resolvedTheme === "dark"
                      ? "/darkModeLogo.svg"
                      : "/lightModeLogo.svg"
                  }
                  width={32} // Adjust this value as needed
                  height={32} // Adjust this value as needed
                  className="h-8 w-auto"
                  alt="Logo"
                />
              )}
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center">
          {navLinks.map(({ href, label }) => (
            <li
              key={href}
              className="mx-2 my-2 text-black dark:text-white relative"
            >
              <Link
                href={href}
                className="hover:after:content-[''] hover:after:block hover:after:w-full hover:after:h-[2px] hover:after:bg-primary hover:after:absolute hover:after:bottom-0"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-card/90 shadow-md flex flex-col items-center md:hidden z-50 animate-slide-down">
            {navLinks.map(({ href, label }) => (
              <li
                key={href}
                className="w-full text-center py-2 text-black hover:bg-primary dark:text-white"
              >
                <Link href={href} onClick={() => setIsMenuOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Right Section */}
        <ul className="flex list-none gap-1 m-0 p-0">
          <li>
            <ModeToggle />
          </li>
          <li>
            <Button variant="default">Login</Button>
          </li>
          <li>
            <Button variant="destructive">Sign Up</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
