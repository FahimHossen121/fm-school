import React from "react";
import Link from "next/link";
import { tutorials } from "./tutorialsData";

const Tutorials: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-2 sm:px-4 overflow-x-hidden w-full">
      <h1 className="text-3xl font-semibold mb-6">Tutorials</h1>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-[calc(100vw-16px)] sm:max-w-7xl overflow-hidden">
        {tutorials.map((tutorial, index) => (
          <div
            key={index}
            className="border w-full max-w-[310px] sm:max-w-[320px] sm:w-64 flex flex-col justify-between bg-card text-card-foreground shadow-md rounded-2xl transition-transform overflow-hidden"
          >
            <div className="space-y-1.5 p-6 flex flex-col items-center pt-4 overflow-hidden">
              <img
                alt={`${tutorial.title} thumbnail`}
                className="w-24 h-24 rounded-full object-cover shadow"
                src={tutorial.imageUrl}
              />
              <div className="tracking-tight text-lg font-semibold mt-4 text-center break-words w-full px-2">
                {tutorial.title}
              </div>
            </div>
            <div className="p-6 pt-0 px-4 mt-2 overflow-hidden">
              <div className="text-center text-sm text-muted-foreground dark:text-gray-400">
                {tutorial.description}
              </div>
            </div>
            <div className="items-center p-6 pt-0 flex justify-center mt-4 mb-4">
              <Link href={tutorial.link}>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-background">
                  Start Learning!
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
