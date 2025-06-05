const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();
const db = require("./config/database");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/pages"));
app.use(expressLayouts);
app.set("layout", path.join(__dirname, "views/layout/layout"));


app.use(express.static(path.join(__dirname, "views")));


app.use("/", require("./routes/pageRoutes"));


app.use("/api", require("./routes/usuarioRoutes"));
app.use("/api", require("./routes/salaRoutes"));
app.use("/api", require("./routes/reservaRoutes"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor escutando em http://localhost:${PORT}`)
);

module.exports = app;