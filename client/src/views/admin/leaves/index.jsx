import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  SimpleGrid,
  useColorModeValue,
  Icon,
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
  const [selectedStat, setSelectedStat] = useState('Leaves Applied Today'); // default selected
  const [tableData, setTableData] = useState([]);
  const [events, setEvents] = useState([]); // New state for upcoming holidays
  const [todayLeavesDatalength, settodayLeavesDatalength] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0); // New state for pending approvals

  useEffect(() => {
    const fetchLeavesData = async () => {
      try {
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

        // Fetch leaves data
        const response = await getLeavesByAdmin();
        const data = response.leaveRequests;

        const transformedData = data.map((request) => ({
          id: request.id,
          studentEnrollmentNumber: request.enrollmentNumber,
          studentName: request.studentName,
          batch: "2027", // Hardcoded as per your requirement
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

        // Filter today's leaves
        const todayLeaves = filterData(transformedData, "Leaves Applied Today");
        settodayLeavesDatalength(todayLeaves.length);

        // Calculate pending approvals
        const pendingCount = data.filter(
          (request) => request.status === "Pending"
        ).length;
        setPendingApprovals(pendingCount);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchLeavesData();
  }, []);

  // Function to filter data based on selected statistic
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
      return events; // Use events when Upcoming Holidays is selected
    }

    return data;
  };

  const handleSelect = (name) => {
    setSelectedStat(name);
  };

  // Filter tableData based on the selected statistic
  const filteredData = filterData(tableData, selectedStat);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }} // Adjusted to 4 columns
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
          value={tableData.length} // Display total number of leaves
          isSelected={selectedStat === "Total Leaves"}
          onClick={() => handleSelect("Total Leaves")}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdPendingActions} color={brandColor} />
              }
            />
          }
          name="Pending Approvals"
          value={pendingApprovals} // Display pending approvals count
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
          value={events.length} // Display number of upcoming holidays
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
