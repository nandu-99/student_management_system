import React, { useState, useEffect } from "react";
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
  Flex,
  Spinner,
  Text
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import ColumnTable from "./components/ColumnsTable";
import { MdOutlineAssessment, MdOutlineEvent } from "react-icons/md";
import { getContests } from "api/api";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Contests = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [selectedStat, setSelectedStat] = useState('Upcoming Contests');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [previousContests, setPreviousContests] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const handleSelect = (name) => {
    setSelectedStat(name);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getContests();
        const today = new Date();
        const filteredData = data.filter(contest =>
          selectedSubject === 'All Subjects' || contest.course === selectedSubject
        );

        const upcoming = filteredData.filter(contest => new Date(contest.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        const previous = filteredData.filter(contest => new Date(contest.date) < today)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        const formatData = (data) => data.map(contest => ({
          name: contest.name,
          progress: Math.round(contest.weightage * 100) !== 0 ? `${Math.round(contest.weightage * 100)}%` : "-",
          quantity: contest.course,
          date: new Date(contest.date).toLocaleDateString('en-GB')
        }));

        setUpcomingContests(formatData(upcoming));
        setPreviousContests(formatData(previous));
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchContests();
  }, [selectedSubject]);

  const tableData = selectedStat === 'Upcoming Contests' ? upcomingContests : previousContests;

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
      <Menu>
        <MenuButton
          as={Button}
          bg="#412AFB"
          color="white"
          _hover={{ bg: "#341FB0" }} 
          _active={{ bg: "#2E1B9A" }} 
          mb="20px"
          rightIcon={<ChevronDownIcon />}
        >
          {selectedSubject}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleSubjectChange('All Subjects')}>All Subjects</MenuItem>
          <MenuItem onClick={() => handleSubjectChange('ADA')}>ADA</MenuItem>
          <MenuItem onClick={() => handleSubjectChange('DBMS')}>DBMS</MenuItem>
          <MenuItem onClick={() => handleSubjectChange('AP')}>AP</MenuItem>
          <MenuItem onClick={() => handleSubjectChange('placement')}>Placement</MenuItem>
        </MenuList>
      </Menu>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px">
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdOutlineAssessment} color={brandColor} />
              }
            />
          }
          name="Previous Contests"
          isSelected={selectedStat === 'Previous Contests'}
          onClick={() => handleSelect('Previous Contests')}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdOutlineEvent} color={brandColor} />
              }
            />
          }
          name="Upcoming Contests"
          isSelected={selectedStat === 'Upcoming Contests'}
          onClick={() => handleSelect('Upcoming Contests')}
        />
      </SimpleGrid>
      <ColumnTable tableData={tableData} />
    </Box>
  );
};

export default Contests;
