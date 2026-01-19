import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text, HStack } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const { toggleColorMode, colorMode } = useColorMode();
  const headerBg = useColorModeValue("white", "#0f172a"); // dark navy
  const borderColor = useColorModeValue("gray.200", "rgba(56, 189, 248, 0.2)"); // sky blue
  const textColor = useColorModeValue("black", "#e2e8f0"); // light text
  const buttonBg = useColorModeValue("gray.100", "#1e293b"); // dark gray-blue

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg={headerBg}
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="1px"
        borderColor={borderColor}
        backdropFilter="blur(10px)"
        position="sticky"
        top={0}
        zIndex={5}
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            color={textColor}
            bg={buttonBg}
            _hover={{ bg: "rgba(100, 150, 255, 0.2)" }}
            borderWidth="1px"
            borderColor={borderColor}
          >
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <HStack spacing={3}>
          <Text
            fontSize="2xl"
            fontFamily="Work sans"
            fontWeight="600"
            color={textColor}
          >
            Node Chat
          </Text>
          <IconButton
            aria-label="Toggle color mode"
            size="sm"
            variant="ghost"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            color={textColor}
          />
        </HStack>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} color={textColor} />
            </MenuButton>
            <MenuList bg={headerBg} borderColor={borderColor}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                  _hover={{ bg: "rgba(56, 189, 248, 0.15)" }} // sky blue hover
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg={buttonBg}
              rightIcon={<ChevronDownIcon color={textColor} />}
              borderColor={borderColor}
              borderWidth="1px"
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList bg={headerBg} borderColor={borderColor}>
              <ProfileModal user={user}>
                <MenuItem _hover={{ bg: "rgba(56, 189, 248, 0.15)" }}>
                  My Profile
                </MenuItem>
              </ProfileModal>
              <MenuDivider borderColor={borderColor} />
              <MenuItem
                onClick={logoutHandler}
                _hover={{ bg: "rgba(100, 150, 255, 0.2)" }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay bg="rgba(0, 0, 0, 0.6)" />
        <DrawerContent
          bg={headerBg}
          borderRightColor={borderColor}
          borderRightWidth="1px"
        >
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor={borderColor}
            color={textColor}
          >
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                bg={buttonBg}
                borderColor={borderColor}
                color={textColor}
                _placeholder={{ color: "gray.500" }}
              />
              <Button
                onClick={handleSearch}
                colorScheme="blue"
                bg="#38bdf8" // sky blue
                _hover={{ bg: "#2563eb" }} // main blue hover
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
