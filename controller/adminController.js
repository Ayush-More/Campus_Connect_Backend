const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary");
const Notes = require("../model/notesModel");
const StudentMentor = require("../model/mentorModel");
const User = require("../model/userModel");
const Event = require("../model/clubEvent");
const factory = require("./handleFactory");
const uri = require("../utility/DataParser");
// const cloudinary = require("../utility/cloudinary");

exports.AllNotes = async (req, res) => {
  try {
    const result = await Notes.find().populate("createdBy");
    if (!result) {
      throw new Error("There are no notes");
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch All notes",
      error: error.message,
    });
  }
};

exports.AddMentor = async (req, res) => {
  try {
    console.log(req.body);
    const result = await StudentMentor.create({
      users: req.body.users,
      programmingLanguages: req.body.programmingLanguages,
      role: req.body.role,
      intustryExperience: req.body.intustryExperience,
      ClubWithPosition: req.body.ClubWithPosition,
      CompanyName: req.body.CompanyName,
      Cgpa: req.body.Cgpa,
    });
    if (!result) {
      throw new Error("The mentor not added");
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (errors) {
    res.status(500).json({
      status: "error",
      message: "Error occured while creating the mentor",
      error: errors.message,
    });
  }
};

exports.AllMentor = async (req, res) => {
  try {
    const result = await StudentMentor.find().populate("users");
    if (!result) {
      throw new Error("There are no mentor");
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch All mentor",
      error: errors.message,
    });
  }
};

exports.AllUser = async (req, res) => {
  try {
    const result = await User.find();
    if (!result) {
      throw new Error("There are no users");
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch All users",
      error: errors.message,
    });
  }
};
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(
//       null,
//       "F:/Workspace/Personel project/chat app/Campus-Connect/campus_connect-frontend/public/assets"
//     );
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     const extname = path.extname(file.originalname);
//     const filename = file.fieldname + uniqueSuffix + extname;
//     cb(null, filename);
//   },
// });
// const upload = multer({ storage: storage });
// exports.getimage = upload.single("image");

exports.AddEvent = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const fileUri = uri.getDataUri(req.file);
  const mycloud = await cloudinary.uploader.upload(fileUri.content);
  console.log(mycloud);
  try {
    const result = await Event.create({
      tittle: req.body.tittle,
      venue: req.body.venue,
      date: new Date(req.body.date),
      time: req.body.time,
      Description: req.body.Description,
      queryContact: req.body.queryContact,
      Registrationlink: req.body.Registrationlink,
      type: req.body.type,
      mode: req.body.mode,
      image: {
        public_id: mycloud.public_id,
        secure_url: mycloud.secure_url,
        version: mycloud.version,
      },
      dressCode: req.body.dressCode,
      Department: req.body.Department,
    });
    if (!result) {
      throw new Error("The Event not added");
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (errors) {
    res.status(500).json({
      status: "error",
      message: "Error occured while adding the event",
      error: errors.message,
    });
  }
};

exports.AllEvent = async (req, res) => {
  try {
    const date = new Date(Date.now());
    const today = date.toLocaleDateString();
    console.log(today);
    await Event.deleteMany({
      date: { $lt: today },
    });
    const result = await Event.find();
    if (!result) {
      throw new Error("There are no event");
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch All Events",
      error: errors.message,
    });
  }
};

exports.deleteNotes = factory.deleteOne(Notes);
exports.deleteUser = factory.deleteOne(User);
exports.deleteEvent = factory.deleteOne(Event);
