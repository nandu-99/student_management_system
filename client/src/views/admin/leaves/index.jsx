import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import ComplexTable from "./components/ComplexTable";
import {
  MdInsertChart,
  MdHistory,
  MdEventAvailable,
  MdPendingActions,
} from "react-icons/md";
import { getLeavesByAdmin, getUpcomingEvents } from "api/api";

const CalendarPage = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [selectedStat, setSelectedStat] = useState('Leaves Applied Today');
  const [tableData, setTableData] = useState([]);
  const [events, setEvents] = useState([]);
  const [todayLeavesDatalength, settodayLeavesDatalength] = useState(0);
  const [totalLeavesDatalength, settotalLeavesDatalenght] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchLeavesData = async () => {
      try {
        setLoading(true); // Start loading
        let eventsResponse = await getUpcomingEvents();

        const transformedEvents = eventsResponse.map((event) => ({
          ...event,
          date:
            new Date(event.date).toLocaleDateString() !==
            new Date(event.endDate).toLocaleDateString()
              ? `${new Date(event.date).toLocaleDateString()} - ${new Date(
                  event.endDate
                ).toLocaleDateString()}`
              : `${new Date(event.date).toLocaleDateString()}`,
        }));
        setEvents(transformedEvents);

        const response = await getLeavesByAdmin();
        const data = response.leaveRequests;

        const transformedData = data.map((request) => ({
          id: request.id,
          studentEnrollmentNumber: request.enrollmentNumber,
          studentName: request.studentName,
          batch: "2027",
          leaveType: request.leaveType,
          status: request.status,
          date:
            new Date(request.startDate).toLocaleDateString() !==
            new Date(request.endDate).toLocaleDateString()
              ? `${new Date(request.startDate).toLocaleDateString()} - ${new Date(
                  request.endDate
                ).toLocaleDateString()}`
              : `${new Date(request.startDate).toLocaleDateString()}`,
          reason: request.reason,
          createdAt: request.createdAt,
        }));

        setTableData(transformedData);

        const todayLeaves = filterData(transformedData, "Leaves Applied Today");
        const totalLeaves = filterData(transformedData, 'Total Leaves');
        settotalLeavesDatalenght(totalLeaves.length);
        settodayLeavesDatalength(todayLeaves.length);

        const pendingCount = data.filter(
          (request) => request.status === "Pending"
        ).length;
        setPendingApprovals(pendingCount);

        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false); // Stop loading even in case of error
      }
    };

    fetchLeavesData();
  }, []);

  const filterData = (data, stat) => {
    const today = new Date().toLocaleDateString();

    if (stat === "Leaves Applied Today") {
      return data.filter((item) => {
        const appliedDate = new Date(item.createdAt).toLocaleDateString();
        return appliedDate === today;
      });
    }

    if (stat === "Pending Leave Approvals") {
      return data.filter((item) => item.status === "Pending");
    }

    if (stat === "Total Leaves") {
      return data.filter(
        (item) => item.status === "Approved" || item.status === "Rejected"
      );
    }

    if (stat === "Upcoming Holidays") {
      return events;
    }

    return data;
  };

  const handleSelect = (name) => {
    setSelectedStat(name);
  };

  const filteredData = filterData(tableData, selectedStat);

  if (loading) {
    return (
      <Flex align="center" justify="center" height="100vh" flexDirection="column">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
          color="blue.500"
        />
        <Text fontSize="lg" mt="4" color="gray.600">Loading, please wait...</Text>
      </Flex>
    );
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdInsertChart} color={brandColor} />}
            />
          }
          name="Total Leaves"
          value={totalLeavesDatalength}
          isSelected={selectedStat === "Total Leaves"}
          onClick={() => handleSelect("Total Leaves")}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdPendingActions} color={brandColor} />}
            />
          }
          name="Pending Approvals"
          value={pendingApprovals}
          isSelected={selectedStat === "Pending Leave Approvals"}
          onClick={() => handleSelect("Pending Leave Approvals")}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdHistory} color={brandColor} />}
            />
          }
          name="Leaves Applied Today"
          value={todayLeavesDatalength}
          isSelected={selectedStat === "Leaves Applied Today"}
          onClick={() => handleSelect("Leaves Applied Today")}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdEventAvailable} color={brandColor} />}
            />
          }
          name="Upcoming Holidays"
          value={events.length}
          isSelected={selectedStat === "Upcoming Holidays"}
          onClick={() => handleSelect("Upcoming Holidays")}
        />
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr" }} gap="20px" mt="20px">
        <Box>
          <ComplexTable tableData={filteredData} type={selectedStat} />
        </Box>
      </Grid>
    </Box>
  );
};

export default CalendarPage;
