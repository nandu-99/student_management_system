import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  SimpleGrid,
  useColorModeValue,
  Icon,
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

  const [tableData, setTableData] = useState([]);

  // useEffect(() => {
  //   switch (selectedStat) {
  //     case 'Total Leaves taken':
  //       setTableData([
  //         { name: 'Sick Leave', status: 'Approved', date: '2024/08/25' },
  //         { name: 'Vacation', status: 'Approved', date: '2024/09/24-2024/09/28' },
  //       ]);
  //       break;
  //     case 'Recent Leave History':
  //       setTableData([
  //         { name: 'Sick Leave', status: 'Rejected', date: '2024/08/25' },
  //         { name: 'Leave', status: 'Pending', date: '2024/09/24' },
  //       ]);
  //       break;
  //       case 'Upcoming Holidays':
  //         setTableData([
  //           { name: 'Christmas', occasion: 'Christmas Day', date: '2024/12/25' },
  //           { name: 'New Year', occasion: 'New Year’s Eve', date: '2024/12/31' },
  //         ]);
  //       break;
  //     default:
  //       setTableData([]);
  //   }
  // }, [selectedStat]);

  useEffect(() => {
    const fetchData = async () => {
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
        <Box>
          <ComplexTable tableData={tableData} type={selectedStat} />
        </Box>
      </Grid>
    </Box>
  );
};

export default CalendarPage;
