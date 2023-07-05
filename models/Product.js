const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    desc: { type: String, required: true },
    img: { type: Array, required: true },
    categories: { type: Array },
    subCategories: { type: Array },
    newPrice: { type: Number, required: true },
    oldPrice: { type: Number },
    isTrend: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
