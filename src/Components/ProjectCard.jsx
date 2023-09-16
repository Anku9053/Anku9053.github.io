import React from 'react'
import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    Box,
    Link,
    Icon
  } from "@chakra-ui/react";
const ProjectCard = ({title,discription,jsIcon,htmlIcon,cssIcon,githubUrl,netlifyUrl,banner}) => {
    const handleLive=()=>{
        window.open(netlifyUrl)
      }
      const handleCode=()=>{
        window.open(githubUrl)
      }
  return (
    <div id="projects">
        <Stack
          className="project-card"
          minH={"50vh"}
          direction={{ base: "column", md: "row" }}
          border={"1px solid gray"}
          borderRadius={20}
          marginTop={50}
          padding={2}
          transform="scale(1.0)"
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        >
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={6} w={"full"} maxW={"lg"}>
              <Heading
                fontSize={{ base: "3xl", md: "3xl", lg: "3xl" }}
                textAlign={{ sm: "justify", lg: "left" }}
              >
                <Text color={"blue.400"} as={"span"} className="project-title">
                  {title}
                </Text>{" "}
              </Heading>
              <Text
                className="project-description"
                fontSize={{ base: "md", lg: "lg" }}
                color={"gray.500"}
                textAlign={{ sm: "justify" }}
              >
                {discription}
              </Text>
              <div
                style={{ display: "flex", columnGap: "20px" }}
                className="project-tech-stack"
              >
                <Icon
                  as={jsIcon}
                  style={{
                    border: "1px solid gray",
                    fontSize: "35px",
                    padding: "4px",
                    borderRadius: "10px",
                  }}
                />
                <Icon
                 as={htmlIcon}
                  style={{
                    border: "1px solid gray",
                    fontSize: "35px",
                    padding: "4px",
                    borderRadius: "10px",
                  }}
                />
                <Icon
                 as={cssIcon}
                  style={{
                    border: "1px solid gray",
                    fontSize: "35px",
                    padding: "4px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <Stack direction={{ base: "column", md: "row" }} spacing={8}>
                <Button
                 className="project-deployed-link"
                 onClick={handleLive}
                 px={6}
                fontSize={"sm"}
                rounded={"full"}
                bgGradient="linear(to-r, pink.400, orange.400)"
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "pink.500",
                }}
                _focus={{
                  bg: "orange.500",
                }}>
                  See in Live
                </Button>
                <Button
                className="project-github-link"
                onClick={handleCode}
                px={6}
                fontSize={"sm"}
                rounded={"full"}
                bgGradient="linear(to-r, pink.400, orange.400)"
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "pink.500",
                }}
                _focus={{
                  bg: "orange.500",
                }}>
                View Code
              </Button>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Box borderRadius="xl" overflow="hidden" border={"1px solid gray"} height={{md:'280px',lg:'280px'}} marginTop={10}>
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  transform="scale(1.0)"
                  src={banner}
                  alt="some text"
                  objectFit="fit"
                  width={{md:'100%',lg:"100%"}}
                  height={"250px"}
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Link>
            </Box>
          </Flex>
        </Stack>
    </div>
  )
}

export default ProjectCard