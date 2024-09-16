const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary");
const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000",
  },
});

dotenv.config({ path: "./config.env" });
const app = require("./app");
const tnpModel = require("./model/tnpModel");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 5000;
const server = http.createServer(app);
// const io = new Server(server, () => {
//   console.log("finally connected");
// });

io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);
  socket.on("setup", (userId) => {
    console.log("Setup received:", userId);
    socket.join(userId);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("chat joined");
  });

  socket.on("new_messages", (newMessageStatus) => {
    var chat = newMessageStatus.chat;
    console.log("new messages", newMessageStatus);
    if (!chat.users) {
      return console.log("chat users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id === newMessageStatus.sender._id) {
        return;
      }
      socket.in(user._id).emit("message recieved", newMessageStatus);
    });
  });
});
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// io.on("connection", (socket) => {
// socket.on("setup", (user) => {
//   socket.join(user.data._id);
//   socket.emit("connected");
// });

// socket.on("join_chat", (room) => {
//   socket.join(room);
// });

// socket.on("new_messages", (newMessageStatus) => {
//   var chat = newMessageStatus.chat;
//   if (!chat.users) {
//     return console.log("chat users not defined");
//   }
//   chat.users.forEach((user) => {
//     if (user._id === newMessageStatus.sender._id) {
//       return;
//     }
//     socket.in(user._id).emit("message recieved", newMessageStatus);
//   });
// });
// });

// This function is executed when an unhandled rejection occurs that does not have .catch or .then
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  // Gracefully shut down the server
  server.close(() => {
    process.exit(1); // Exit the application with a non-zero status code
  });
});

// Import  data
const jsonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "tnp.json"), "utf-8")
);

const importData = async () => {
  try {
    await tnpModel.create(jsonData);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
};
// console.log(process.argv);
if (process.argv[2] === "--import") {
  importData();
}
