import {
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
import * as React from 'react';
import { MdCancel, MdCheckCircle, MdPending } from 'react-icons/md'; 

const columnHelper = createColumnHelper();

export default function ComplexTable({ tableData, type }) {
  const [sorting, setSorting] = React.useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const columns = React.useMemo(() => {
    if (type === 'Upcoming Holidays') {
      return [
        columnHelper.accessor('event', {
          id: 'event',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
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
        })
      ];
    } else {
      return [
        columnHelper.accessor('name', {
          id: 'name',
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
            <Flex align="center">
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {info.getValue()}
              </Text>
            </Flex>
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
        })
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
    debugTable: true,
  });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {type}
        </Text>
        {/* <Menu /> */}
      </Flex>
      <Box>
        {tableData.length === 0 ? (
          <Text color={textColor} fontSize="sm" fontWeight="700" textAlign="center" p="30px" >
            No {type}
          </Text>
        ) : (
          <Table variant="simple" color="gray.500" mb="24px" mt="12px">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted()] ?? null}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.slice(0, 11).map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor="transparent"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Card>
  );
}
