"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  slug: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        console.log("API response:", response.data);
        setBlogs(response.data.data || []);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto lg:my-2">
        <h2 className="text-3xl font-semibold title-font text-foreground my-10 text-center tracking-tight">
          Blog Categories
        </h2>
        <div className="flex flex-wrap justify-center mx-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-4 md:w-1/3 flex justify-center animate-pulse"
            >
              <div className="max-w-sm rounded-2xl shadow-lg bg-muted p-4 space-y-4 w-full">
                <div className="bg-gray-300 h-48 rounded-lg w-full"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-8 bg-gray-300 rounded w-32 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto lg:my-2">
      <h2 className="text-xl font-semibold title-font text-foreground my-10 text-center tracking-tight">
        Blog Categories
      </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-muted-foreground">No blogs available.</p>
      ) : (
        <div className="flex flex-wrap justify-center mx-6">
          {blogs.map((blog) => (
            <div
              key={blog.id || blog.slug}
              className="p-4 md:w-1/5 flex justify-center hover:scale-105 transition-transform duration-300 h-auto"
            >
              <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-card hover:shadow-xl transition-shadow duration-300">
                <img
                  className="object-cover w-full h-auto aspect-video"
                  src={blog.image || "/placeholder.jpg"}
                  width={1280}
                  height={720}
                  alt={blog.title}
                />
                <div className="px-4 md:my-11 lg:my-0 md:h-72 lg:h-46 lg:py-4 xl:h-52 mt-5">
                  <div className="title-font flex text-md font-medium text-foreground mb-3 max-h-4/10 text-justify">
                    <Link href={`/blogpost/${blog.slug}`}>{blog.title}</Link>
                  </div>
                  <p className="text-muted text-base line-clamp-3 max-h-4/10 text-justify">
                    {blog.description}
                  </p>
                </div>
                <div className="px-6 pb-6 flex flex-row justify-between items-center">
                  <Link
                    href={`/blogpost/${blog.slug}`}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Read More
                  </Link>
                  {blog.publishedAt && (
                    <span className="text-tiny text-muted">
                      {new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
