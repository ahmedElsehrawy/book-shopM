const Product = require("../models/product");
const Cart = require("../models/cart");
const { client } = require("../database");

const getAllProuctsHelperFunction = async (
  res,
  renderPagePath,
  path,
  title
) => {
  await client.query('SELECT * FROM "public"."product"', (err, result) => {
    if (!err) {
      res.render(renderPagePath, {
        prods: result?.rows,
        pageTitle: title,
        path: path,
      });
    }
  });
};

exports.getAllProuctsHelperFunction = getAllProuctsHelperFunction;

exports.getProducts = (req, res, next) => {
  getAllProuctsHelperFunction(
    res,
    "shop/product-list",
    "/products",
    "All Products"
  );
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;

  await client.query(
    `SELECT * FROM "public"."product" WHERE id = ${prodId}`,
    (_err, result) => {
      res.render("shop/product-detail", {
        product: result.rows[0],
        pageTitle: result.rows[0].title,
        path: "/products",
      });
    }
  );
};

exports.getIndex = (req, res, next) => {
  getAllProuctsHelperFunction(res, "shop/product-list", "/", "All Products");
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart((cart) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cart.products,
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.deleteFromCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

//adding comment
