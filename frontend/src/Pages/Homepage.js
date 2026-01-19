import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  // Dark theme colors
  const boxBg = useColorModeValue("white", "rgba(20, 20, 40, 0.9)");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "rgba(100, 150, 255, 0.3)");
  const tabSelectedBg = useColorModeValue(
    "blue.500",
    "rgba(100, 150, 255, 0.4)"
  );
  const tabColor = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={boxBg}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="0 0 20px rgba(100, 150, 255, 0.1)"
        backdropFilter="blur(10px)"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color={textColor}>
          Node Chat
        </Text>
      </Box>
      <Box
        bg={boxBg}
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="0 0 20px rgba(100, 150, 255, 0.1)"
        backdropFilter="blur(10px)"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab
              color={tabColor}
              _selected={{ color: "white", bg: tabSelectedBg }}
            >
              Login
            </Tab>
            <Tab
              color={tabColor}
              _selected={{ color: "white", bg: tabSelectedBg }}
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
