// Chakra imports
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Custom icons
import React from "react";

export default function MiniStatistics(props) {
  const { startContent, endContent, name, growth, value, isSelected, onClick } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const whiteColor = useColorModeValue("white", "white");
  const selectedBgColor = useColorModeValue("#412AFB", "#412AFB");


  return (
    <Card
      py='15px'
      bg={isSelected ? selectedBgColor : "white"} 
      onClick={onClick}
      cursor='pointer'
    >
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {startContent}

        <Stat my='auto' ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight='100%'
            color={isSelected?whiteColor:textColorSecondary}
            fontSize={{
              base: "sm",
            }}>
            {name}
          </StatLabel>
          <StatNumber
            color={isSelected?whiteColor:textColor}
            fontSize={{
              base: "2xl",
            }}>
            {value}
          </StatNumber>
          {growth ? (
            <Flex align='center'>
              <Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
                {growth}
              </Text>
              <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                since last month
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms='auto' w='max-content'>
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}

