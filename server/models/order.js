const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
};

const paymentSchema = {
  paymentMethod: { type: String, required: true }
};

const orderItemSchema = {
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  images: [{ type: String, required: true }],
  price: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "products", required: true }
};

const orderSchema = new Schema(
  {
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivred: { type: Boolean, default: false },
    delivredAt: { type: Date }
  },
  {
    timestamps: true
  }
);

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
