const Category = require("../models/category");
const Product = require("../models/product");

//getAllCategories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneCategory = async (req, res) => {
  try {
    const category = Category.find({ _id: req.params.id });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.createCategory = (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    image: req.file.path
  });
  category
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({ message: "New Category Created" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.updateCategory = (req, res) => {
  const id = req.params.id;
  Category.updateOne(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        image: req.file.path
      }
    }
  )
    .exec()
    .then(result => {
      res.status(200).json({ message: "Category updated" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err });
    });
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  Category.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({ message: "Category deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
