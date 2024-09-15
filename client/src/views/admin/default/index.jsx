import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Text, 
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import { MdWarning } from "react-icons/md";

import Usa from "assets/img/dashboards/usa.png";

import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <PieCard />
        <DailyTraffic />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          
          
        </SimpleGrid>
      </SimpleGrid>
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid> */}
      <Flex justify="center" pt="20px">
        <Box
          display="inline-block"
          bg={useColorModeValue("gray.100", "gray.700")}
          p="4"
          textAlign="center"
          borderRadius="md"
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Flex align="center" justify="center">
            <Icon as={MdWarning} color="yellow.400" mr="2" />
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
              This data is dummy and not accurate. It will be updated with real data in future versions.
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
