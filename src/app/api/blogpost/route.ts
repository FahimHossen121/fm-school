import connectDB from "../../../lib/config/db";
import Blog from "../../../lib/models/blogModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const slug=request.nextUrl.searchParams.get('slug');
  console.log(slug);
  await connectDB();
  const blogs = await Blog.find({ slug: slug }).sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: blogs });
}
