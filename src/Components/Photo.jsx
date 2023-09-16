import React from "react";
import { Image } from "@chakra-ui/react";
// import porfile from '../Components/Images/ram_surat.png'
import profilePhoto from "../Components/Images/dharmikPhoto.png";
const Photo = () => {
  return (
    <div>
      <Image
        alt={"Hero Image"}
        fit={"cover"}
        align={"center"}
        w={{ md: "100%", lg: "100%" }}
        h={"100%"}
        src={profilePhoto}
        className="home-img"
        transform="scale(1.0)"
        transition="0.3s ease-in-out"
        _hover={{
          transform: "scale(1.05)",
        }}
      />
    </div>
  );
};

export default Photo;