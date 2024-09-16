const cloudinary = require("cloudinary");
const notes = require("../model/notesModel");
const catchAsync = require("../utility/catchAsync");
const factory = require("./handleFactory");
const uri = require("../utility/DataParser");

exports.uploadPdf = catchAsync(async (req, res) => {
  if (req.body.Title && req.body.Category && req.body.SubCategory && req.file) {
    console.log("All value exist");
  } else {
    console.log("All value does not exist");
  }
  console.log(req.file);
  const fileUri = uri.getDataUri(req.file);
  const mycloud = await cloudinary.uploader.upload(fileUri.content);
  console.log(mycloud);
  const note = await notes.create({
    Title: req.body.Title,
    Category: req.body.Category,
    SubCategory: req.body.SubCategory,
    Pdf: {
      public_id: mycloud.public_id,
      secure_url: mycloud.secure_url,
      version: mycloud.version,
    },
    discription: req.body.discription,
    createdBy: req.body.createdBy,
  });
  res.status(200).json({
    status: "success",
    data: note,
  });
});

exports.FavouritePdf = catchAsync(async (req, res) => {
  try {
    const FavouriteList = req.body.list;
    const documents = await notes.find({ _id: { $in: FavouriteList } }); // Assuming YourModel is your Mongoose model
    res.status(200).json({
      status: "success",
      data: documents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

exports.GetNotesBytype = catchAsync(async (req, res) => {
  const requestedType = req.params.type;
  // Syntax to directly find by database
  //const cursor = db.collection('myCollection').find({ field: 'value' });
  const notesByType = await notes.find({ type: requestedType });
  res.status(400).json({
    status: "success",
    size: notesByType.length,
    data: notesByType,
  });
});

exports.getAllNotess = catchAsync(async (req, res) => {
  const note = await notes.find();
  res.status(200).json({
    status: "success",
    data: note,
  });
});

// exports.getAllNotess = factory.getAll(notes);
exports.getNotes = factory.getOne(notes);
exports.createNotes = factory.createOne(notes);
exports.updateNotes = factory.updateOne(notes);
exports.deleteNotes = factory.deleteOne(notes);
