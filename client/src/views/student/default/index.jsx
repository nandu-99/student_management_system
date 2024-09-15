import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Text
} from '@chakra-ui/react';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import React, { useEffect, useState } from 'react';
import {
  MdSchool,
  MdCheckCircle,
  MdEventNote,
} from 'react-icons/md';
import PieCard from 'views/student/default/components/PieCard';
import UpcomingContests from './components/UpcomingContests';
import { getRecentLeaveHistory } from 'api/api';

export default function UserReports() {
  const [totalLeaves, setTotalLeaves] = useState(null);
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRecentLeaveHistory();
        setTotalLeaves(data.recentCompletedLeaveRequests.length);
      } catch (error) {
        console.error('Failed to fetch leave history:', error);
        setTotalLeaves('Error'); // You can also set a default value or handle the error differently
      }
    }

    fetchData();
  }, []);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdSchool} color={brandColor} />}
            />
          }
          name="Current CGPA"
          value="9.25"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdCheckCircle} color={brandColor} />
              }
            />
          }
          name="Current Attendance"
          value="95%"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdEventNote} color={brandColor} />
              }
            />
          }
          name="Total Leaves Taken"
          value={totalLeaves === null ? <Spinner size="sm" /> : totalLeaves}
        />
      </SimpleGrid>
      <SimpleGrid
        gridTemplateColumns={{ base: '1fr', md: '2fr 1fr', xl: '2fr 1fr' }}
        gap="20px"
        height="400px"
      >
        <PieCard />
        <UpcomingContests />
      </SimpleGrid>
    </Box>
  );
}
