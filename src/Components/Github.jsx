import {
    useColorModeValue,
    Container,
    Text,
    Image
  } from '@chakra-ui/react';
  export default function Github() {
    return (
      <div className="react-activity-calendar">
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
            DAYS I CODE
          </Text><br />
          <Image src='https://ghchart.rshah.org/dharmikpuri' width={{sm:'100%',md:'100%',lg:'100%'}} height={'160px'} marginTop={5}/>
        </Container>
      </div>
    );
  }