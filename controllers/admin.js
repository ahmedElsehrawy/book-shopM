const { client } = require("../database");
const Product = require("../models/product");

exports.getAddProduct = (_, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageurl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title,
    price,
    imageurl,
    description,
    userId: req.user.id,
  })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: admin.js:29 ~ exports.postAddProduct= ~ err:",
        err
      );
    });
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  // req.user
  //   .getProducts({ where: { id: prodId } })
  Product.findOne({ where: { id: prodId, userId: req.user.id } })
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log("🚀 ~ file: admin.js:49 ~ Product.findByPk ~ err:", err);
    });
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageurl = req.body.imageUrl;
  const description = req.body.description;

  Product.update(
    { title, price, imageurl, description },
    {
      where: {
        id: prodId,
      },
    }
  )
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: admin.js:74 ~ exports.postEditProduct= ~ err:",
        err
      );
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll({ where: { userId: req.user.id } })
    .then((result) => {
      res.render("admin/products", {
        prods: result,
        pageTitle: "Admin Products",
        path: "admin/products",
      });
    })
    .catch((err) => {
      console.log("🚀 ~ file: shop.js:51 ~ Product.findAll ~ err:", err);
    });
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  Product.destroy({
    where: {
      id: prodId,
    },
  }).then((_) => {
    res.redirect("/products");
  });
};
