const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true
  },
  quantity: { type: Number, default: 0 }
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
