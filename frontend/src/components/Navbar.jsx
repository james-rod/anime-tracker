import {
  Container,
  Flex,
  Text,
  Link,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode(); // This is coming from chakra UI

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400 , blue.500)"}
          bgClip="text"
        >
          <Link as={RouterLink} to="/">
            {" "}
            Anime Tracker
          </Link>
        </Text>
        <HStack spacing={2} align={"center"}>
          <Button as={RouterLink} to="/add">
            <PlusSquareIcon fontSize={20} />
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
        {/*Horizontal Line container */}
      </Flex>
    </Container>
  );
}

export default Navbar;
