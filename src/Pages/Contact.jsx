

import React, { useState } from 'react';
import './Contact.css';
import { Container, Text } from "@chakra-ui/react";

import {IoCall} from 'react-icons/io5';
import {HiOutlineMail} from 'react-icons/hi'
import {BsLinkedin} from 'react-icons/bs';
import {AiFillGithub} from 'react-icons/ai';
import { SyncLoader } from 'react-spinners';
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
  return (




    <div id="contact">
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
          CONTACT
        </Text>
    <div className='contact' >
   
      
      
    <div className='c-left' style={{marginTop:"50px"}}>
        <img src="https://camo.githubusercontent.com/a4c584bce1c41271485d28f92aaf9f581b3c88b68ca723b6edfd58b4ba988c2b/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f313138373833362f73637265656e73686f74732f363533393432392f70726f6772616d65722e676966" alt="" />
        </div>



        <div className='c-right'>
        <p><IoCall style={{marginTop:'2px'}} /><a href='/' id="contact-phone">+91 8287670719</a></p>
          <p><HiOutlineMail style={{marginTop:'2px'}} /><a id="contact-email" href="mailto:ankesh9053@gmail.com" target='_blank'>ankesh9053@gmail.com</a></p>
          <p><BsLinkedin style={{marginTop:'2px'}} /><a href="https://www.linkedin.com/in/ankesh-kumar-591595257/" id="contact-linkedin" target='_blank'>https://www.linkedin.com/in/ankesh-kumar-591595257/</a></p>
          <p><AiFillGithub style={{marginTop:'2px'}} /><a id="contact-github" href="https://github.com/Anku9053" target='_blank'>https://github.com/Anku9053</a></p>
        </div>
      </div>






      <div className="c-form" style={{marginTop:"50px"}}>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="user_name" className="user"  placeholder="Name"/>
          <input type="email" name="user_email" className="user" placeholder="Email"/>
          <textarea name="message" className="user" placeholder="Message"/>
          <input type="submit" value="Mail Me" className="button"/>
          <span>{done && "Thanks for Contacting me I will reach to You as soon as possible"}</span>
        </form>
      </div>
      <br />
      <div style={{display:"flex",justifyContent:"center"}}><SyncLoader /></div>
      <h1 className='c-title' style={{marginBottom:'0px'}}>Thank you</h1>
      {/* <p className='footer-part'>Design and Developed by Akash Kumawat</p> */}
   
    
  </div>
  )
}

export default Contact
