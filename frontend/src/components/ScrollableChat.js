import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { useColorModeValue } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const myMsgBg = useColorModeValue("brand.100", "brand.600");
  const otherMsgBg = useColorModeValue("green.100", "green.600");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <div
              style={{
                background: m.sender._id === user._id ? myMsgBg : otherMsgBg,
                color: textColor,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: 18,
                padding: "6px 14px 8px 14px",
                maxWidth: "72%",
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                position: "relative",
                fontSize: "0.95rem",
                lineHeight: 1.3,
                transition: "background 0.2s ease"
              }}
            >
              <div>{m.content}</div>
              {m.createdAt && (
                <div
                  style={{
                    fontSize: "0.65rem",
                    opacity: 0.6,
                    marginTop: 2,
                    textAlign: "right",
                  }}
                >
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
