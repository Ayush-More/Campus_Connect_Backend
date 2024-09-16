const expressAsyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.params);
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("chat");
    res.status(200).json({
      status: "success",
      messages,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = async (req, res) => {
  try {
    console.log(req.body);
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    let message = await Message.create(newMessage);
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    console.log(message);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });
    res.status(200).json({
      status: "success",
      data: message,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { allMessages, sendMessage };
