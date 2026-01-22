import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "../../config/axios";
import { useToast, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import AboutModal from "../miscellaneous/AboutModal";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();
  const { setUser } = ChatState();

  // Dark theme colors
  const inputBg = useColorModeValue("white", "rgba(30, 30, 60, 0.8)");
  const inputBorder = useColorModeValue("gray.200", "rgba(100, 150, 255, 0.3)");
  const textColor = useColorModeValue("gray.800", "white");
  const labelColor = useColorModeValue("gray.700", "gray.300");

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config,
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <Button
        variant="outline"
        colorScheme="purple"
        width="100%"
        size="sm"
        onClick={onOpen}
        mb={2}
      >
        ℹ️ About This App
      </Button>

      <AboutModal isOpen={isOpen} onClose={onClose} />

      <FormControl id="email" isRequired>
        <FormLabel color={labelColor}>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          bg={inputBg}
          borderColor={inputBorder}
          color={textColor}
          _placeholder={{ color: "gray.500" }}
          _hover={{ borderColor: "rgba(100, 150, 255, 0.5)" }}
          _focus={{
            borderColor: "rgba(100, 150, 255, 0.8)",
            boxShadow: "0 0 0 1px rgba(100, 150, 255, 0.5)",
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color={labelColor}>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            bg={inputBg}
            borderColor={inputBorder}
            color={textColor}
            _placeholder={{ color: "gray.500" }}
            _hover={{ borderColor: "rgba(100, 150, 255, 0.5)" }}
            _focus={{
              borderColor: "rgba(100, 150, 255, 0.8)",
              boxShadow: "0 0 0 1px rgba(100, 150, 255, 0.5)",
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="teal"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
