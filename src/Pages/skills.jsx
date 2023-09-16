import React from "react";
import { Container, Text, Grid, GridItem, Icon } from "@chakra-ui/react";
import { IoLogoJavascript } from "react-icons/io";
import { SiHtml5 } from 'react-icons/si'
import { SiCss3 } from 'react-icons/si'
import { SiReact } from 'react-icons/si'
import { GrNode } from 'react-icons/gr'
import { SiMongodb } from 'react-icons/si'
import { BsGithub } from 'react-icons/bs'
import { SiNetlify } from 'react-icons/si'
import { SiChakraui } from 'react-icons/si'
import { BsBootstrap } from 'react-icons/bs'
const Skills = () => {
  return (
    <div id="skills">
      <Container maxW={"4xl"}>
        <Text
          as={"span"}
          fontSize={"4xl"}
          fontWeight={"bold"}
          position={"relative"}
          _after={{
            content: "''",
            width: "full",
            height: "30%",
            position: "absolute",
            bottom: 1,
            left: 0,
            bg: "white.400",
            zIndex: -1,
          }}
        >
          SKILLS
        </Text>
        <Grid className="skills-card" marginTop={10} templateColumns={{ sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(5,1fr)' }} gap={6}>
          <GridItem
            w="100%"
            h="100%"
            bg="#FFF8E1"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <IoLogoJavascript className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "#efd81d" }}
            />
            <Text fontWeight={"bold"} color={"#efd81d"} className="skills-card-name">
              JavaScript
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#FFCDD2"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <SiHtml5 className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "#dd4b25" }}
            />
            <Text fontWeight={"bold"} color={"#dd4b25"} className="skills-card-name">
              HTML
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#90CAF9"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <SiCss3 className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "#208fc7" }}
            />
            <Text fontWeight={"bold"} color={"#208fc7"} className="skills-card-name">
              CSS
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#B3E5FC"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <SiReact className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "#54bbd7" }}
            />
            <Text fontWeight={"bold"} color={"#54bbd7"} className="skills-card-name">
              React
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#81C784"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <GrNode className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "#3b5e35" }}
            />
            <Text fontWeight={"bold"} color={"#3b5e35"} className="skills-card-name">
              Nodejs
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#A5D6A7"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <SiMongodb className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "#05a74b" }}
            />
            <Text fontWeight={"bold"} color={"#05a74b"} className="skills-card-name">
              MongoDB
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#455A64"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <BsGithub className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "white" }}
            />
            <Text fontWeight={"bold"} color={"white"} className="skills-card-name">
              GitHub
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#B2DFDB"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <SiNetlify className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "#168e9e" }}
            />
            <Text fontWeight={"bold"} color={"#168e9e"} className="skills-card-name">
              Netlify
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#B2EBF2"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <SiChakraui className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "#389da1" }}
            />
            <Text fontWeight={"bold"} color={"#389da1"} className="skills-card-name">
              Chakra UI
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#BA68C8"
            padding={4}
            borderRadius={30}
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              border: '1px solid gray'
            }}
          >
            <BsBootstrap className="skills-card-img"
              style={{ fontSize: "30px", margin: "auto", color: "#770ff0" }}
            />
            <Text fontWeight={"bold"} color={"#770ff0"} className="skills-card-name">
              Bootstrap
            </Text>
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};

export default Skills;