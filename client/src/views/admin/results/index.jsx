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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";
import { MdOutlineSchool, MdOutlineCalendarToday } from "react-icons/md";
import ColumnTable from "./components/ColumnsTable";

const mockResults = {
  "Semester 1": [
    { subject: "Math", grade: "A", credits: 3 },
    { subject: "English", grade: "B", credits: 3 },
  ],
  "Semester 2": [
    { subject: "Science", grade: "A", credits: 4 },
    { subject: "History", grade: "B", credits: 3 },
  ],
};

const semesterResults = [
  { 
    subject: 'Mathematics', 
    marks: 92,  // Example marks value
    grade: 'A', 
    credits: 4, 
    semester: 'Fall 2024' 
  },
  { 
    subject: 'Computer Science', 
    marks: 85,  // Example marks value
    grade: 'B+', 
    credits: 3, 
    semester: 'Fall 2024' 
  },
  { 
    subject: 'Physics', 
    marks: 88,  // Example marks value
    grade: 'A-', 
    credits: 4, 
    semester: 'Fall 2024' 
  },
  { 
    subject: 'Chemistry', 
    marks: 79,  // Example marks value
    grade: 'B', 
    credits: 3, 
    semester: 'Fall 2024' 
  },
  { 
    subject: 'English Literature', 
    marks: 90,  // Example marks value
    grade: 'A', 
    credits: 2, 
    semester: 'Fall 2024' 
  }
];



const Settings = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [selectedSemester, setSelectedSemester] = useState("Semester 1"); // default selected semester

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  return (
    // <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={4}>
    //   <SimpleGrid
    //     columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
    //     gap="20px"
    //     mb="20px"
    //   >
    //     <Box
    //       p={5}
    //       shadow="md"
    //       borderWidth="1px"
    //       borderRadius="md"
    //       bg="white"
    //     >
    //       <Text fontSize="lg" fontWeight="bold">SGPA</Text>
    //       <Text fontSize="xl">8.5</Text>
    //     </Box>
    //     <Box
    //       p={5}
    //       shadow="md"
    //       borderWidth="1px"
    //       borderRadius="md"
    //       bg="white"
    //     >
    //       <Text fontSize="lg" fontWeight="bold">CGPA</Text>
    //       <Text fontSize="xl">8.2</Text>
    //     </Box>
    //     <Box
    //       p={5}
    //       shadow="md"
    //       borderWidth="1px"
    //       borderRadius="md"
    //       bg="white"
    //     >
    //       <Text fontSize="lg" fontWeight="bold">Current Rank</Text>
    //       <Text fontSize="xl">5</Text>
    //     </Box>
    //   </SimpleGrid>

    //         {/* Filter Button */}
    //         <Menu>
    //     <MenuButton
    //       as={Button}
    //       bg="#412AFB"
    //       color="white"
    //       _hover={{ bg: "#341FB0" }}
    //       _active={{ bg: "#2E1B9A" }}
    //       mb="20px"
    //       leftIcon={<Icon as={MdOutlineCalendarToday} color='white' />}
    //     >
    //       {selectedSemester}
    //     </MenuButton>
    //     <MenuList>
    //       {Object.keys(mockResults).map((semester) => (
    //         <MenuItem key={semester} onClick={() => handleSemesterChange(semester)}>
    //           {semester}
    //         </MenuItem>
    //       ))}
    //     </MenuList>
    //   </Menu>

    //   {/* Results Table */}
    //   <ColumnTable tableData={semesterResults} />
    // </Box>
    <></>
  );
};

export default Settings;
