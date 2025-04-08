import Image from "next/image";

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
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      description:
        "Master the fundamentals of JavaScript, the language of the web. This course will guide you through the basics to advanced concepts.",
      image: "/Hero.jpg",
      alt: "JavaScript Essentials",
      tag: "FREE COURSE",
    },
    {
      id: 3,
      title: "React for Beginners",
      description:
        "Learn React from scratch and build dynamic web applications with ease. This course is perfect for beginners.",
      image: "/Hero.jpg",
      alt: "React for Beginners",
      tag: "FREE COURSE",
    },
  ];

  return (
    <div className="container mx-auto lg:my-2">
      <h2 className="text-3xl font-medium title-font text-foreground my-10 text-center">
        Recommended Courses
      </h2>
      <div className="flex flex-wrap justify-center mx-6">
        {courses.map((course) => (
          <div key={course.id} className="p-4 md:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-card hover-effect">
              <Image
                className="object-contain w-full object-center"
                src={course.image}
                width={384}
                height={216}
                alt={course.alt}
              />
              <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <span className="tracking-widest text-xs title-font font-medium mb-1 text-muted-foreground">
                  {course.tag}
                </span>
                <div className="title-font flex text-lg font-medium text-foreground mb-3">
                  {course.title}
                </div>
                <p className="text-muted text-base">{course.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block text-primary-foreground bg-primary rounded-full px-3 py-2 text-sm font-semibold mr-2 my-2 cursor-pointer hover:bg-primary/90">
                  Start Watching
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesComponent;
