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
  Text,
} from "@chakra-ui/react";
import { MdOutlineCalendarToday } from "react-icons/md";
import ColumnTable from "./components/ColumnsTable";
import { ChevronDownIcon } from "@chakra-ui/icons";

const semesterResults = {
  "Semester 1": [
    { subject: "Fundamentals of Programming", marks: 81, grade: "O", credits: 4, gradePoints: 40},
    { subject: "Computational Mathematics 1", marks: 76, grade: "A+", credits: 4, gradePoints: 36},
    { subject: "Science of Living", marks: 71, grade: "A", credits: 2, gradePoints: 16},
    { subject: "Global Grand Challenges", marks: 92, grade: "A", credits: 4, gradePoints: 16},
    { subject: "Professional Communication", marks: 77, grade: "A+", credits: 3, gradePoints: 27},
    { subject: "Understanding India", marks: 68, grade: "A", credits: 3, gradePoints: 24},
    { subject: "Leadership Colloquium 1", marks: 71, grade: "A", credits: 1, gradePoints: 8},
    { subject: "Community Engagement", marks: 100, grade: "O", credits: 2, gradePoints: 20},
  ],
  "Semester 2": [
    { subject: "Data Structures and Algorithms", marks: 87, grade: "O", credits: 6, gradePoints: 60},
    { subject: "Web Programming", marks: 81, grade: "O", credits: 4, gradePoints: 40},
    { subject: "Software Engineering", marks: 80, grade: "A+", credits: 4, gradePoints: 36},
    { subject: "Indian Polity and Administration", marks: 87, grade: "O", credits: 2, gradePoints: 20},
    { subject: "Tech and Society", marks: 87, grade: "A+", credits: 2, gradePoints: 20},
    { subject: "Environment and System Thinking", marks: 78, grade: "A+", credits: 3, gradePoints: 27},
    { subject: "Leadership Colloquium 2", marks: 59, grade: "B", credits: 1, gradePoints: 6},
    { subject: "Community Engagement", marks: 63, grade: "B+", credits: 1, gradePoints: 7},
  ],
};

const Settings = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={4}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg="white"
        >
          <Text fontSize="lg" fontWeight="bold">SGPA</Text>
          <Text fontSize="xl">9.39</Text>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg="white"
        >
          <Text fontSize="lg" fontWeight="bold">CGPA</Text>
          <Text fontSize="xl">9.25</Text>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg="white"
        >
          <Text fontSize="lg" fontWeight="bold">Current Rank</Text>
          <Text fontSize="xl">3</Text>
        </Box>
      </SimpleGrid>

      {/* Filter Button */}
      <Menu>
        <MenuButton
          as={Button}
          bg="#412AFB"
          color="white"
          _hover={{ bg: "#341FB0" }}
          _active={{ bg: "#2E1B9A" }}
          mb="20px"
          leftIcon={<Icon as={MdOutlineCalendarToday} color='white' />}
          rightIcon={<ChevronDownIcon/>}
        >
          {selectedSemester}
        </MenuButton>
        <MenuList>
          {Object.keys(semesterResults).map((semester) => (
            <MenuItem key={semester} onClick={() => handleSemesterChange(semester)}>
              {semester}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Results Table */}
      <ColumnTable tableData={semesterResults[selectedSemester]} />
    </Box>
  );
};

export default Settings;
