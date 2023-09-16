import Introduction from '../Components/Introduction';
import { Container } from '@chakra-ui/react';
export default function Home() {
  return (
    <div id='home'>
      <Container maxW={'4xl'} >
        <Introduction />
      </Container>
    </div>
  );
}