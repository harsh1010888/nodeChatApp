import { Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  // Dark theme colors
  const panelBg = useColorModeValue("white", "rgba(20, 20, 40, 0.8)");
  const borderColor = useColorModeValue("gray.200", "rgba(100, 150, 255, 0.2)");

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg={panelBg}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="0 0 20px rgba(100, 150, 255, 0.1)"
      backdropFilter="blur(10px)"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
