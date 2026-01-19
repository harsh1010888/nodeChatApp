import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  const itemBg = useColorModeValue("#E8E8E8", "#1e293b"); // dark gray-blue
  const hoverBg = useColorModeValue("#38B2AC", "#38bdf8"); // sky blue
  const textColor = useColorModeValue("black", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg={itemBg}
      _hover={{
        background: hoverBg,
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color={textColor}
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="rgba(100, 150, 255, 0.2)"
      transition="all 0.2s"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs" color={subTextColor}>
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
