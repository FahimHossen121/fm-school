// pages/blogs.js
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import fs from "fs";
import matter from "gray-matter";

// Read the content directory and extract blog data
const dirContent = fs.readdirSync("content", "utf-8");

const blogs = dirContent.map((file) => {
  const fileContent = fs.readFileSync(`content/${file}`, "utf-8");
  const { data } = matter(fileContent);
  return data;
});

export default function Blogs() {
  return (
    <>
      <div className="container mx-auto lg:my-2">
        <h2 className="text-3xl font-medium title-font text-foreground my-10 text-center">
          Blog Categories
        </h2>
        <div className="flex flex-wrap justify-center mx-6">
          {blogs.map((blog, index) => (
            <div key={index} className="p-4 md:w-1/3 flex justify-center">
              <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-card hover-effect">
                <img
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
                  <div className="text-sm mb-4">
                    <span>
                      {new Date(blog.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
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
