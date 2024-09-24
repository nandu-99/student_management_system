// Chakra imports
import {
  SimpleGrid,
  Text,
  useColorModeValue,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Button,
  Box,
  Icon,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { MdAttachFile } from "react-icons/md";
import Card from "components/card/Card.js";
import { submitLeaveRequest } from "api/api";


export default function GeneralInformation(props) {
  const { ...rest } = props;
  const [info, setInfo] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
    file: null,
  });
  const fileInputRef = useRef(null);
  const toast = useToast();

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setInfo({ ...info, file: e.target.files[0] });
    } else {
      setInfo({ ...info, [e.target.name]: e.target.value });
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    // Validation check
    if (!info.leave_type || !info.start_date || !info.end_date || !info.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const formData = new FormData();
    formData.append('leave_type', info.leave_type);
    formData.append('start_date', info.start_date);
    formData.append('end_date', info.end_date);
    formData.append('reason', info.reason);
    if (info.file) {
      formData.append('file', info.file);
    }
    try {
      await submitLeaveRequest(formData); 
      toast({
        title: "Submission Successful",
        description: "Your leave request has been submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setInfo({
        leave_type: '',
        start_date: '',
        end_date: '',
        reason: '',
        file: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      window.location.reload();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your leave request.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
        >
          Apply Leave
        </Text>
      </Flex>
      {/* Information Section */}
      <SimpleGrid columns="1" gap="20px">
        <FormControl isRequired>
          <FormLabel color={textColorPrimary} fontSize="sm" fontWeight="bold">
            Leave Type
          </FormLabel>
          <Select
            name="leave_type"
            value={info.leave_type}
            onChange={handleChange}
            placeholder="Select Leave Type"
            boxShadow={cardShadow}
          >
            <option value="Sick Leave">Sick Leave</option>
            <option value="Vacation">Vacation</option>
            <option value="Personal">Personal</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColorPrimary} fontSize="sm" fontWeight="bold">
            Start Date
          </FormLabel>
          <Input
            type="date"
            name="start_date"
            value={info.start_date}
            onChange={handleChange}
            onFocus={(e) => e.target.showPicker()}
            boxShadow={cardShadow}
            min={today}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColorPrimary} fontSize="sm" fontWeight="bold">
            End Date
          </FormLabel>
          <Input
            type="date"
            name="end_date"
            value={info.end_date}
            onChange={handleChange}
            onFocus={(e) => e.target.showPicker()}
            boxShadow={cardShadow}
            min={today}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColorPrimary} fontSize="sm" fontWeight="bold">
            Reason
          </FormLabel>
          <Textarea
            name="reason"
            value={info.reason}
            onChange={handleChange}
            placeholder="Enter reason for leave"
            boxShadow={cardShadow}
          />
        </FormControl>
        <FormControl>
          <FormLabel color={textColorPrimary} fontSize="sm" fontWeight="bold">
            Upload File (Optional)
          </FormLabel>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            p="2"
            borderRadius="md"
            borderWidth="1px"
            boxShadow={cardShadow}
            cursor="pointer"
            _hover={{ borderColor: "blue.300" }}
            onClick={handleFileClick}
          >
            <Input
              type="file"
              name="file"
              ref={fileInputRef}
              onChange={handleChange}
              display="none"
              boxShadow={cardShadow}
            />
            <Text flex="1" ml="2" color={textColorPrimary}>
              {info.file ? info.file.name : "Choose file..."}
            </Text>
            <Icon as={MdAttachFile} boxSize="6" color={textColorPrimary} />
          </Flex>
        </FormControl>
        <Button
          onClick={handleSubmit}
          backgroundColor="#412AFB"
          _hover={{ backgroundColor: "#3a26d1" }}
          colorScheme="teal"
          size="md"
        >
          Submit
        </Button>
      </SimpleGrid>
    </Card>
  );
}
