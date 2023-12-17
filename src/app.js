// app.js
const express = require("express");
const bodyParser = require("body-parser");
const pdfController = require("./controllers/pdfController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", pdfController);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
