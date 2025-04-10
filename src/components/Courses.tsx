import Image from "next/image";
import Link from "next/link";

const CoursesComponent = () => {
  const courses = [
    {
      id: 1,
      title: "Python Tutorials - 100 Days of Code",
      description:
        "Python is one of the most demanded programming languages in the job market. Surprisingly, it is equally easy to learn and master Python. Let's commit our 100 days of code to python!",
      image: "/Hero.jpg",
      alt: "Python Tutorials - 100 Days of Code",
      tag: "FREE COURSE",
      link: "/tutorial/overview/python",
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      description:
        "Master the fundamentals of JavaScript, the language of the web. This course will guide you through the basics to advanced concepts.",
      image: "/Hero.jpg",
      alt: "JavaScript Essentials",
      tag: "FREE COURSE",
      link: "/tutorial/overview/javascript",
    },
    {
      id: 3,
      title: "React for Beginners",
      description:
        "Learn React from scratch and build dynamic web applications with ease. This course is perfect for beginners.",
      image: "/Hero.jpg",
      alt: "React for Beginners",
      tag: "FREE COURSE",
      link: "/tutorial/overview/react",
    },
  ];

  return (
    <div className="container mx-auto lg:my-2">
      <h2 className="text-3xl font-medium title-font text-foreground my-10 text-center">
        Recommended Courses
      </h2>
      <div className="flex flex-wrap justify-center mx-6 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border w-full max-w-[310px] sm:max-w-[320px] sm:w-64 flex flex-col justify-between bg-card text-card-foreground shadow-md rounded-2xl transition-transform overflow-hidden"
          >
            <div className="space-y-1.5 p-6 flex flex-col items-center pt-4 overflow-hidden">
              <Image
                alt={course.alt}
                className="w-24 h-24 rounded-full object-cover shadow"
                src={course.image}
                width={96}
                height={96}
              />
              <div className="tracking-tight text-lg font-semibold mt-4 text-center break-words w-full px-2">
                {course.title}
              </div>
            </div>
            <div className="p-6 pt-0 px-4 mt-2 overflow-hidden">
              <div className="text-center text-sm text-muted-foreground dark:text-gray-400">
                {course.description}
              </div>
            </div>
            <div className="items-center p-6 pt-0 flex justify-center mt-4 mb-4">
              <Link href={course.link}>
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

export default CoursesComponent;
