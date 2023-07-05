const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    desc: { type: String, required: true },
    img: { type: String },
    subCategories: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
