import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import nstruLogo from "../../../assets/img/logo.png";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <img src={nstruLogo} style={{ height: '30px', marginBottom:'10px' }} alt="NSTRU Logo" />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
