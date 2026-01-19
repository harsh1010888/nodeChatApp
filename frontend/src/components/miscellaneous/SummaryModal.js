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
  Box,
  useColorModeValue,
  Spinner,
  VStack,
} from "@chakra-ui/react";

const SummaryModal = ({ isOpen, onClose, summary, loading, originalText }) => {
  const modalBg = useColorModeValue("white", "rgba(20, 20, 40, 0.95)");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headerColor = useColorModeValue("blue.600", "blue.300");
  const boxBg = useColorModeValue("gray.50", "rgba(30, 30, 60, 0.8)");
  const borderColor = useColorModeValue("gray.200", "rgba(100, 150, 255, 0.3)");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg={modalBg} borderRadius="xl" boxShadow="2xl">
        <ModalHeader color={headerColor}>
          🤖 AI Summary (Powered by Gemini)
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {/* Original Message */}
            <Box>
              <Text fontSize="sm" fontWeight="bold" color={textColor} mb={2}>
                Original Message:
              </Text>
              <Box
                p={3}
                bg={boxBg}
                borderRadius="md"
                border="1px solid"
                borderColor={borderColor}
                maxH="150px"
                overflowY="auto"
              >
                <Text fontSize="sm" color={textColor} whiteSpace="pre-wrap">
                  {originalText}
                </Text>
              </Box>
            </Box>

            {/* Summary */}
            <Box>
              <Text fontSize="sm" fontWeight="bold" color={textColor} mb={2}>
                Summary:
              </Text>
              {loading ? (
                <Box textAlign="center" py={6}>
                  <Spinner size="lg" color="blue.500" thickness="3px" />
                  <Text mt={3} color={textColor}>
                    Generating summary...
                  </Text>
                </Box>
              ) : (
                <Box
                  p={4}
                  bg={boxBg}
                  borderRadius="md"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Text
                    fontSize="md"
                    color={textColor}
                    lineHeight="1.8"
                    whiteSpace="pre-wrap"
                  >
                    {summary || "No summary available."}
                  </Text>
                </Box>
              )}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SummaryModal;
