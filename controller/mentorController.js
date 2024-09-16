const User = require("../model/userModel");
const Chat = require("../model/chatModel");

const availableUser = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    const finalUser = [];

    for (const user of users) {
      const chat = await Chat.findOne({
        isGroupChat: false,
        users: { $all: [req.user._id, user._id] },
      });

      if (!chat) {
        finalUser.push(user);
      }
    }

    res.status(200).json({
      status: "success",
      user: finalUser, // Use 'user' for consistency
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  availableUser,
};
