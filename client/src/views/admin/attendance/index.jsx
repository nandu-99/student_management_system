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
  Link,
  Flex
} from '@chakra-ui/react';
import { MdOutlineSchool, MdOutlineCalendarToday } from 'react-icons/md';
import ColumnTable from './components/ColumnsTable';
import ComingSoon from 'components/comingSoon';

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
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ComingSoon/>
      <Flex direction="column" align="center">
        <Text fontSize="lg" mb="10px">Till then explore</Text>
        <Flex direction={{ base: "column", md: "row" }} wrap="wrap" gap="10px">
          <Link href="/admin/leaves" color={brandColor} fontSize="md" p="10px" borderRadius="md" bg={boxBg} _hover={{ bg: "blue.500", color: "white" }}>Leaves</Link>
          <Link href="/admin/profile" color={brandColor} fontSize="md" p="10px" borderRadius="md" bg={boxBg} _hover={{ bg: "blue.500", color: "white" }}>Profile</Link>
          <Link href="/admin/default" color={brandColor} fontSize="md" p="10px" borderRadius="md" bg={boxBg} _hover={{ bg: "blue.500", color: "white" }}>Main Dashboard</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Attendance;
