import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import SummaryModal from "./miscellaneous/SummaryModal";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedText, setSelectedText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const toast = useToast();

  // Show helpful tip about AI summarization on first load
  useEffect(() => {
    const hasSeenTip = localStorage.getItem("hasSeenSummaryTip");
    if (!hasSeenTip && messages && messages.length > 0) {
      setTimeout(() => {
        toast({
          title: "💡 Pro Tip!",
          description:
            "Hi! Use chat summary ✨ - hover over messages to get AI summaries. Don't read boring text!",
          status: "info",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
        localStorage.setItem("hasSeenSummaryTip", "true");
      }, 1500);
    }
  }, [messages, toast]);

  // Dark theme message colors - modern dark blue theme
  const myMsgBg = useColorModeValue("#DCF8C6", "#2563eb"); // blue for sent messages
  const otherMsgBg = useColorModeValue("#E8E8E8", "#1e293b"); // dark gray-blue for received
  const textColor = useColorModeValue("gray.800", "white"); // white text for dark mode
  const otherTextColor = useColorModeValue("gray.800", "#cbd5e1"); // light gray for received messages

  const handleSummarize = async (messageText) => {
    if (!messageText || messageText.trim() === "") {
      toast({
        title: "No text to summarize",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedText(messageText);
    setSummary("");
    setLoading(true);
    onOpen();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/message/summarize",
        { text: messageText },
        config
      );

      setSummary(data.summary);
      setLoading(false);
    } catch (error) {
      console.error("Summarization error:", error);
      toast({
        title: "Failed to summarize",
        description: error?.response?.data?.message || "Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <SummaryModal
        isOpen={isOpen}
        onClose={onClose}
        summary={summary}
        loading={loading}
        originalText={selectedText}
      />
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
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
                  color: m.sender._id === user._id ? textColor : otherTextColor,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: 18,
                  padding: "8px 16px 10px 16px",
                  paddingRight:
                    m.content && m.content.length > 30 ? "40px" : "16px",
                  maxWidth: "72%",
                  boxShadow:
                    m.sender._id === user._id
                      ? "0 2px 10px rgba(37, 99, 235, 0.3)" // blue shadow for sent
                      : "0 2px 10px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                  fontSize: "0.95rem",
                  lineHeight: 1.4,
                  border:
                    m.sender._id === user._id
                      ? "1px solid rgba(56, 189, 248, 0.3)" // sky blue border for sent
                      : "1px solid rgba(100, 116, 139, 0.2)", // subtle border for received
                }}
                onMouseEnter={() => setHoveredMessageId(m._id)}
                onMouseLeave={() => setHoveredMessageId(null)}
              >
                {m.mediaUrl && (
                  <div style={{ marginBottom: m.content ? 6 : 0 }}>
                    {m.mediaType && m.mediaType.startsWith("image") ? (
                      <img
                        src={m.mediaUrl}
                        alt={m.fileName || "attachment"}
                        style={{
                          maxWidth: "100%",
                          borderRadius: 12,
                          marginBottom: m.content ? 4 : 0,
                        }}
                      />
                    ) : (
                      <a
                        href={m.mediaUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "inherit",
                          textDecoration: "underline",
                          wordBreak: "break-all",
                        }}
                      >
                        {m.fileName || "Download attachment"}
                      </a>
                    )}
                  </div>
                )}
                {m.content && (
                  <div
                    style={{
                      paddingRight: m.content.length > 30 ? "4px" : "0",
                    }}
                  >
                    {m.content}
                  </div>
                )}
                {m.createdAt && (
                  <div
                    style={{
                      fontSize: "0.65rem",
                      opacity: 0.6,
                      marginTop: 4,
                      textAlign: "right",
                    }}
                  >
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
                {m.content &&
                  m.content.length > 30 &&
                  hoveredMessageId === m._id && (
                    <Tooltip
                      label="✨ AI Summary - Don't read boring text!"
                      placement="top"
                      hasArrow
                    >
                      <IconButton
                        icon={<span>✨</span>}
                        size="xs"
                        variant="solid"
                        colorScheme="purple"
                        onClick={() => handleSummarize(m.content)}
                        aria-label="Summarize with AI"
                        position="absolute"
                        top="4px"
                        right="4px"
                        opacity={0.95}
                        _hover={{ opacity: 1, transform: "scale(1.15)" }}
                        transition="all 0.2s"
                        zIndex={10}
                        boxShadow="0 2px 8px rgba(0, 0, 0, 0.3)"
                      />
                    </Tooltip>
                  )}
              </div>
            </div>
          ))}
      </ScrollableFeed>
    </>
  );
};

export default ScrollableChat;
