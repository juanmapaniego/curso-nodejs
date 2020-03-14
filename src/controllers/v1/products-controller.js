const Products = require("../../mongo/models/product.js");

const createProduct = async (req, res) => {
  try {
    const { title, desc, price, images, userId } = req.body;
    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId
    });
    res.json({ status: "OK", data: product });
  } catch (e) {
    console.log("Create product error:  ", e);
    res.status(500).json({ status: "ERROR", data: e.message });
  }
};

const deleteProduct = (req, res) => {};

const getProducts = async (req, res) => {
  try {
    const products_list = await Products.find()
      .populate("user", "username email")
      .select("title desc price");
    res.json({ status: "OK", list: products_list });
  } catch (error) {
    console.log("List Product error: ", error);
    res.status(500).json({ status: "ERROR", message: error.message });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const products_list = await Products.find({
        user: userId,
        price: {$gt: 10}
    });
    res.json({ status: "OK", list: products_list });
  } catch (error) {
    console.log("List Product error: ", error);
    res.status(500).json({ status: "ERROR", message: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByUser
};
