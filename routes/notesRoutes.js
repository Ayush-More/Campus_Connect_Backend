const express = require("express");

const router = express.Router();
const notesController = require("../controller/notesController");
const authController = require("../controller/authController");
const SingleUpload = require("../middleware/multer");

router.use(authController.protect);

/* GET users listing. */
router
  .get("/:type", notesController.GetNotesBytype)
  .get("/", notesController.getAllNotess)
  .post("/addNotes", SingleUpload.SingleUpload, notesController.uploadPdf)
  .post("/favourite", notesController.FavouritePdf);

router.use(authController.restrictTo("admin"));

router
  .route("/:id")
  .patch(notesController.updateNotes)
  .get(notesController.getNotes)
  .delete(notesController.deleteNotes);

module.exports = router;
