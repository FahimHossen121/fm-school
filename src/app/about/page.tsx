import Image from "next/image";
export default function About() {
  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center py-32 bg-gray-100 dark:bg-gray-700">
          <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0">
                <div className="relative w-48 h-48 rounded-full overflow-hidden">
                  <Image
                    src="/Hero.jpg"
                    alt="Fahim Profile"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  About Me
                </h1>
                <p className="text-gray-600 dark:text-gray-50 text-lg mb-4">
                  Hello! I'm Fahim, a Computer Science student at KUET and a
                  passionate tech content creator. I run the FM School YouTube
                  channel where I simplify programming, blockchain, and tech
                  concepts for students and beginners. I love turning complex
                  ideas into beginner-friendly tutorials that are both fun and
                  practical.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 bg-gray-50 dark:bg-gray-800 dark:text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Fahim's Coding Journey
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-50">
                From a curious KUET CSE student to a blockchain explorer and
                educator—this is my story.
              </p>
            </div>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3">
                  <img
                    src="cp-book.png"
                    alt="Fahim as a beginner"
                    className="w-auto rounded-lg shadow-lg h-64 p-0 m-0 md:ml-24"
                  />
                </div>
                <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Where it all Began
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-50">
                    My journey began after passing the Secondary School
                    Certificate in 2020. During the COVID-19 lockdown, my father
                    gifted me "Computer Programming" by Tamim Shahriar Subben.
                    This book ignited my passion for programming when everything
                    else was at a standstill.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/3">
                  <img
                    src="/Hero.jpg"
                    alt="Fahim learning blockchain"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-2/3 md:pr-8 mt-8 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Discovering Blockchain
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-50">
                    Blockchain caught my attention when I started watching
                    tutorials and reading the Bitcoin whitepaper. I began
                    experimenting with smart contracts in Solidity and even took
                    notes using Obsidian. My goal? To master blockchain
                    development and share my learnings with others.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3">
                  <img
                    src="/Hero.jpg"
                    alt="Fahim teaching online"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Teaching Through YouTube
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-50">
                    I created the FM School YouTube channel to make programming
                    more accessible for Bengali speakers. From tutorials on
                    `scanf` to how crypto airdrops work, I focus on practical,
                    engaging content. I believe learning should be fun and
                    visual.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/3">
                  <img
                    src="/Hero.jpg"
                    alt="Fahim working on real-life projects"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-2/3 md:pr-8 mt-8 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Building & Beyond
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-50">
                    I'm currently working on a student marketplace startup with
                    my friend Farhad. I handle the tech and development side
                    while he brings real-life business insights. I'm also diving
                    into Android development, freelancing, and web scraping
                    using Python.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
