const mongoose = require("mongoose");
const academic = require("../model/acedemicEvent");
const club = require("../model/clubEvent");
const personel = require("../model/personelEvent");
const catchAsync = require("../utility/catchAsync");

exports.monthEvent = catchAsync(async (req, res) => {
  const SelectedMonth = req.params.month;
  const SelectedYear = req.params.year;

  const clubEvents = await club.find({
    $expr: {
      $and: [
        { $eq: [{ $month: "$date" }, SelectedMonth] },
        { $eq: [{ $year: "$date" }, SelectedYear] },
      ],
    },
  });

  const personelEvents = await personel.find({
    $and: [
      {
        $expr: {
          $and: [
            { $eq: [{ $month: "$date" }, SelectedMonth] },
            { $eq: [{ $year: "$date" }, SelectedYear] },
          ],
        },
      },
      { createdBy: new mongoose.Types.ObjectId(req.user._id) },
    ],
  });
  res.status(200).json({
    status: "Success",
    ClubEventLength: clubEvents.length,
    PersonelEventLength: personelEvents.length,
    data: {
      PersonelEvents: personelEvents,
      ClubEvents: clubEvents,
    },
  });
});

exports.AllEvents = catchAsync(async (req, res) => {
  const allClub = await club.find();
  const allPersonel = await personel.find({
    createdBy: { $eq: new mongoose.Types.ObjectId(req.user._id) },
  });

  res.status(200).json({
    status: "Success",
    data: {
      ClubEvents: allClub,
      Personel: allPersonel,
    },
  });
});

exports.dayEvent = catchAsync(async (req, res) => {
  const SelectedMonth = req.params.month;
  const SelectedYear = req.params.year;
  const SelectedDay = req.params.day;
  const SelectedDate = `${SelectedDay}-${SelectedMonth}-${SelectedYear}`;

  const allClubEvents = await club.find();
  const allAcademicEvents = await academic.find();

  const clubEvents = allClubEvents.filter(
    (event) => event.date === SelectedDate
  );
  const academicEvents = allAcademicEvents.filter(
    (event) => event.date === SelectedDate
  );

  res.status(200).json({
    status: "Success",
    ClubEventLength: clubEvents.length,
    AcademicEventLength: academicEvents.length,
    data: {
      AcademicEvents: academicEvents,
      ClubEvents: clubEvents,
    },
  });
});

exports.createPersonelEvent = catchAsync(async (req, res) => {
  console.log(req.body);
  const { Title, time, date, conferenceLink, discription } = req.body;
  const newEvent = await personel.create({
    Title: Title,
    time: time,
    date: new Date(date),
    conferenceLink: conferenceLink,
    discription: discription,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });
  if (!newEvent) {
    return res.status(400).json({
      status: "Error",
      message: "Failed to create the event.",
    });
  }

  res.status(201).json({
    status: "Success",
    data: {
      event: newEvent,
    },
  });
});

exports.createClubEvent = catchAsync(async (req, res, next) => {
  const newEvent = await club.create(req.body);

  if (!newEvent) {
    return res.status(400).json({
      status: "Error",
      message: "Failed to create the event.",
    });
  }

  res.status(201).json({
    status: "Success",
    data: {
      event: newEvent,
    },
  });
});
