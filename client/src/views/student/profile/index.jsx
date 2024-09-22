import { Box, Grid, Text, Spinner, Flex } from "@chakra-ui/react";
import {useState, useEffect} from 'react';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log(data)
        setProfileData(data);
      } catch (error) {
        console.error('Failed to fetch profile data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
