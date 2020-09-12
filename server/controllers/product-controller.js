const Product = require("../models/product");
const Category = require("../models/category");

exports.getAllProductsByCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const products = await Product.find(); // const result = await Category.find()
    const treatments = categories.reduce((acc, category) => {
      return {
        ...acc,
        [category.name]: products.filter(product => {
          return product.category_id.includes(category._id);
        })
      };
      // this map is for a structured data it is not indispensable
    }, []);
    res.status(200).json(treatments);
    // console.log(treatments);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAllProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category_id: { $in: [req.params.id] }
    });
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    Product.create({
      name: req.body.name,
      // image: req.file.path,
      brand: req.body.brand,
      price: req.body.price,
      description: req.body.description,
      category_id: [req.body.category_id],
      countInStock: req.body.countInStock,
      // rating: req.body.rating,
      // numReview: req.body.numReview,
      isNewProduct: req.body.isNewProduct
    });
    return res.status(201).json({ message: "Product successfully Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in Product Creation" });
  }
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  // check s'il exist sinon throw error
  if (!id) {
    return res.status(404).json({ message: "This product doesn't exist" });
  }
  Product.updateOne(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        category_id: req.body.category_id,
        countInStock: req.body.countInStock,
        // rating: req.body.rating,
        // numReview: req.body.numReview,
        isNewProduct: req.body.isNewProduct
      }
    }
  )
    .exec()
    .then(result => {
      res.status(200).json({ message: "Product updated" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err });
    });
};

exports.deleteProduct = async (req, res) => {
  const deleteProduct = Product.findById({ _id: req.params.id });
  if (deleteProduct) {
    await deleteProduct.deleteOne();
    res.status(200).json({ message: "Product successfully deleted" });
  } else {
    res.status(500).json({ error: err });
  }
};
