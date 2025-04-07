"use client";

import Link from "next/link";
import { ModeToggle } from "./ui/toggle";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex justify-around items-center p-4 border-b border-gray-300 sticky top-0 backdrop-blur">
      <div className="flex items-center space-x-2">
        {mounted && (
          <Image
            src={theme === "dark" ? "/darkModeLogo.svg" : "/lightModeLogo.svg"}
            className="h-8 w-auto"
            alt="Logo"
            width={32}
            height={32}
          />
        )}
      </div>
      <ul className="flex list-none gap-4 m-0 p-0">
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
      <ul className="flex list-none gap-4 m-0 p-0">
        <li>
          <ModeToggle></ModeToggle>
        </li>
        <li>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </li>
        <li>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
