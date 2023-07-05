const Product = require("../models/product");

const router = require("express").Router();

//create

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all product
router.get("/", async (req, res) => {
  const qCat = req.query.category;
  const qTrend = req.query.trend;
  const qFeatured = req.query.featured;
  try {
    let products;
    if (qTrend) {
      products = await Product.find({ isTrend: true }).limit(4);
    } else if (qFeatured) {
      products = await Product.find({ isFeatured: true }).limit(4);
    } else if (qCat) {
      products = await Product.find({
        categories: {
          $in: [qCat],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
