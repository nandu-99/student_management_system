import React from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';

const ComingSoon = () => {
  return (
    <Center height="500px">
      <Box textAlign="center" p={5} borderRadius="md" bg="white" boxShadow="lg">
        <Heading as="h1" size="2xl" mb={4} color="#6F4FFC">
          Coming Soon
        </Heading>
        <Text fontSize="xl"color="gray.600">
          We're working hard to bring you something awesome. Stay tuned!
        </Text>
      </Box>
    </Center>
  );
};

export default ComingSoon;
