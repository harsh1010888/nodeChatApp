const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const bcrypt = require("bcryptjs");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  const { password } = req.body;

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  // If no password is provided, treat as a public room
  // If a password is provided, treat as a private protected room
  const isPublic = !password;

  try {
    let passwordHash = undefined;

    if (isPublic) {
      // Default password for all public rooms (for potential admin operations)
      const defaultPassword = "8887419753";
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(defaultPassword, salt);
    } else {
      // Private room must have a password
      if (!password) {
        return res
          .status(400)
          .send("Password is required for private group chats");
      }
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
      isPublic,
      isProtected: !isPublic,
      passwordHash,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Join a password-protected Group Chat
// @route   POST /api/chat/join-protected
// @access  Protected
const joinProtectedChat = asyncHandler(async (req, res) => {
  const { chatId, password } = req.body;

  if (!chatId || !password) {
    return res
      .status(400)
      .json({ message: "Chat ID and password are required" });
  }

  const chat = await Chat.findById(chatId)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (
    !chat ||
    !chat.isGroupChat ||
    chat.isPublic ||
    !chat.isProtected ||
    !chat.passwordHash
  ) {
    return res.status(400).json({ message: "Invalid protected chat" });
  }

  const isMatch = await bcrypt.compare(password, chat.passwordHash);

  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect room password" });
  }

  // Optionally ensure the current user is part of the group
  const isMember = chat.users.some(
    (u) => u._id.toString() === req.user._id.toString()
  );

  if (!isMember) {
    chat.users.push(req.user._id);
    await chat.save();
    await chat.populate("users", "-password");
    await chat.populate("groupAdmin", "-password");
  }

  return res.json(chat);
});

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

// @desc    Delete a Chat (and its messages)
// @route   DELETE /api/chat/:chatId
// @access  Protected
const deleteChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { password } = req.body || {};

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Chat Not Found");
  }

  // Only allow groupAdmin to delete group chats; for 1-1 chats, allow any participant
  const isParticipant = chat.users.some(
    (u) => u.toString() === req.user._id.toString()
  );

  if (!isParticipant) {
    res.status(403);
    throw new Error("You are not a member of this chat");
  }

  if (chat.isGroupChat) {
    const isPublic =
      typeof chat.isPublic === "boolean" ? chat.isPublic : !chat.isProtected;

    // Public rooms cannot be deleted at all
    if (isPublic) {
      res.status(403);
      throw new Error("Public chats cannot be deleted");
    }

    const isAdmin =
      chat.groupAdmin && chat.groupAdmin.toString() === req.user._id.toString();

    if (!isAdmin) {
      res.status(403);
      throw new Error("Only group admin can delete this chat");
    }

    // For password-protected group chats, require the room password to delete
    if (chat.isProtected && chat.passwordHash) {
      if (!password) {
        res.status(400);
        throw new Error("Room password is required to delete this chat");
      }

      const isMatch = await bcrypt.compare(password, chat.passwordHash);

      if (!isMatch) {
        res.status(401);
        throw new Error("Incorrect room password");
      }
    }
  }

  await Message.deleteMany({ chat: chat._id });
  await Chat.deleteOne({ _id: chat._id });

  res.json({ message: "Chat deleted successfully", chatId });
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  joinProtectedChat,
  deleteChat,
};
