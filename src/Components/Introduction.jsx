import React from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react';
import { Type } from '../Components/Type';
const Introduction = () => {
  return (
    <div>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 20 }}
      >
        <Heading
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          lineHeight={2}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: useBreakpointValue({ base: "20%", md: "30%" }),
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "black.400",
              zIndex: -1,
            }}
          >
            Hi, I am Ankesh Kumar
          </Text>
          <br />{" "}
          <Text color={"white.500"} as={"span"} fontSize={{ lg: "4xl" }}>
            <Type />
          </Text>{" "}
        </Heading>
        {/* <Text color={"gray.500"}> */}
          <Text  color={"gray.550"} fontSize={"23px"} fontWeight={"bold"}>
            A Full Stack Developer who loves solving problems and building
            projects. I am equipped with a variety of technologies and tools to
            help me build the best possible product.
          </Text>
        {/* </Text> */}
      </Stack>
    </div>
  );
};

export default Introduction;