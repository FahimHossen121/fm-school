"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

interface BlogData {
  title: string;
  content: string;
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [data, setData] = useState<BlogData | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [headings, setHeadings] = useState<string[]>([]);

  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;

      try {
        const response = await axios.get(`/api/blogpost?slug=${slug}`);
        const post = response.data.data[0] as BlogData;
        setData(post);

        const processor = unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(rehypeDocument, { title: post.title })
          .use(rehypeFormat)
          .use(rehypeSlug)
          .use(rehypeAutolinkHeadings)
          .use(rehypePrettyCode, {
            theme: "github-dark",
            transformers: [
              transformerCopyButton({
                visibility: "always",
                feedbackDuration: 3000,
              }),
            ],
          })
          .use(rehypeStringify);

        const file = await processor.process(post.content);
        setHtmlContent(file.toString());

        const headings = Array.from(post.content.matchAll(/^##\s(.+)$/gm)).map(
          (match) => match[1]
        );
        setHeadings(headings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="border-4 border-t-4 border-t-primary border-gray-200 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-full mx-0 px-4 mt-8 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
        {/* Table of Contents */}
        <aside className="lg:w-1/4 lg:sticky lg:top-16 lg:self-start  lg:mr-8 mb-8 lg:mb-0">
          <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4 text-primary">
              Table of Contents
            </h2>
            <ul className="space-y-2">
              {headings.map((heading, index) => (
                <li key={index}>
                  <a
                    href={`#${heading.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Blog Content */}
        <div className="lg:w-3/4">
          <h1
            id={data.title.toLowerCase().replace(/\s+/g, "-")}
            className="text-3xl sm:text-4xl font-extrabold mb-4 text-center mt-10 text-primary"
            style={{ scrollMarginTop: "5rem" }}
          >
            {data.title}
          </h1>
          <div
            className="prose dark:prose-invert lg:prose-xl text-foreground"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{ scrollMarginTop: "5rem", maxWidth: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
