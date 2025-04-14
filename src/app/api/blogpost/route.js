import connecDB from "../../../lib/config/db";
import Blog from "../../../lib/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  const slug=request.nextUrl.searchParams.get('slug');
//   const { slug } = request.json();
  console.log(slug);

  await connecDB();
  const blogs = await Blog.find({ slug: slug }).sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: blogs });
}
