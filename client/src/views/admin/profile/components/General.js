// Chakra imports
import {
  SimpleGrid,
  Text,
  useColorModeValue,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons"; // Chakra UI edit and check icons
import React, { useState } from "react";
// Custom components
import Card from "components/card/Card.js";
import Information from "views/admin/profile/components/Information";
import { updateProfile } from "api/api";

export default function GeneralInformation(props) {
  const { profileData, ...rest } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState({
    "Enrollment Id": profileData.enrollmentId || '',
    Email: profileData.email || '',
    Year: '2024', 
    Contact: profileData.contactNumber || '',
    "Parent Name": profileData.parentName || '',
    "Parent Contact": profileData.parentContact || '',
    School: profileData.school || '',
    DOB: profileData.dob || '',
  });
  const toast = useToast();

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const handleEditClick = () => setIsEditing(!isEditing); 
  const handleSaveClick = async() => {
    setIsEditing(false); 
    try {
      await updateProfile(info); 
      toast({
        title: "Profile updated.",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error('Error updating profile:', error.message);
      toast({
        title: "Update failed.",
        description: "There was an error updating your profile. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      {/* Edit and Save buttons at the top */}
      <Flex justifyContent="space-between" alignItems="center">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
        >
          General Information
        </Text>
        <Flex>
          {isEditing ? (
            <Button
              leftIcon={<CheckIcon />}
              backgroundColor="#412AFB"
              _hover={{ backgroundColor: "#3a26d1" }}
              onClick={handleSaveClick}
              colorScheme="teal"
              size="sm"
              mr="2"
            >
              Save
            </Button>
          ) : (
            <Button
              leftIcon={<EditIcon />}
              backgroundColor="#412AFB"
              _hover={{ backgroundColor: "#3a26d1" }}
              onClick={handleEditClick}
              colorScheme="teal"
              size="sm"
              mr="2"
            >
              Edit
            </Button>
          )}
        </Flex>
      </Flex>
      {/* Information Section */}
      <SimpleGrid columns="2" gap="20px">
        {Object.keys(info)
          .filter((key) => 
            isEditing ? !["Email", "Year", "School", "Enrollment Id"].includes(key) : info[key]
          )
          .map((key) => (
            isEditing ? (
              <FormControl key={key}>
                <FormLabel color={textColorPrimary} fontSize="sm" fontWeight="bold">
                  {key}
                </FormLabel>
                <Input
                  name={key}
                  type={key === "Enrollment Id" ? "number" : "text"}
                  value={info[key]}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                  boxShadow={cardShadow}
                />
              </FormControl>
            ) : (
              <Information
                key={key}
                boxShadow={cardShadow}
                title={key}
                value={info[key]}
              />
            )
          ))}
      </SimpleGrid>
    </Card>
  );
}
