const express = require("express");
const {
  fetchAvailableMentors,
  AccessChat,
  CreateOneToOneChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
  addSelfToTheGroup,
  fetchAllUser,
} = require("../controller/chatController");
const { protect } = require("../controller/authController");

const router = express.Router();

router.post("/", protect, CreateOneToOneChat);
router.get("/chatsdetail/:chat_id", protect, AccessChat);
router.get("/", protect, fetchChats);
router.post("/createGroup", protect, createGroupChat);
router.get("/fetchGroups", protect, fetchGroups);
router.put("/groupExit", protect, groupExit);
router.get("/fetchUsers", protect, fetchAvailableMentors);
router.post("/addSelf", protect, addSelfToTheGroup);
router.get("/alluser", protect, fetchAllUser);
module.exports = router;
