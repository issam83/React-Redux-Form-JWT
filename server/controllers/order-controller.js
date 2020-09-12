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

exports.getOneOrder = (req, res) => {
  Order.findById(req.params.id)
    .populate("product")
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ doc: doc });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.createOrder = (req, res) => {
  Product.findById(req.body.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const order = new Order({
        quantity: req.body.quantity,
        product: req.body.id
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({ message: "Order successfully created" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.updateOrder = (req, res) => {
  const id = req.params.id;
  Order.updateOne(
    { _id: id },
    { $set: { quantity: req.body.quantity, product: req.body.id } }
  )
    .exec()
    .then(result => {
      res.status(200).json({ message: "Order updated" });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

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
