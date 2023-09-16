import {
    useColorModeValue,
    Container,
    Text,
    Image
  } from '@chakra-ui/react';
  import stats from "../Components/Images/github stats.png"
  export default function GithubStateCard() {
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
           GITHUB STATS CARD
          </Text><br />
          <Image id="github-stats-card" src="https://github-readme-stats.vercel.app/api?username=Anku9053" justifyContent={'center'} width={{sm:'50%',md:'50%',lg:'50%'}} height={'160px'} margin={"auto"} marginTop={5}/>
        </Container>
      </div>
    );
  }