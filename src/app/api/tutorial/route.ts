import connectDB from "../../../lib/config/db";
import { NextResponse } from "next/server";
import Tutorial from "../../../lib/models/tutorialModel";
export async function POST(request: Request) {
  await connectDB();
  try {
    const formData = await request.formData();
    const rawTitle = formData.get("title");
    if (!rawTitle) {
      return NextResponse.json({
        success: false,
        message: "Title is required",
      });
    }
    const slug = rawTitle
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");

    const exist = await Tutorial.findOne({
      slug: slug,
      topic: formData.get("topic"),
    });
    if (exist) {
      return NextResponse.json({
        success: false,
        message: "Slug already exist, please try another one",
      });
    }
    const newTutorial = new Tutorial({
      title: formData.get("title"),
      slug: slug,
      content: formData.get("content"),
      topic: formData.get("topic"),
    });
    await newTutorial.save();
    console.log(newTutorial);
    return NextResponse.json({
      success: true,
      message: "Tutorial created successfully",
      data: newTutorial,
    });
  } catch (error) {
    console.error("Error creating tutorial:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create tutorial",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function GET(request: Request) {
  await connectDB();
  const url = new URL(request.url);
  const topic = url.searchParams.get("topic");
  if (!topic) {
    return NextResponse.json({
      success: false,
      message: "Topic is required",
    });
  }
  const tutorials = await Tutorial.find({ topic: topic.toString() }).sort({
    createdAt: -1,
  });
  console.log("Fetched tutorials for topic:", topic, tutorials);

  return NextResponse.json(tutorials);
}

export async function PUT(request: Request) {
  await connectDB();
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Tutorial ID is required",
      });
    }

    const body = await request.json();
    const { title, content, topic } = body;

    if (!title) {
      return NextResponse.json({
        success: false,
        message: "Title is required",
      });
    }

    // Generate new slug from updated title
    const slug = title
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if slug already exists for a different tutorial
    const existingTutorial = await Tutorial.findOne({
      slug: slug,
      topic: topic,
      _id: { $ne: id },
    });

    if (existingTutorial) {
      return NextResponse.json({
        success: false,
        message: "Slug already exists, please try another title",
      });
    }

    const updatedTutorial = await Tutorial.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        content,
        topic,
      },
      { new: true }
    );

    if (!updatedTutorial) {
      return NextResponse.json({
        success: false,
        message: "Tutorial not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Tutorial updated successfully",
      data: updatedTutorial,
    });
  } catch (error) {
    console.error("Error updating tutorial:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update tutorial",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function DELETE(request: Request) {
  await connectDB();
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Tutorial ID is required",
      });
    }

    const deletedTutorial = await Tutorial.findByIdAndDelete(id);

    if (!deletedTutorial) {
      return NextResponse.json({
        success: false,
        message: "Tutorial not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Tutorial deleted successfully",
      data: deletedTutorial,
    });
  } catch (error) {
    console.error("Error deleting tutorial:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete tutorial",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
