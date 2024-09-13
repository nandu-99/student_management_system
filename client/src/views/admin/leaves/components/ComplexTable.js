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

const columnHelper = createColumnHelper();

export default function ComplexTable({ tableData, type }) {
  const [sorting, setSorting] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true); // Set loading state to true
      await approveOrRejectLeave(id, 'approve'); // Call the API function
      
      // Show a success toast
      toast({
        title: 'Leave approved.',
        description: `Leave has been approved successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    } catch (error) {
      console.error('Error approving leave:', error);

      // Show an error toast
      toast({
        title: 'Error approving leave.',
        description: error.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true); // Set loading state to true
      await approveOrRejectLeave(id, 'reject'); // Call the API function

      // Show a success toast
      toast({
        title: 'Leave rejected.',
        description: `Leave has been rejected.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    } catch (error) {
      console.error('Error rejecting leave:', error);

      // Show an error toast
      toast({
        title: 'Error rejecting leave.',
        description: error.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const columns = React.useMemo(() => {
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
          <Text color={textColor} fontSize="sm" fontWeight="700">
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
          <Tooltip label={row.original.reason || "No additional information"} aria-label="Info Tooltip">
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
    ];

    if (type === 'Upcoming Holidays') {
      return [
        ...commonColumns,
        columnHelper.accessor('occasion', {
          id: 'occasion',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              OCCASION
            </Text>
          ),
          cell: (info) => (
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          ),
        }),
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
              <Tooltip label="Click to approve the entry" aria-label="Approve Tooltip">
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleApprove(row.original.id)}
                >
                  Approve
                </Button>
              </Tooltip>
              <Tooltip label="Click to reject the entry" aria-label="Reject Tooltip">
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleReject(row.original.id)}
                >
                  Reject
                </Button>
              </Tooltip>
            </Flex>
          ),
        }),
      ];
    } else {
      return [
        ...commonColumns,
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
              <Tooltip label="Click to approve the entry" aria-label="Approve Tooltip">
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleApprove(row.original.id)}
                >
                  Approve
                </Button>
              </Tooltip>
              <Tooltip label="Click to reject the entry" aria-label="Reject Tooltip">
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleReject(row.original.id)}
                >
                  Reject
                </Button>
              </Tooltip>
            </Flex>
          ),
        }),
      ];
    }
  }, [type, textColor]);

  const table = useReactTable({
    data: tableData,
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
        <Alert status="error" mb="4">
          <AlertIcon />
          {error}
        </Alert>
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
    </>
  );
}
