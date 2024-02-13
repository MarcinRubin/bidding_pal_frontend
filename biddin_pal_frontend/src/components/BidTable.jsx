import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import SingleBid from "./SingleBid";

const BidTable = ({ path, pathNumber, handleChangeActiveComment }) => {
  return (
    <TableContainer>
      <Table variant="simple" bg="green.200" size="md">
        <Thead>
          <Tr bg="green.400">
            <Th borderRightWidth={1} textAlign="center">
              N
            </Th>
            <Th borderRightWidth={1} textAlign="center">
              E
            </Th>
            <Th borderRightWidth={1} textAlign="center">
              S
            </Th>
            <Th borderRightWidth={1} textAlign="center">
              W
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(Math.round(path.length / 2)).keys()].map((idx) => (
            <Tr key={idx} borderWidth={1}>
              <Td
                borderRightWidth={1}
                cursor="pointer"
                _hover={{ bgColor: "green.100" }}
              ></Td>
              <Td
                borderRightWidth={1}
                cursor="pointer"
                _hover={{ bgColor: "green.100" }}
                onClick={() => handleChangeActiveComment(pathNumber, 2 * idx)}
              >
                <SingleBid>{path[2 * idx]?.bid}</SingleBid>
              </Td>
              <Td
                borderRightWidth={1}
                cursor="pointer"
                _hover={{ bgColor: "green.100" }}
              ></Td>
              <Td
                borderRightWidth={1}
                cursor="pointer"
                _hover={{ bgColor: "green.100" }}
                onClick={() =>
                  handleChangeActiveComment(pathNumber, 2 * idx + 1)
                }
              >
                <SingleBid>{path[2 * idx + 1]?.bid}</SingleBid>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BidTable;
