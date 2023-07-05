const Category = require("../models/Category");

const router = require("express").Router();

//create

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get category
router.get("/", async (req, res) => {
  const Cat = req.query.category;
  try {
    const selectedCat = await Category.find({ title: Cat });
    res.status(200).json(selectedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
