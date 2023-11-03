const { client } = require("../database");
const Product = require("../models/product");
const { getAllProuctsHelperFunction } = require("./shop");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  await product.save();
  res.redirect("/");
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  await client.query(
    `SELECT * FROM "public"."product" WHERE id = ${prodId}`,
    (_err, result) => {
      const product = result.rows[0];
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    }
  );
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  await client.query(
    `UPDATE "public"."product" SET "title"= '${updatedTitle}',"imageurl" ='${updatedImageUrl}', "description" = '${updatedDesc}',"price" = '${updatedPrice}' WHERE "id" = ${prodId}`,
    (err, res) => {
      console.log(err);
    }
  );
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  getAllProuctsHelperFunction(
    res,
    "admin/products",
    "/admin/products",
    "Admin Products"
  );
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  await client.query(`DELETE FROM "public"."product" WHERE id = ${prodId}`);
  res.redirect("/products");
};
