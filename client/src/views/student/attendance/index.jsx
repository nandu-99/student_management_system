import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { MdOutlineSchool, MdOutlineCalendarToday } from 'react-icons/md';
import ColumnTable from './components/ColumnsTable';

// Mock data for attendance
const mockAttendance = {
  'Semester 1': [
    { subject: 'Math', attendance: '90%', total: '30', attended: '27' },
    { subject: 'English', attendance: '85%', total: '30', attended: '25' },
  ],
  'Semester 2': [
    { subject: 'Science', attendance: '92%', total: '25', attended: '23' },
    { subject: 'History', attendance: '88%', total: '25', attended: '22' },
  ],
};

const attendanceData = [
  { 
    subject: 'Mathematics', 
    totalClasses: 30, 
    attended: 27, 
    attendance: '90%', 
  },
  { 
    subject: 'Computer Science', 
    totalClasses: 25, 
    attended: 22, 
    attendance: '88%', 
  },
  { 
    subject: 'Physics', 
    totalClasses: 28, 
    attended: 24, 
    attendance: '86%', 
  },
  { 
    subject: 'Chemistry', 
    totalClasses: 30, 
    attended: 27, 
    attendance: '90%', 
  },
  { 
    subject: 'English Literature', 
    totalClasses: 20, 
    attended: 18, 
    attendance: '90%', 
  }
];

const Attendance = () => {
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const [selectedSemester, setSelectedSemester] = useState('Semester 1'); // default selected semester

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={4}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
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
          <Text fontSize="lg" fontWeight="bold">Total Attendance</Text>
          <Text fontSize="xl">88%</Text>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg="white"
        >
          <Text fontSize="lg" fontWeight="bold">Classes Attended</Text>
          <Text fontSize="xl">85/100</Text>
        </Box>
      </SimpleGrid>

      {/* Filter Button */}
      <Menu>
        <MenuButton
          as={Button}
          bg="#412AFB"
          color="white"
          _hover={{ bg: '#341FB0' }}
          _active={{ bg: '#2E1B9A' }}
          mb="20px"
          leftIcon={<Icon as={MdOutlineCalendarToday} color='white' />}
        >
          {selectedSemester}
        </MenuButton>
        <MenuList>
          {Object.keys(mockAttendance).map((semester) => (
            <MenuItem key={semester} onClick={() => handleSemesterChange(semester)}>
              {semester}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Attendance Table */}
      <ColumnTable tableData={attendanceData} />
    </Box>
  );
};

export default Attendance;
