const Order = require("../models/order");
const Product = require("../models/product");

exports.getAllOrder = (req, res) => {
  Order.find()
    .populate("product")
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          // this map is for a structured data it is not indispensable
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// exports.getOneOrder = (req, res) => {
//   Order.findById(req.params.id)
//     .populate("product")
//     .exec()
//     .then(doc => {
//       if (!doc) {
//         return res.status(404).json({ message: "Order not found" });
//       }
//       res.status(200).json({ doc: doc });
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     });
// };
exports.getOneOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found");
  }
};

exports.createOrder = async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice
  });
  const newOrderCreated = await newOrder.save();
  console.log("order", req.body);
  res.status(201).send({ message: "New order Created", data: newOrderCreated });
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "paypal",
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    };
    const updatedOrder = await order.save();
    res.send({ message: "Order Paid", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order not found" });
  }
};

// exports.updateOrder = (req, res) => {
//   const id = req.params.id;
//   Order.updateOne(
//     { _id: id },
//     { $set: { quantity: req.body.quantity, product: req.body.id } }
//   )
//     .exec()
//     .then(result => {
//       res.status(200).json({ message: "Order updated" });
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     });
// };

exports.deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({ message: "Order successfully deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
