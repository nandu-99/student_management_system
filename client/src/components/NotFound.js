import { Box, Text, Button, useBreakpointValue } from '@chakra-ui/react';

export default function NotFound() {
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <Box
      padding="40px 0"
      backgroundColor="#fff"
      fontFamily="'Arvo', serif"
      textAlign="center"
      height="100vh"
    >
      <Box
        backgroundImage="url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)"
        backgroundPosition="center"
        backgroundSize="cover"
        height="500px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb="20px"
      >
      </Box>
      <Box>
        <Text fontSize="2xl" mb="10px">
          Look like you're lost
        </Text>
        <Text mb="20px">The page you are looking for is not available!</Text>
        <Button
          as="a"
          href="/"
          size={buttonSize}
          colorScheme="blue"
          variant="solid"
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
}
