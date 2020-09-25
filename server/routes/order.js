const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");

router.get("/", orderController.getAllOrder);
router.get("/:id", orderController.getOneOrder);
router.post("/create", orderController.createOrder);
router.put("/:id/pay", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
