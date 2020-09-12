const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const multer = require("multer");
const isAuth = require("../utils");
const isAdmin = require("../utils");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function(req, file, cb) {
    console.log(file.originalname, "AAAA");
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.get("/", productController.getAllProductsByCategories);
router.get("/category/:id", productController.getAllProductsByCategory);
router.get("/:id", productController.getOneProduct);
router.post(
  "/create",
  // isAdmin.isAdmin,
  // isAuth.isAuth,

  // upload.single("image"),
  productController.createProduct
);
router.put(
  "/:id",
  // isAdmin.isAdmin,
  // isAuth.isAuth,

  upload.array("image", 12),
  productController.updateProduct
);
router.delete(
  "/:id",
  // isAdmin.isAdmin,
  // isAuth.isAuth,
  productController.deleteProduct
);

module.exports = router;
