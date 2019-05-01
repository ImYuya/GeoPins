const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
    title: String,
    content: String,
    image: String,
    latitude: Number,
    longitude: Number,
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        author: { type: mongoose.Schema.ObjectId, ref: "User" }
      }
    ]
  },
  { timstamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
