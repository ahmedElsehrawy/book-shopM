const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const { client, createSchema } = require("./database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

app.listen(3000, async () => {
  await client.connect();

  await client.query('SELECT * FROM "public"."product"', (err, res) => {
    if (err) {
      createSchema();
    }
    if (res) {
      console.log("🚀 ~ file: app.js:33 ~ awaitclient.query ~ res:", res);
    }
  });
});
