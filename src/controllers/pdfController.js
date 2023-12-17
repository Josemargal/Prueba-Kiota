// pdfController.js
const express = require("express");
const router = express.Router();
const { generatePDF } = require("../services/pdfService");

router.post("/generate-pdf", async (req, res) => {
  try {
    const jsonFilePath = "./input.json";
    const pdfBase64 = await generatePDF(jsonFilePath);
    res.status(200).send(pdfBase64);
  } catch (error) {
    console.error(`Error generando el PDF: ${error.message}`);
    res.status(500).send("Error generando el PDF");
  }
});

module.exports = router;
