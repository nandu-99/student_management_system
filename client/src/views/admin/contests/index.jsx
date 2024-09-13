import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import ColumnTable from "./components/ColumnsTable";
import {
  MdInsertChart,
  MdHistory,
  MdOutlineAssessment,
  MdOutlineEvent,
  MdEventAvailable,
} from "react-icons/md";

const Contests = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const selectedBgColor = useColorModeValue("#412AFB", "#412AFB");
  const [selectedStat, setSelectedStat] = useState('Upcoming Contests'); // default selected 
  const [selectedSubject, setSelectedSubject] = useState('All Subjects'); // default selected subject

  const handleSelect = (name) => {
    setSelectedStat(name);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const tableData = [
    { 
      name: 'Code Jam', 
      progress: '75%', 
      quantity: 'Round 2', 
      date: '2024-09-05' 
    },
    { 
      name: 'Hackathon 2024', 
      progress: '40%', 
      quantity: 'Phase 1', 
      date: '2024-09-10' 
    },
    { 
      name: 'AI Challenge', 
      progress: '20%', 
      quantity: 'Qualifier', 
      date: '2024-09-15' 
    },
  ];  

  return (
    // <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    //   {/* Filter Button */}
    //   <Menu>
    //   <MenuButton
    //       as={Button}
    //       bg="#412AFB"
    //       color="white"
    //       _hover={{ bg: "#341FB0" }} 
    //       _active={{ bg: "#2E1B9A" }} 
    //       mb="20px"
    //     >
    //       {selectedSubject}
    //     </MenuButton>
    //     <MenuList>
    //       <MenuItem onClick={() => handleSubjectChange('ADA')}>ADA</MenuItem>
    //       <MenuItem onClick={() => handleSubjectChange('DBMS')}>DBMS</MenuItem>
    //       <MenuItem onClick={() => handleSubjectChange('AP')}>AP</MenuItem>
    //       <MenuItem onClick={() => handleSubjectChange('Placement')}>Placement</MenuItem>
    //     </MenuList>
    //   </Menu>

    //   {/* Statistics */}
    //   <SimpleGrid
    //     columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
    //     gap="20px"
    //     mb="20px">
    //     {/* Previous Contests */}
    //     <MiniStatistics
    //       startContent={
    //         <IconBox
    //           w="56px"
    //           h="56px"
    //           bg={boxBg}
    //           icon={
    //             <Icon w="32px" h="32px" as={MdOutlineAssessment} color={brandColor} />
    //           }
    //         />
    //       }
    //       name="Previous Contests"
    //       isSelected={selectedStat === 'Previous Contests'}
    //       onClick={() => handleSelect('Previous Contests')}
    //     />
    //     {/* Upcoming Contests */}
    //     <MiniStatistics
    //       startContent={
    //         <IconBox
    //           w="56px"
    //           h="56px"
    //           bg={boxBg}
    //           icon={
    //             <Icon w="32px" h="32px" as={MdOutlineEvent} color={brandColor} />
    //           }
    //         />
    //       }
    //       name="Upcoming Contests"
    //       isSelected={selectedStat === 'Upcoming Contests'}
    //       onClick={() => handleSelect('Upcoming Contests')}
    //     />
    //   </SimpleGrid>
    //   <ColumnTable tableData={tableData} />
    // </Box>
    <></>
  );
};

export default Contests;
