import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    content: { type: String, required: true },
    topic: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

tutorialSchema.index({ topic: 1, slug: 1 }, { unique: true });

const Tutorial =
  mongoose.models.Tutorial || mongoose.model("Tutorial", tutorialSchema);

export default Tutorial;
