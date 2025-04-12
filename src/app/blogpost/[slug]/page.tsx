import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import Image from "next/image";
import { useEffect, useState } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filepath = `content/${slug}.md`;

  if (!fs.existsSync(filepath)) {
    notFound();
    return;
  }

  const fileContent = fs.readFileSync(filepath, "utf-8");
  const { content, data } = matter(fileContent);

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: "👋🌍" })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    });

  const htmlContent = (await processor.process(content)).toString();

  // Extract h2 headings for the TOC
  const headings = Array.from(content.matchAll(/^##\s(.+)$/gm)).map(
    (match) => match[1]
  );

  return (
    <>
      <section className="min-h-screen bg-background text-foreground">
        <div className="w-full max-w-full mx-0 px-4 mt-8 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
          {/* Table of Contents */}
          <aside className="lg:w-1/4 lg:sticky lg:top-16 lg:self-start lg:mr-8 mb-8 lg:mb-0">
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
            {/* <p className="text-lg mb-2 border-l-4 border-muted pl-4 italic text-muted-foreground">
              &quot;{data.description}&quot;
            </p> */}
            <div className="flex flex-wrap justify-between items-center text-sm text-muted-foreground mb-6"></div>
            <div
              className="prose dark:prose-invert lg:prose-xl text-foreground"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              style={{ scrollMarginTop: "5rem", maxWidth: "100%" }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
}
