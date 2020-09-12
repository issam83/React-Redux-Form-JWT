const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String, unique: true },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    image: { type: String }
  },
  { collection: "categories" }
);
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
