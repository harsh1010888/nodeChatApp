const express = require("express");
const {
  allMessages,
  sendMessage,
  summarizeText,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);
router.route("/summarize").post(protect, summarizeText);

module.exports = router;
