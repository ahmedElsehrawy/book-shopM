const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.render("shop/product-list", {
        prods: result,
        pageTitle: "All Products",
        path: "/",
      });
    })
    .catch((err) => {
      console.log("🚀 ~ file: shop.js:51 ~ Product.findAll ~ err:", err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.render("shop/product-list", {
        prods: result,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("🚀 ~ file: shop.js:51 ~ Product.findAll ~ err:", err);
    });
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((result) => {
      res.render("shop/product-detail", {
        product: result,
        pageTitle: result.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("🚀 ~ file: shop.js:39 ~ Product.findByPk ~ err:", err);
    });
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
