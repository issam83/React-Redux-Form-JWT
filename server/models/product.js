const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    brand: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    category_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
      }
    ],
    // countInStock: { type: Number, default: 0, required: true },
    // rating: { type: Number, default: 0, required: true },
    numReview: { type: Number, default: 0, required: true },
    isNewProduct: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: "products" }
);

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
