import React from "react";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  publishedAt?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  imageUrl,
  slug,
  publishedAt,
}) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-card hover:shadow-xl transition-shadow duration-300">
      <Link href={`/blogpost/${slug}`}>
        <img
          className="object-cover w-full h-auto aspect-video"
          src={imageUrl}
          alt={title}
        />
      </Link>
      <div className="px-4 py-4">
        <Link href={`/blogpost/${slug}`}>
          <div className="title-font flex text-md font-medium text-foreground mb-3 text-justify">
            {title}
          </div>
        </Link>
        <p className="text-muted text-base line-clamp-3 text-justify">
          {description}
        </p>
      </div>
      <div className="px-6 pb-6">
        <Link
          href={`/blogpost/${slug}`}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-md transition-colors"
        >
          Read More
        </Link>
      </div>
      <div className="px-6 pb-4 text-right">
        {publishedAt && (
          <span className="text-tiny text-muted">
            {new Date(publishedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
