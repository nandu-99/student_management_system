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
  Link, 
  Text,
  Flex
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import ColumnTable from "./components/ColumnsTable";
import {
  MdInsertChart,
  MdHistory,
  MdOutlineAssessment,
  MdOutlineEvent,
  MdEventAvailable,
} from "react-icons/md";
import ComingSoon from "components/comingSoon";

const Contests = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const selectedBgColor = useColorModeValue("#412AFB", "#412AFB");
  const [selectedStat, setSelectedStat] = useState('Upcoming Contests'); // default selected 
  const [selectedSubject, setSelectedSubject] = useState('All Subjects'); // default selected subject

  const handleSelect = (name) => {
    setSelectedStat(name);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
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

export default Contests;
