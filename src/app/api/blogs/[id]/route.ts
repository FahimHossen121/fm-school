import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Blog from "../../../../lib/models/blogModel";
import connecDB from "../../../../lib/config/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connecDB();
  const id = await params.id;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    // console.log(blog);

    if (blog) {
      const image = blog.image.split("/").pop();
      const imageDir = path.join(process.cwd(), "public", "blogs");
      const imageFile = path.join(imageDir, image);
      console.log(imageFile);

      try {
        fs.unlinkSync(imageFile);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    return NextResponse.json(
      { success: true, message: "Blog deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting blog" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connecDB();
  const { id } = await params;
  const formData = await req.formData();
  console.log(formData);
  const file = formData.get("image");
  console.log(file);
  try {
    //     // const [fields, files] = await parseForm(req);

    const old = await Blog.findById(id);
    //     if (!old) {
    //       return NextResponse.json(
    //         { success: false, message: "Blog not found" },
    //         { status: 404 }
    //       );
    //     }

    let imagePath = null;

    if (file) {
      const oldImageName = old.image.split("/").pop();
      const oldImagePath = path.join(
        process.cwd(),
        "public",
        "blogs",
        oldImageName
      );
      try {
        fs.unlinkSync(oldImagePath);
      } catch (err) {
        console.error("Error deleting old image:", err);
      }

      const uploadDir = path.join(process.cwd(), "public", "blogs");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filename = `${Date.now()}-${(file as File)?.name}`;
      const filePath = path.join(uploadDir, filename);

      const buffer = Buffer.from(await (file as File).arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      imagePath = `/blogs/${filename}`;
    }
    const rawTitle = formData.get("title");
    if (!rawTitle) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }
    const slug = rawTitle
      ? rawTitle
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";

    const exist = await Blog.findOne({ slug: slug, _id: { $ne: id } });
    if (exist) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug already exists, please try another one",
        },
        { status: 400 }
      );
    }
    if (!old) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: formData.get("title"),
        slug: slug,
        description: formData.get("description"),
        content: formData.get("content"),
        image: imagePath ? imagePath : old.image,
      },
      { new: true }
    );
    console.log(updatedBlog);

    return NextResponse.json(
      { success: true, message: "Blog updated", data: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: "Error updating blog" },
      { status: 500 }
    );
  }
}
