import React, { useState, useEffect } from "react";
import { Box, Flex, Text, useColorModeValue, Center, Spinner } from "@chakra-ui/react";
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
        const today = new Date();
        const upcomingContests = data.filter(contest => new Date(contest.date) > today);
        upcomingContests.sort((a, b) => new Date(a.date) - new Date(b.date));
        setContests(upcomingContests.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

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
