import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useColorModeValue } from "@chakra-ui/react";
import axios from "../../config/axios";
import { useState } from "react";
import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  // Dark theme colors
  const inputBg = useColorModeValue("white", "rgba(30, 30, 60, 0.8)");
  const inputBorder = useColorModeValue("gray.200", "rgba(100, 150, 255, 0.3)");
  const textColor = useColorModeValue("gray.800", "white");
  const labelColor = useColorModeValue("gray.700", "gray.300");

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setPicLoading(true);
      const data = new FormData();
      data.append("file", pics);

      fetch("/api/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Upload failed: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.url) {
            setPic(data.url);
            console.log("Upload successful:", data.url);
            toast({
              title: "Image uploaded successfully!",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "bottom",
            });
          }
          setPicLoading(false);
        })
        .catch((err) => {
          console.error("Upload error:", err);
          toast({
            title: "Image upload failed",
            description: err.message || "Please try again",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel color={labelColor}>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
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
      <FormControl id="email" isRequired>
        <FormLabel color={labelColor}>Email Address</FormLabel>
        <Input
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
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
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
      <FormControl id="password" isRequired>
        <FormLabel color={labelColor}>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
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
      <FormControl id="pic">
        <FormLabel color={labelColor}>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          bg={inputBg}
          borderColor={inputBorder}
          color={textColor}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
