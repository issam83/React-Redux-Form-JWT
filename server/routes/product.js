const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const multer = require("multer");
const isAuth = require("../utils");
const isAdmin = require("../utils");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    console.log(file.originalname, "AAAA");
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype, "TYPE");
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
}).array("images", 2);

router.get("/", productController.getAllProductsByCategories);
router.get("/category/:id", productController.getAllProductsByCategory);
router.get("/:id", productController.getOneProduct);
router.post("/create", upload, productController.createProduct);
router.put("/:id", upload, productController.updateProduct);
router.delete(
  "/:id",
  // isAdmin.isAdmin,
  // isAuth.isAuth,
  productController.deleteProduct
);

module.exports = router;
