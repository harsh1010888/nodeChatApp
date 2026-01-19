import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Heading,
  useColorModeValue,
  Divider,
  Box,
} from "@chakra-ui/react";

const AboutModal = ({ isOpen, onClose }) => {
  const modalBg = useColorModeValue("white", "rgba(20, 20, 40, 0.95)");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("blue.600", "blue.300");
  const accentColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg={modalBg} borderRadius="xl" boxShadow="2xl">
        <ModalHeader>
          <Heading size="lg" color={headingColor}>
            About NodeChat
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={accentColor} mb={2}>
                Hi, Harsh Omar here! 👋
              </Text>
              <Text fontSize="md" color={textColor} lineHeight="1.8">
                I created this chat application with a pure focus on modern web
                technologies and real-time communication. This project showcases
                the power of full-stack JavaScript development.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color={accentColor}
                mb={2}
              >
                🛠️ Tech Stack:
              </Text>
              <VStack align="start" spacing={1} pl={4}>
                <Text color={textColor}>
                  • <strong>Socket.io</strong> - Real-time bidirectional
                  communication
                </Text>
                <Text color={textColor}>
                  • <strong>React</strong> - Dynamic and responsive user
                  interface
                </Text>
                <Text color={textColor}>
                  • <strong>Node.js & Express</strong> - Powerful backend
                  framework
                </Text>
                <Text color={textColor}>
                  • <strong>MongoDB</strong> - Flexible NoSQL database
                </Text>
                <Text color={textColor}>
                  • <strong>Multer</strong> - File upload system
                </Text>
              </VStack>
            </Box>

            <Divider />

            <Box>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color={accentColor}
                mb={2}
              >
                🔐 Security Features:
              </Text>
              <VStack align="start" spacing={1} pl={4}>
                <Text color={textColor}>
                  • <strong>bcrypt</strong> - Password hashing and encryption
                </Text>
                <Text color={textColor}>
                  • <strong>JWT (JSON Web Tokens)</strong> - Secure
                  authentication
                </Text>
                <Text color={textColor}>• Password-protected group chats</Text>
              </VStack>
            </Box>

            <Divider />

            <Text
              fontSize="md"
              color={textColor}
              fontStyle="italic"
              textAlign="center"
              width="100%"
              mt={2}
            >
              Hope you enjoy using this app! 🚀
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Got it!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
