import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 
    },
    description: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now }, 
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
