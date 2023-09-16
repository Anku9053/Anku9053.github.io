import {
    useColorModeValue,
    Container,
    Text,
    Image
  } from '@chakra-ui/react';
  export default function GithubLanguage() {
    return (
      <div>

        <Container
          maxW={'4xl'}
          height={'300px'}
          bg={useColorModeValue('white', 'whiteAlpha.50')}
          boxShadow={'xl'}
          rounded={'lg'}
          marginTop={50}
          p={4}
          direction={'column'}
          transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
              border : '1px solid gray'
            }}
          >
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
           TOP LANGUAGES
          </Text><br />
          <Image id="github-top-langs" src='https://github-readme-stats.vercel.app/api/top-langs/?username=Anku9053' width={{sm:'110%',md:'110%',lg:'110%'}} margin={"auto"} alignItems={"center"} height={'160px'} marginTop={5}/>
        </Container>
      </div>
    );
  }