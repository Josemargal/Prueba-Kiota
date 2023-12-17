// pdfService.js
const fs = require("fs");
const PDFDocument = require("pdfkit");

async function generatePDF(inputFilePath) {
  return new Promise((resolve, reject) => {
    // Leer el archivo JSON de entrada
    fs.readFile(inputFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error al leer el archivo JSON: ${err.message}`);
        reject(err);
        return;
      }

      try {
        const inputData = JSON.parse(data);
        const doc = new PDFDocument();

        // Capturar errores de PDFKit
        doc.on("error", (error) => {
          console.error(`Error en PDFKit: ${error.message}`);
          reject(error);
        });

        // Añadir fondo degradado de naranja a azul al fondo de la página
        const gradient = doc.linearGradient(0, 0, doc.page.width, 0);
        gradient.stop(0, "orange");
        gradient.stop(1, "blue");

        doc.rect(0, 0, doc.page.width, doc.page.height).fill(gradient);

        // Añadir rectángulo blanco con bordes redondeados
        const outerRectWidth = doc.page.width - 50;
        const outerRectHeight = 70;
        const outerRectX = (doc.page.width - outerRectWidth) / 2;
        const outerRectY = 50;

        doc
          .roundedRect(
            outerRectX,
            outerRectY,
            outerRectWidth,
            outerRectHeight,
            20
          )
          .fillColor("white")
          .fill();

        // Añadir texto centrado en el rectángulo blanco
        const titleText = "CUESTIONARIO DE INNOVACIÓN";
        const titleFontSize = 14; // Ajusta el tamaño de la fuente del título
        const titleTextWidth = doc.widthOfString(titleText, {
          fontSize: titleFontSize,
        });

        const titleX = outerRectX + (outerRectWidth - titleTextWidth) / 2;
        const titleY = outerRectY + (outerRectHeight - titleFontSize) / 2 + 20;

        doc
          .fillColor("blue")
          .fontSize(titleFontSize)
          .text(titleText, titleX, titleY);

        // Añadir rectángulo azul más pequeño arriba a la izquierda
        const innerRectWidth = 230; // Modifica el ancho del rectángulo azul
        const innerRectHeight = 20; // Modifica la altura del rectángulo azul
        const innerRectX = outerRectX + 20; // Modifica la posición X
        const innerRectY = outerRectY + 10; // Modifica la posición Y

        doc
          .roundedRect(
            innerRectX,
            innerRectY,
            innerRectWidth,
            innerRectHeight,
            15
          )
          .fillColor("blue")
          .fill();

        // Añadir texto dentro del rectángulo azul
        const textoRectangulo = "INFORME DE EXCELENCIA INNOVADORA CEEIs CLM";
        const fontSize = 7; // Modifica el tamaño de la fuente

        doc
          .fontSize(fontSize)
          .fillColor("white")
          .text(textoRectangulo, innerRectX + 10, innerRectY + 6, {
            width: innerRectWidth - 8, // Ajusta el ancho del texto
            height: innerRectHeight - 10, // Ajusta la altura del texto
            align: "center",
            valign: "center",
          });

        // Añadir texto "INFORMACIÓN GENERAL" en blanco debajo del rectángulo blanco
        const infoGeneralText = "INFORMACIÓN GENERAL";
        const infoGeneralFontSize = 16;

        const infoGeneralTextWidth = doc.widthOfString(infoGeneralText, {
          fontSize: infoGeneralFontSize,
        });

        const infoGeneralX = (doc.page.width - infoGeneralTextWidth) / 35; // Ajusta la posición X
        const infoGeneralY = outerRectY + outerRectHeight + 20; // Ajusta la posición Y

        doc
          .fillColor("white")
          .fontSize(infoGeneralFontSize)
          .text(infoGeneralText, infoGeneralX, infoGeneralY, {
            width: doc.page.width,
            align: "center",
          });

        // Añadir texto de la persona de contacto dentro del rectángulo blanco
        const contactRectWidth = doc.page.width - 50;
        const contactRectHeight = 90;
        const contactRectX = (doc.page.width - contactRectWidth) / 2;
        const contactRectY = outerRectY + outerRectHeight + 40;

        doc
          .roundedRect(
            contactRectX,
            contactRectY,
            contactRectWidth,
            contactRectHeight,
            20
          )
          .fillColor("white")
          .fill();

        // Añadir texto "PERSONA DE CONTACTO" en la esquina superior izquierda en color naranja
        doc
          .fillColor("orange")
          .fontSize(12)
          .text("PERSONA DE CONTACTO", contactRectX + 20, contactRectY + 20);

        // Añadir títulos en azul
        const titles = [
          "Nombre",
          "Apellido",
          "Cargo",
          "Teléfono",
          "Correo Electrónico",
        ];
        const titleWidth = 80; // Ancho de cada columna
        const totalTitlesWidth = titleWidth * titles.length;
        const titlesX =
          contactRectX + (contactRectWidth - totalTitlesWidth) / 2;
        const titlesY = contactRectY + 50;

        doc.fillColor("blue").fontSize(10);

        titles.forEach((title, index) => {
          doc.text(title, titlesX + titleWidth * index, titlesY);
        });

        // Añadir información en negro en una línea abajo
        const contactInfo = [
          inputData.contact_person.name,
          inputData.contact_person.last_name,
          inputData.contact_person.role,
          inputData.contact_person.phone,
          inputData.contact_person.email,
        ];
        const infoWidth = 80; // Ancho de cada columna
        const totalInfoWidth = infoWidth * contactInfo.length;
        const infoX = contactRectX + (contactRectWidth - totalInfoWidth) / 2;
        const infoY = contactRectY + 70;

        doc.fontSize(8).fillColor("black");

        contactInfo.forEach((info, index) => {
          doc.text(info, infoX + infoWidth * index, infoY);
        });

        // Añadir recuadro blanco con información de la empresa
        const companyRectWidth = doc.page.width - 50;
        const companyRectHeight = 300; // Aumenta la altura para dar más espacio a la información
        const companyRectX = (doc.page.width - companyRectWidth) / 2;
        const companyRectY = contactRectY + contactRectHeight + 20;

        doc
          .roundedRect(
            companyRectX,
            companyRectY,
            companyRectWidth,
            companyRectHeight,
            20
          )
          .fillColor("white")
          .fill();

        // Añadir texto "INFORMACIÓN DE LA EMPRESA" en la esquina superior izquierda en color naranja
        doc
          .fillColor("orange")
          .fontSize(12)
          .text(
            "INFORMACIÓN DE LA EMPRESA",
            companyRectX + 20,
            companyRectY + 20
          );

        // Función para añadir títulos e información en columnas
        function addColumnData(titles, data, x, y) {
          const columnWidth = companyRectWidth / titles.length;
          const titleX = x;
          const dataX = x + 10;
          const startY = y;

          doc.fillColor("blue").fontSize(10);
          titles.forEach((title, index) => {
            doc.text(title, titleX + columnWidth * index, startY);
          });

          doc.fontSize(8).fillColor("black");
          data.forEach((info, index) => {
            doc.text(info, dataX + columnWidth * index, startY + 20);
          });
        }

        // Añadir secciones de información
        // Línea 1 (CIF, Razón social, Nombre comercial)
        const basicInfoTitles1 = ["CIF", "Razón social", "Nombre comercial"];
        const basicInfoData1 = [
          inputData.company_info.cif,
          inputData.company_info.business_name,
          inputData.company_info.commercial_name,
        ];
        addColumnData(
          basicInfoTitles1,
          basicInfoData1,
          companyRectX + 20,
          companyRectY + 60
        );

        // Línea 2 (Dirección, CP, Provincia, Localidad)
        const basicInfoTitles2 = ["Dirección", "CP", "Provincia", "Localidad"];
        const basicInfoData2 = [
          inputData.company_info.address,
          inputData.company_info.cp,
          inputData.company_info.province,
          inputData.company_info.cirty,
        ];
        addColumnData(
          basicInfoTitles2,
          basicInfoData2,
          companyRectX + 20,
          companyRectY + 120
        );

        // Línea 3 (Teléfono, Página web, Correo electrónico, Sector)
        const basicInfoTitles3 = [
          "Teléfono",
          "Página web",
          "Correo electrónico",
          "Sector",
        ];
        const basicInfoData3 = [
          inputData.company_info.phone,
          inputData.company_info.web,
          inputData.company_info.email,
          inputData.company_info.sector,
        ];
        addColumnData(
          basicInfoTitles3,
          basicInfoData3,
          companyRectX + 20,
          companyRectY + 180
        );

        // Finaliza el documento y guarda en un archivo local
        let outputPath = "./pdfFinal/archivo.pdf"; // Cambia a tu ruta preferida
        const writeStream = fs.createWriteStream(outputPath);

        // Capturar errores de escritura
        writeStream.on("error", (error) => {
          console.error(`Error al escribir en el archivo: ${error.message}`);
          reject(error);
        });

        writeStream.on("finish", () => {
          console.log(`PDF guardado en: ${outputPath}`);
          resolve(outputPath);
        });

        doc.pipe(writeStream);
        doc.end();
      } catch (parseError) {
        console.error(
          `Error al parsear el archivo JSON: ${parseError.message}`
        );
        reject(parseError);
      }
    });
  });
}

module.exports = { generatePDF };
