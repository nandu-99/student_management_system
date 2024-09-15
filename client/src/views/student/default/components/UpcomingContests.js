import React, { useState, useEffect } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import { getContests } from "api/api";

// Function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function UpcomingContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const data = await getContests();
        // Filter contests to show only those upcoming
        const today = new Date();
        const upcomingContests = data.filter(contest => new Date(contest.date) > today);
        // Sort contests by date
        upcomingContests.sort((a, b) => new Date(a.date) - new Date(b.date));
        // Limit to the next 3 contests
        setContests(upcomingContests.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">Error: {error}</Text>;

  return (
    <Card p="20px" w="100%">
      <Text color={textColor} fontSize="xl" fontWeight="700" mb="20px">
        Upcoming Contests
      </Text>
      <Box>
        {contests.map((contest, index) => (
          <Flex
            key={index}
            justify="space-between"
            mb="10px"
            p="10px"
            borderRadius="8px"
            bg={"gray.200"}
          >
            <Text color={textColor} fontWeight="500">
              {contest.name}
            </Text>
            <Text color={textColor}>{formatDate(contest.date)}</Text>
          </Flex>
        ))}
      </Box>
    </Card>
  );
}
