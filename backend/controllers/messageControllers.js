const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message (text and/or media)
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, mediaUrl, mediaType, fileName, fileSize } = req.body;

  if ((!content || content.trim() === "") && !mediaUrl) {
    console.log("Invalid data passed into request - no content or media");
    return res
      .status(400)
      .json({ message: "Message content or media is required" });
  }

  if (!chatId) {
    console.log("Invalid data passed into request - missing chatId");
    return res.status(400).json({ message: "chatId is required" });
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  if (mediaUrl) {
    newMessage.mediaUrl = mediaUrl;
    newMessage.mediaType = mediaType;
    newMessage.fileName = fileName;
    newMessage.fileSize = fileSize;
  }

  try {
    var message = await Message.create(newMessage);

    message = await Message.findById(message._id)
      .populate("sender", "name pic")
      .populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Summarize text using Gemini API
//@route           POST /api/message/summarize
//@access          Protected
const summarizeText = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res
      .status(400)
      .json({ message: "Text is required for summarization" });
  }

  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Please provide a clear and concise summary of the following text:\n\n${text}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.json({ summary });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500);
    throw new Error("Failed to summarize text. Please try again.");
  }
});

module.exports = { allMessages, sendMessage, summarizeText };
