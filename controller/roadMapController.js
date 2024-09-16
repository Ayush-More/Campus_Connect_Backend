// const notes = require("../model/notesModel");
// const catchAsync = require("../utility/catchAsync");
// const factory = require("./handleFactory");

// exports.GetNotesBytype = catchAsync(async (req, res) => {
//   const requestedType = req.params.type;
//   // Syntax to directly find by database
//   //const cursor = db.collection('myCollection').find({ field: 'value' });
//   const notesByType = await notes.find({ type: requestedType });
//   res.status(400).json({
//     status: "success",
//     size: notesByType.length,
//     data: notesByType,
//   });
// });
