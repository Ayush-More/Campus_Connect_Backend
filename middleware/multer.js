const multer = require("multer");

const storage = multer.memoryStorage();

const SingleUpload = multer({ storage }).single("Pdf");
const SingleImage = multer({ storage }).single("image");

module.exports = { SingleUpload, SingleImage };
