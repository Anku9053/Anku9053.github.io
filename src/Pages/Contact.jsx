

import React, { useState } from 'react';
import './Contact.css';
import { Container, Text } from "@chakra-ui/react";
// import contact from "../Components/Images/contact.gif"
// import {IoCall} from 'react-icons/io5';
// import {HiOutlineMail} from 'react-icons/hi'
// import {BsLinkedin} from 'react-icons/bs';
// import {AiFillGithub} from 'react-icons/ai';
// import { Container, Text } from "@chakra-ui/react";
// import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { SiLinkedin } from "react-icons/si";
import { TfiEmail } from "react-icons/tfi";
import { Button, Center, Stack } from "@chakra-ui/react";
// import { SyncLoader } from 'react-spinners';
import emailjs from "@emailjs/browser";

import { useRef } from 'react';

function Contact() {
  const form = useRef();
  const [done, setDone] = useState(false)
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_h875qfw",
        "template_r5es1on",
        form.current,
        "7XCn0tMS1cX7Rf9dU"
      )
      .then(
        (result) => {
          setDone(true);
          console.log(e);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleLinkedin = () => {
    window.open(`https://www.linkedin.com/in/ankesh-kumar-591595257/`);
  };
  const handleGithub = () => {
    window.open(`https://github.com/Anku9053`);
  };
  return (

<div id="contact" style={{ height: "400px" }}>
      <Container maxW={"4xl"} marginTop={50}>
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
            // bg: "red.400",
            // fill:"yellow";
            zIndex: -1,
          }}
        >
          CONTACT
        </Text>
        <Center p={8}>
          <Stack spacing={8} align={"center"} maxW={"md"} w={"full"}>
            {/* Facebook */}
            <Button
              w={"full"}
              colorScheme={"facebook"}
              leftIcon={<SiLinkedin />}
              onClick={handleLinkedin}
            >
              <Center>
                <Text id="contact-linkedin">Connect with Linkedin</Text>
              </Center>
            </Button>

            {/* Google */}
            <Button
              w={"full"}
              variant={"outline"}
              leftIcon={<FaGithub />}
              onClick={handleGithub}
            >
              <Center>
                <Text id="contact-github">Connect with Github</Text>
              </Center>
            </Button>

            {/* LinkedIn */}
            <Button
              w={"full"}
              colorScheme={"messenger"}
              leftIcon={<TfiEmail />}
            >
              <Center>
                <Text id="contact-email">ankesh9053@gmail.com</Text>
              </Center>
            </Button>

            {/* Messenger */}
            <Button
              w={"full"}
              colorScheme={"messenger"}
              leftIcon={<FiPhoneCall />}
            >
              <Center>
                <Text id="contact-phone">+91 8287670719</Text>
              </Center>
            </Button>
          </Stack>
        </Center>
      </Container>
    </div>


    // <div id="contact">
    //  <Text
    //       as={"span"}
    //       fontSize={"4xl"}
    //       fontWeight={"bold"}
    //       position={"relative"}
    //       _after={{
    //         content: "''",
    //         width: "full",
    //         height: "30%",
    //         position: "absolute",
    //         bottom: 1,
    //         left: 0,
    //         bg: "white.400",
    //         zIndex: -1,
    //       }}
    //     >
    //       CONTACT
    //     </Text>
    // <div className='contact' >
   
      
      
    // <div className='c-left' style={{marginTop:"50px"}}>
    //     <img src={contact} alt="" />
    //     </div>



    //     <div className='c-right'>
    //     <p><IoCall style={{marginTop:'2px'}} /><a href='/' id="contact-phone">+91 8287670719</a></p>
    //       <p><HiOutlineMail style={{marginTop:'2px'}} /><a id="contact-email" href="mailto:ankesh9053@gmail.com" target='_blank'>ankesh9053@gmail.com</a></p>
    //       <p><BsLinkedin style={{marginTop:'2px'}} /><a href="https://www.linkedin.com/in/ankesh-kumar-591595257/" id="contact-linkedin" target='_blank'>https://www.linkedin.com/in/ankesh-kumar-591595257/</a></p>
    //       <p><AiFillGithub style={{marginTop:'2px'}} /><a id="contact-github" href="https://github.com/Anku9053" target='_blank'>https://github.com/Anku9053</a></p>
    //     </div>
    //   </div>






  )
}

export default Contact
