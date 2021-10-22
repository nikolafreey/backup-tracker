const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true, //This is used by Mongoose when doing querys and for filtering purposes, $text method is used in the find query on a model
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true, //This is used by Mongoose when doing querys and for filtering purposes, $text method is used in the find query on a model
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    recursive: {
      type: Boolean,
    },
    recursiveId: {
      type: Number,
      index: true,
      unique: true,
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
