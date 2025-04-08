"use client";

import Typewriter from "typewriter-effect";
import Link from "next/link";
const Hero = () => {
  return (
    <section>
      <div className="flex bg-[var(--background)] h-100 container mx-auto dark:bg-[var(--background)]">
        <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
          <div>
            <h2 className="text-5xl font-semibold text-[var(--foreground)] md:text-4xl dark:text-[var(--foreground)] leading-relaxed">
              Welcome to{" "}
              <span className="text-[var(--primary)] dark:text-[var(--primary)]">
                FM School
              </span>
            </h2>
            <h4 className="text-2xl font-semibold text-[var(--foreground)] md:text-2xl dark:text-[var(--foreground)] flex gap-3 align-center leading-relaxed justify-center md:justify-start">
              <div>Learn</div>
              <span className="text-[var(--primary)] dark:text-[var(--primary)]">
                <Typewriter
                  options={{
                    strings: [
                      "C/C++",
                      "Python",
                      "Web Development",
                      "Blockchain",
                      "Crypto",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </h4>
            <p className="mt-2 text-sm text-[var(--foreground)] md:text-base leading-relaxed">
              Welcome to FM School, Where Coding Makes You Question Your Life
              Choices!. I am Fahim Hossen and I have been Turning Bugs into
              Features Since{" "}
              <span
                className="text-[var(--primary)]
              dark:text-[var(--primary)]"
              >
                2020...
              </span>
            </p>
            <div className="flex justify-center lg:justify-start mt-6">
              <Link href="https://www.youtube.com/@fmschool121">
                {" "}
                <button className="px-3 py-2 lg:px-4 lg:py-3 bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold rounded hover:text-[var(--foreground)] hover:bg-[var(--card)] dark:bg-[var(--card)] dark:text-[var(--foreground)] dark:hover:bg-[var(--popover)]">
                  YouTube Channel
                </button>
              </Link>
              <Link href="/blogs">
                <button className="px-3 py-2 mx-4 lg:px-4 lg:py-3 bg-[var(--card)] text-[var(--foreground)] text-xs font-semibold rounded hover:bg-[var(--popover)]">
                  Explore Blog
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div
          className="hidden lg:block lg:w-1/2 z-0" // Changed z-index to 0
          style={{
            clipPath: "polygon(10% 0px, 100% 0%, 100% 100%, 0px 100%)",
          }}
        >
          <div
            className="h-full object-cover"
            style={{
              backgroundImage: "url('/Hero.jpg')",
              backgroundSize: "200%",
            }}
          >
            <div className="h-full bg-[var(--foreground)] opacity-25"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
