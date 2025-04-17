import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Blog from "../../../lib/models/blogModel";
import connecDB from "../../../lib/config/db";

export async function POST(request) {
  await connecDB();
  const formData = await request.formData();
  const rawTitle = formData.get("title");

  const slug = rawTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");

  //  const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  //  console.log({ slug, isValid });

  const exist = await Blog.findOne({ slug: slug });
  if (exist) {
    return NextResponse.json({
      success: false,
      message: "Slug already exist, please try another one",
    });
  }
  const file = formData.get("image");

  const uploadDir = path.join(process.cwd(), "public", "blogs");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  const imageUrl = `/blogs/${filename}`;
  console.log(formData);
  console.log(slug);
  const newBlog = new Blog({
    title: formData.get("title"),
    slug: slug,
    description: formData.get("description"),
    content: formData.get("content"),
    image: imageUrl,
  });
  await newBlog.save();
  console.log(newBlog);

  return NextResponse.json({
    success: true,
    message: "File uploaded successfully",
    path: `${imageUrl}`,
  });
}

export async function GET(request) {
  await connecDB();
  const blogs = await Blog.find({}).sort();
  return NextResponse.json({ success: true, data: blogs });
}
