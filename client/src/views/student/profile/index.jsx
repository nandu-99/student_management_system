import { Box, Grid } from "@chakra-ui/react";
import {useState, useEffect} from 'react';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";
import { getProfile } from "api/api";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar7.png";
import React from "react";
import { from } from "stylis";

export default function Overview() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log(data)
        setProfileData(data);
      } catch (error) {
        console.error('Failed to fetch profile data:', error.message);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return <Text>Loading...</Text>; // Optional: Add a loading state
  }
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns="1fr" 
        templateRows="auto"
        gap={{ base: "20px", xl: "20px" }}
      >
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          avatar={avatar}
          name={profileData.name}
          job={profileData.role}
          posts="17"
          followers="9.7k"
          following="274"
        />
        <General
          gridArea="2 / 1 / 3 / 2"
          minH="365px"
          pe="20px"
          profileData={profileData}
        />
      </Grid>
      <Grid
        mb="20px"
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        {/* Other components can be added here */}
      </Grid>
    </Box>
  );
}
