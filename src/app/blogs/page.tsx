// pages/blogs.js
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";

const blogs = [
  {
    id: 1,
    title: "Blockchain Development",
    description:
      "This is a sample description of the blog post that will be displayed on the card.",
    slug: "blockchain",

    image: "/Hero.jpg",
  },
  {
    id: 2,
    title: "C Programming For Everyone Lecture 1",
    description:
      "Another intriguing blog post description that captures the essence of the content.",
    slug: "c-programming",

    image: "/Course1.png",
  },
  // Add more blogs as needed
];

export default function Blogs() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto lg:my-2">
        <h2 className="text-3xl font-medium title-font text-foreground my-10 text-center">
          Blog Categories
        </h2>
        <div className="flex flex-wrap justify-center mx-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="p-4 md:w-1/3 flex justify-center">
              <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-card hover-effect">
                <Image
                  className="object-cover w-full h-auto aspect-video" // Crop to maintain 16:9 aspect ratio
                  src={blog.image}
                  width={1280}
                  height={720}
                  alt={blog.title}
                />
                <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52 mt-5">
                  <div className="title-font flex text-lg font-medium text-foreground mb-3">
                    {blog.title}
                  </div>
                  <p className="text-muted text-base">{blog.description}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <Link
                    href={`/blogpost/${blog.slug}`}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
