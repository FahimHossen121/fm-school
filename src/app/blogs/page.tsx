"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/BlogCard";

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
        setBlogs(response.data.data || []);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id || blog.slug}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.image || "/placeholder.jpg"}
              slug={blog.slug}
              publishedAt={blog.publishedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
