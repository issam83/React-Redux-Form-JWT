const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");
var multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getOneCategory);
router.post(
  "/create",
  upload.single("image"),
  categoryController.createCategory
);
router.put("/:id", upload.single("image"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
