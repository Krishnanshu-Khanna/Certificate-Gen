// pdfGenerator.js
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generatePDF = async (name) => {
  try {
    const existingPdfBytes = await fetch('/certificate.pdf').then((res) =>
      res.arrayBuffer()
    );

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Embed the Helvetica font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Draw a string of text diagonally across the first page
    const textWidth = font.widthOfTextAtSize(name, 58);
    const centerX = (firstPage.getWidth() - textWidth) / 2;

    firstPage.drawText(name, {
      x: centerX,
      y: 270,
      size: 58,
      font,
      color: rgb(250 / 255, 194 / 255, 7 / 255),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
