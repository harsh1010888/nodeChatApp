import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "../config/axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, IconButton, useColorModeValue } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [unlockedChats, setUnlockedChats] = useState([]);

  const toast = useToast();

  // Dark theme colors - new dark blue theme
  const panelBg = useColorModeValue("white", "#0f172a"); // dark navy
  const borderColor = useColorModeValue("gray.200", "rgba(56, 189, 248, 0.2)"); // sky blue
  const chatListBg = useColorModeValue("#F8F8F8", "#020617"); // near-black
  const chatItemBg = useColorModeValue("#E8E8E8", "#1e293b"); // dark gray-blue
  const chatItemHover = useColorModeValue("#D0D0D0", "#334155"); // lighter slate
  const selectedBg = useColorModeValue("#38B2AC", "#38bdf8"); // sky blue
  const textColor = useColorModeValue("black", "#e2e8f0"); // light text

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleChatClick = async (chat) => {
    if (!chat.isGroupChat || !chat.isProtected) {
      setSelectedChat(chat);
      return;
    }

    if (unlockedChats.includes(chat._id)) {
      setSelectedChat(chat);
      return;
    }

    const password = window.prompt("Enter room password");
    if (!password) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/join-protected",
        { chatId: chat._id, password },
        config
      );

      setUnlockedChats([...unlockedChats, chat._id]);
      setChats(chats.map((c) => (c._id === data._id ? data : c)));
      setSelectedChat(data);
    } catch (error) {
      toast({
        title: "Access denied",
        description:
          error?.response?.data?.message ||
          "Incorrect room password. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDeleteChat = async (chat, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      chat.isGroupChat
        ? `Delete group "${chat.chatName}" for all members?`
        : "Delete this conversation?"
    );

    if (!confirmDelete) return;

    let password = undefined;
    if (chat.isGroupChat && chat.isProtected) {
      password = window.prompt("Enter room password to delete this chat");
      if (!password) return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: password ? { password } : undefined,
      };

      await axios.delete(`/api/chat/${chat._id}`, config);

      if (selectedChat && selectedChat._id === chat._id) {
        setSelectedChat(null);
      }

      setChats(chats.filter((c) => c._id !== chat._id));

      toast({
        title: "Chat deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error) {
      toast({
        title: "Failed to delete chat",
        description:
          error?.response?.data?.message ||
          "An error occurred while deleting the chat.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg={panelBg}
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="0 0 20px rgba(100, 150, 255, 0.1)"
      backdropFilter="blur(10px)"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color={textColor}
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            colorScheme="blue"
            variant="outline"
            borderColor="rgba(100, 150, 255, 0.5)"
            _hover={{ bg: "rgba(56, 189, 248, 0.2)" }} // sky blue hover
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg={chatListBg}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        borderWidth="1px"
        borderColor={borderColor}
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => handleChatClick(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? selectedBg : chatItemBg}
                color="white"
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                borderWidth="1px"
                borderColor={
                  selectedChat === chat
                    ? "rgba(100, 150, 255, 0.5)"
                    : "transparent"
                }
                _hover={{
                  bg: selectedChat === chat ? selectedBg : chatItemHover,
                }}
                transition="all 0.2s"
                d="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Text fontWeight="500">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs" color="gray.400">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
                <IconButton
                  aria-label="Delete chat"
                  icon={<DeleteIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={(e) => handleDeleteChat(chat, e)}
                  _hover={{ bg: "rgba(255, 0, 0, 0.2)" }}
                />
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
