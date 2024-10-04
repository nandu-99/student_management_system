import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Tooltip,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { useState } from 'react';
import * as React from 'react';
import { MdCancel, MdCheckCircle, MdPending, MdInfo } from 'react-icons/md';
import { approveOrRejectLeave } from 'api/api';
import { WarningTwoIcon } from '@chakra-ui/icons'; // You can replace this with a GIF if you prefer

const columnHelper = createColumnHelper();

export default function ComplexTable({ tableData, type }) {
  const [sorting, setSorting] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRejectId, setSelectedRejectId] = useState(null); // To track the row being rejected
  const [rejectReason, setRejectReason] = useState(''); // To track the entered reason for rejection
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI's modal hooks
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const toast = useToast();

  React.useEffect(() => {
    if (!tableData || tableData.length === 0) {
      setError('No data available');
    } else {
      setError(null); // Clear the error if data is available
    }
  }, [tableData]);

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await approveOrRejectLeave(id, 'approve');
      toast({
        title: 'Leave approved.',
        description: `Leave has been approved successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error approving leave:', error);
      toast({
        title: 'Error approving leave.',
        description: error.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      await approveOrRejectLeave(selectedRejectId, 'reject', rejectReason);
      toast({
        title: 'Leave rejected.',
        description: `Leave has been rejected.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      onClose(); // Close the modal after rejection
    } catch (error) {
      console.error('Error rejecting leave:', error);
      toast({
        title: 'Error rejecting leave.',
        description: error.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
      setRejectReason(''); // Reset the reason field
    }
  };

  const openRejectModal = (id) => {
    setSelectedRejectId(id); // Store the ID of the row to be rejected
    onOpen(); // Open the modal
  };

  const columns = React.useMemo(() => {
    if (type === 'Upcoming Holidays') {
      return [
        columnHelper.accessor('event', {
          id: 'event',
          header: () => (
            <Text
              justifyContent="space-between"
              align="flex-start"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              EVENT NAME
            </Text>
          ),
          cell: (info) => (
            <Flex align="center">
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {info.getValue()}
              </Text>
            </Flex>
          ),
        }),
        columnHelper.accessor('date', {
          id: 'date',
          header: () => (
            <Text
              justifyContent="space-between"
              align="flex-start"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              DATE
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
      ];
    } else {
      const commonColumns = [
        columnHelper.accessor('studentEnrollmentNumber', {
          id: 'studentEnrollmentNumber',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              ENROLLMENT NUMBER
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.accessor('studentName', {
          id: 'studentName',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              STUDENT NAME
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.accessor('batch', {
          id: 'batch',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              BATCH
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.accessor('leaveType', {
          id: 'leaveType',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              LEAVE TYPE
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.accessor('date', {
          id: 'date',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              DATE
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700" w="180px">
              {info.getValue()}
            </Text>
          ),
        }),
        columnHelper.display({
          id: 'info',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              INFO
            </Text>
          ),
          cell: ({ row }) => (
            <Tooltip
              label={row.original.reason || 'No additional information'}
              aria-label="Info Tooltip"
            >
              <IconButton
                size="sm"
                variant="outline"
                colorScheme="gray"
                icon={<MdInfo />}
                aria-label="Information"
              />
            </Tooltip>
          ),
        }),
        columnHelper.accessor('status', {
          id: 'status',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              STATUS
            </Text>
          ),
          cell: (info) => (
            <Flex align="center">
              <Icon
                w="24px"
                h="24px"
                me="5px"
                color={
                  info.getValue() === 'Approved'
                    ? 'green.500'
                    : info.getValue() === 'Rejected'
                    ? 'red.500'
                    : info.getValue() === 'Pending'
                    ? 'orange.500'
                    : null
                }
                as={
                  info.getValue() === 'Approved'
                    ? MdCheckCircle
                    : info.getValue() === 'Rejected'
                    ? MdCancel
                    : info.getValue() === 'Pending'
                    ? MdPending
                    : null
                }
              />
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {info.getValue()}
              </Text>
            </Flex>
          ),
        }),
      ];
  
      if (type !== 'Total Leaves') {
        commonColumns.push(
          columnHelper.display({
            id: 'actions',
            header: () => (
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: '10px', lg: '12px' }}
                color="gray.400"
              >
                ACTIONS
              </Text>
            ),
            cell: ({ row }) => (
              <Flex align="center" gap="2">
                <Tooltip
                  label="Click to approve the entry"
                  aria-label="Approve Tooltip"
                >
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleApprove(row.original.id)}
                  >
                    Approve
                  </Button>
                </Tooltip>
                <Tooltip
                  label="Click to reject the entry"
                  aria-label="Reject Tooltip"
                >
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => openRejectModal(row.original.id)}
                  >
                    Reject
                  </Button>
                </Tooltip>
              </Flex>
            ),
          })
        );
      }
  
      return commonColumns;
    }
  }, [textColor, type]);
  
  

  const table = useReactTable({
    data: tableData || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      {error ? (
        <Flex justify="center" align="center" h="80vh" mt="-10">
          <Box
            p="4"
            maxW="sm"
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            borderColor={borderColor}
            textAlign="center"
          >
            <WarningTwoIcon w={16} h={16} color="orange.300" mb={4} />
            {/* You can replace the icon with a GIF by using an <Image> tag */}
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Oops! No Data Available
            </Text>
            <Text fontSize="lg" color="gray.500">
              It looks like no one applied leaves today. Please try again later!
            </Text>
          </Box>
        </Flex>
      ) : (
        <Card>
          <Table variant="simple">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      cursor="pointer"
                      color={textColor}
                      fontSize={{ sm: '10px', lg: '12px' }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <Icon as={MdCheckCircle} ml="2" boxSize="4" />
                        ) : (
                          <Icon as={MdPending} ml="2" boxSize="4" />
                        )
                      ) : null}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>
      )}

      {/* Modal for rejecting leave */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reason for Rejection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter the reason for rejection"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleReject}
              isLoading={loading}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
