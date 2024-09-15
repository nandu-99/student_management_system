import { Box, Grid, GridItem, Text } from '@chakra-ui/react';

export default function CollegeTimetable() {
  return (
    <Box>
      <Grid
        templateColumns="repeat(13, 1fr)" // 13 columns (1 for the day, 12 for the time slots)
        gap={1}
        bg="gray.100"
        p={4}
        borderRadius="lg"
      >
        {/* Header Row: Time slots */}
        <GridItem colSpan={1} bg="gray.200" p={2}>
          <Text fontWeight="bold">Day</Text>
        </GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>09:00-09:30</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>09:30-10:00</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>10:00-10:30</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>10:30-11:00</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>11:00-11:30</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>11:30-12:00</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>12:00-12:30</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>12:30-1:00</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>01:00-01:30</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>01:30-02:00</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>02:00-02:30</Text></GridItem>
        <GridItem colSpan={1} bg="gray.200" p={2}><Text>02:30-03:00</Text></GridItem>

        {/* Monday */}
        <GridItem colSpan={1} bg="gray.100" p={2}><Text fontWeight="bold">Mon</Text></GridItem>
        <GridItem colSpan={6} bg="blue.100" p={2}><Text>DBMS Contest</Text></GridItem>
        <GridItem colSpan={1} bg="gray.100" p={2}><Text>Lunch</Text></GridItem>
        <GridItem colSpan={3} bg="green.100" p={2}><Text>Advanced Programming Lecture</Text></GridItem>
        <GridItem colSpan={2} bg="gray.100" p={2}><Text>Office Hours & Snacks</Text></GridItem>

        {/* Tuesday */}
        <GridItem colSpan={1} bg="gray.100" p={2}><Text fontWeight="bold">Tue</Text></GridItem>
        <GridItem colSpan={2} bg="blue.100" p={2}><Text>Analysis & Design of Algos Lec</Text></GridItem>
        <GridItem colSpan={3} bg="green.100" p={2}><Text>Placement Revision Session</Text></GridItem>
        <GridItem colSpan={1} bg="gray.100" p={2}><Text>Lunch</Text></GridItem>
        <GridItem colSpan={3} bg="purple.100" p={2}><Text>DBMS Lab</Text></GridItem>
        <GridItem colSpan={3} bg="gray.100" p={2}><Text>Office Hours & Snacks</Text></GridItem>

        {/* Wednesday */}
        <GridItem colSpan={1} bg="gray.100" p={2}><Text fontWeight="bold">Wed</Text></GridItem>
        <GridItem colSpan={2} bg="blue.100" p={2}><Text>Analysis & Design of Algos Lec</Text></GridItem>
        <GridItem colSpan={3} bg="green.100" p={2}><Text>Placement Revision Session</Text></GridItem>
        <GridItem colSpan={1} bg="gray.100" p={2}><Text>Lunch</Text></GridItem>
        <GridItem colSpan={3} bg="purple.100" p={2}><Text>Advanced Programming Lab</Text></GridItem>
        <GridItem colSpan={3} bg="gray.100" p={2}><Text>Office Hours & Snacks</Text></GridItem>

        {/* Thursday */}
        <GridItem colSpan={1} bg="gray.100" p={2}><Text fontWeight="bold">Thu</Text></GridItem>
        <GridItem colSpan={2} bg="blue.100" p={2}><Text>Analysis & Design of Algos Lec</Text></GridItem>
        <GridItem colSpan={3} bg="green.100" p={2}><Text>Placement Revision Session</Text></GridItem>
        <GridItem colSpan={1} bg="gray.100" p={2}><Text>Lunch</Text></GridItem>
        <GridItem colSpan={3} bg="purple.100" p={2}><Text>DBMS Lab</Text></GridItem>
        <GridItem colSpan={3} bg="gray.100" p={2}><Text>Office Hours & Snacks</Text></GridItem>

        {/* Friday */}
        <GridItem colSpan={1} bg="gray.100" p={2}><Text fontWeight="bold">Fri</Text></GridItem>
        <GridItem colSpan={2} bg="blue.100" p={2}><Text>Placement Revision Session</Text></GridItem>
        <GridItem colSpan={6} bg="gray.100" p={2}><Text>Lunch</Text></GridItem>
        <GridItem colSpan={4} bg="gray.100" p={2}><Text>Free Friday</Text></GridItem>

        {/* Saturday */}
        <GridItem colSpan={1} bg="gray.100" p={2}><Text fontWeight="bold">Sat</Text></GridItem>
        <GridItem colSpan={12} bg="gray.300" p={2}><Text>Saturday</Text></GridItem>

        {/* Sunday */}
        <GridItem colSpan={1} bg="gray.100" p={2}><Text fontWeight="bold">Sun</Text></GridItem>
        <GridItem colSpan={12} bg="gray.300" p={2}><Text>Sunday</Text></GridItem>
      </Grid>
    </Box>
  );
}
