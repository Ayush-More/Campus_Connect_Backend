const tnpModel = require("../model/tnpModel");
const catchAsync = require("../utility/catchAsync");
const factory = require("./handleFactory");

exports.internship = catchAsync(async (req, res) => {
  function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
  }

  const now = new Date();
  const formattedDate = formatDateToDDMMYYYY(now);
  console.log(formattedDate); // Output: "21-09-2023"
  const expired = await tnpModel.deleteMany({
    deadline: { $lt: formattedDate },
  });
  const Available = await tnpModel.find({
    deadline: { $gte: formattedDate },
  });
  console.log(`${expired.deletedCount} expired documents deleted`);
  console.log("The expired data is deleted");
  res.status(200).json({
    status: "success",
    data: Available,
  });
});

exports.addInternship = catchAsync(async (req, res) => {
  const addedData = await tnpModel.create(req.body);
  console.log("The data is inserted ");
  res.status(400).json({
    status: "success",
    dataAdded: addedData,
  });
});

exports.getAllInters = factory.getAll(tnpModel);
exports.gettnpModel = factory.getOne(tnpModel);
exports.createtnpModel = factory.createOne(tnpModel);
exports.updatetnpModel = factory.updateOne(tnpModel);
exports.deletetnpModel = factory.deleteOne(tnpModel);
