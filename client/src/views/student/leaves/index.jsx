import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Text, 
  Spinner, 
  Center,
  Flex
} from "@chakra-ui/react";
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import GeneralInformation from "./components/General";
import ComplexTable from "./components/ComplexTable";
import {
  MdInsertChart,
  MdHistory,
  MdEventAvailable,
} from "react-icons/md";
import { getRecentLeaveHistory } from "api/api";
import { getUpcomingEvents } from "api/api";

const CalendarPage = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [selectedStat, setSelectedStat] = useState('Recent Leave History'); // default selected
  const [totalLeaves, setTotalLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data;
      let leaveData;
      data = await getRecentLeaveHistory();
      let events = await getUpcomingEvents();
      setTotalLeaves(data.recentCompletedLeaveRequests)
      if (selectedStat === 'Recent Leave History') {
        leaveData = data.recentLeaveRequests
      } else if (selectedStat === 'Total Leaves taken') {
        leaveData = data.recentCompletedLeaveRequests
      } else {
        leaveData = events
      }
      const formattedLeaveData = leaveData.map(leave => ({
        name: leave.leaveType,
        status: leave.status,
        date: `${new Date(leave.startDate).toLocaleDateString()} - ${new Date(leave.endDate).toLocaleDateString()}`
      }));

      const eventData = events.map(eve=>({
        event: eve.event, 
        date: new Date(eve.date).toLocaleDateString()!=new Date(eve.endDate).toLocaleDateString()? `${new Date(eve.date).toLocaleDateString()} - ${new Date(eve.endDate).toLocaleDateString()}`: `${new Date(eve.date).toLocaleDateString()}`,
      }));
      if(selectedStat=='Upcoming Holidays'){
        setTableData(eventData)
      }else{
      setTableData(formattedLeaveData)
      };
      setLoading(false);
    };
    fetchData();
  }, [selectedStat]);

  const handleSelect = (name) => {
    setSelectedStat(name);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdInsertChart} color={brandColor} />
              }
            />
          }
          name='Total Leaves taken'
          value={totalLeaves.length}
          isSelected={selectedStat === 'Total Leaves taken'}
          onClick={() => handleSelect('Total Leaves taken')}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdHistory} color={brandColor} />
              }
            />
          }
          name='Recent Leave History'
          value=''
          isSelected={selectedStat === 'Recent Leave History'}
          onClick={() => handleSelect('Recent Leave History')}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdEventAvailable} color={brandColor} />
              }
            />
          }
          name='Upcoming Holidays'
          value=''
          isSelected={selectedStat === 'Upcoming Holidays'}
          onClick={() => handleSelect('Upcoming Holidays')}
        />
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap='20px' mt='20px'>
        <Box>
          <GeneralInformation
            minH="365px"
            pe="20px"
          />
        </Box>
        <Box maxH="620px" overflowY="auto">
        {loading ? (
            <Flex
              align="center"
              justify="center"
              height="100vh"
              flexDirection="column"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                size="xl"
                color="blue.500"
              />
              <Text fontSize="lg" mt="4" color="gray.600">
                Loading, please wait...
              </Text>
            </Flex>
          ) : (
            <ComplexTable tableData={tableData} type={selectedStat} />
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default CalendarPage;
