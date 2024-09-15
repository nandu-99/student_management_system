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
  Text,
} from '@chakra-ui/react';
import { MdOutlineCalendarToday } from 'react-icons/md';
import ColumnTable from './components/ColumnsTable';
import { ChevronDownIcon } from '@chakra-ui/icons';

// Mock data for attendance
const mockAttendance = {
  'Semester 1': {
    totalAttendance: '96.25%',
    classesAttended: '231/240',
    subjects: [
      { subject: 'Fundamentals of Programming', attendance: '93.3%', total: '30', attended: '28' },
      { subject: 'Computational Mathematics 1', attendance: '90%', total: '30', attended: '27' },
      { subject: 'Science of Living', attendance: '100%', total: '30', attended: '30' },
      { subject: 'Global Grand Challenges', attendance: '100%', total: '30', attended: '30' },
      { subject: 'Professional Communication', attendance: '90%', total: '30', attended: '27' },
      { subject: 'Understanding India', attendance: '96.6%', total: '30', attended: '29' },
      { subject: 'Leadership Colloquium 1', attendance: '100%', total: '30', attended: '30' },
      { subject: 'Community Engagement', attendance: '100%', total: '30', attended: '30' },
    ],
  },
  'Semester 2': {
    totalAttendance: '95.40%',
    classesAttended: '229/240',
    subjects: [
      { subject: 'Indian Polity and Administration', attendance: '93.3%', total: '30', attended: '28' },
      { subject: 'Tech and Society', attendance: '96.6%', total: '30', attended: '29' },
      { subject: 'Environment and System Thinking', attendance: '100%', total: '30', attended: '30' },
      { subject: 'Leadership Colloquium 2', attendance: '90%', total: '30', attended: '27' },
      { subject: 'Community Engagement', attendance: '93.3%', total: '30', attended: '28' },
      { subject: 'Data Structures and Algorithms', attendance: '90%', total: '30', attended: '27' },
      { subject: 'Web Programming', attendance: '100%', total: '30', attended: '30' },
      { subject: 'Software Engineering', attendance: '100%', total: '30', attended: '30' },
    ],
  },
};

const Attendance = () => {
  const brandColor = useColorModeValue('brand.500', 'white');
  const [selectedSemester, setSelectedSemester] = useState('Semester 1'); // default selected semester

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  const { totalAttendance, classesAttended, subjects } = mockAttendance[selectedSemester] || {};

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
          <Text fontSize="xl">{totalAttendance}</Text>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg="white"
        >
          <Text fontSize="lg" fontWeight="bold">Classes Attended</Text>
          <Text fontSize="xl">{classesAttended}</Text>
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
          rightIcon={<ChevronDownIcon />}
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
      <ColumnTable tableData={subjects} />
    </Box>
  );
};

export default Attendance;
