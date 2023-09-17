import { Container, Text } from "@chakra-ui/react";
import React from "react";
import ProjectCard from "../Components/ProjectCard";
import { IoLogoJavascript } from "react-icons/io";
import { SiHtml5, SiJavascript } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiNetlify } from 'react-icons/si'
import { SiChakraui } from 'react-icons/si'
import { SiReact } from 'react-icons/si'
// import yaatra from "../Components/Images/yaatra.jpeg";
// import beauty from '../Components/Images/beauty.jpeg'
// import shoping from '../Components/Images/shoping.jpeg'
// import glamour from '../Components/Images/glamour.jpeg'
// import lenskart from "../Components/Images/lenskart.jpg"
// import booking from "../Components/Images/booking.jpg"
// import nordStrom from "../Components/Images/nordStrom.jpg"

// //////Ankesh
import fitnessfirst from "../Components/Images/fitness first.png"
import glamour from "../Components/Images/glamour beauty.png"
import masaimall from "../Components/Images/Masai mall.png"
import Zara from "../Components/Images/Zara.png"


// src\Components\Images\fitness first.png
// src\Components\Images\glamour beauty.png
// src\Components\Images\Masai mall.png

// import lenskart from "../Components/Images/lenskart.jpeg"
import Github from "../Components/Github";
import GithubStreak from "../Components/GithubStreak";
import GithubStateCard from "../Components/GithubStateCard";
import GithubLanguage from "../Components/GithubLanguage";
const Projects = () => {
  return (
    <>
      <Container maxW={"4xl"}
       marginTop={50}
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
          PROJECTS
        </Text>
        <ProjectCard
          title="FITNESS FIRST"
          discription="It's a collaborative project, made by four people in a span of 5 working days. Fitness First is an online website that helps people to become fit and overcome their anxiety of loosing weights."
          jsIcon={SiReact}
          htmlIcon={SiChakraui}
          cssIcon={SiNetlify}
          githubUrl="https://github.com/RuchiAgrawal9186/FitnessFirst"
          netlifyUrl="https://fitness-first-g.netlify.app/"
          banner={fitnessfirst}
        />
        <ProjectCard 
          title="GLAMOUR BEAUTY"
          discription="It's a collaborative project, made by four people in a span of 5 working days.Want to look good in ordinary clothes here is the solution a website that helps over thousands of women to be confident.Glamour Beauty is an Indian e-commerce website. Where User can Shopping according their prefece."
          jsIcon={SiReact}
          htmlIcon={SiChakraui}
          cssIcon={SiNetlify}
          githubUrl="https://github.com/Omkanta/dusty-hat-6390/tree/main/dusty-hat-6390"
          netlifyUrl="https://glamour-pi.vercel.app/"
          banner={glamour}
        />
        <ProjectCard  
          title="MASAI MALL"
          discription=" Masai Mall is an Indian e-commerce company.Where User can Shopping according their prefece. Many big brands are here where are you!!"
          jsIcon={SiJavascript}
          htmlIcon={SiHtml5}
          cssIcon={SiCss3}
          githubUrl="https://github.com/ashishk2007/attractive-songs-1315"
          netlifyUrl="https://dreamy-semifreddo-625c90.netlify.app/"
          banner={masaimall}
        />
        <ProjectCard 
          title="ZARA"
          discription=" Zara Clone is an Indian e-commerce website. Where User can Shopping according their prefece. It is a popular E-commerce Website. thats help many people to wear their brands having a trust all over the world"
          jsIcon={SiJavascript}
          htmlIcon={SiHtml5}
          cssIcon={SiCss3}
          githubUrl="https://github.com/Anku9053/-defeated-fall-3461"
          netlifyUrl="https://resonant-puppy-aa5911.netlify.app/"
          banner={Zara}
        />
        <Github/>
        <GithubStreak/>
        <GithubStateCard/>
       </Container>
      <GithubLanguage/>
     </>
  );
};

export default Projects;