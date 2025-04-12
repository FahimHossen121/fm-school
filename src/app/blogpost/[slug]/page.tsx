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

  return (
    <>
      <section className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-80 w-full my-6 rounded-lg shadow-lg overflow-hidden"></div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center">
            {data.title}
          </h1>
          <p className="text-lg mb-2 border-l-4 border-zinc-500 pl-4 italic text-muted-foreground">
            &quot;{data.description}&quot;
          </p>
          <div className="flex flex-wrap justify-between items-center text-sm text-muted-foreground mb-6">
            <p className="italic">By {data.author}</p>
            <p>Updated: {data.date}</p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose dark:prose-invert"
          ></div>
        </div>
      </section>
    </>
  );
}
