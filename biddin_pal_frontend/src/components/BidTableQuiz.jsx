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

const BidTableQuiz = ({ onOpen, path }) => {
  let singlePath = [...path];
  singlePath[singlePath.length - 1] = {
    ...singlePath[singlePath.length - 1],
    props: {
      cursor: "pointer",
      _hover: {
        background: "green.300",
      },
      onClick: onOpen,
    },
  };

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
          {[...Array(Math.round(singlePath.length / 2)).keys()].map((idx) => (
            <Tr key={idx} borderWidth={1}>
              <Td borderRightWidth={1}></Td>
              <Td borderRightWidth={1} {...singlePath[2 * idx]?.props}>
                <SingleBid>{singlePath[2 * idx]?.name}</SingleBid>
              </Td>
              <Td borderRightWidth={1}></Td>
              <Td borderRightWidth={1} {...singlePath[2 * idx + 1]?.props}>
                <SingleBid>{singlePath[2 * idx + 1]?.name}</SingleBid>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BidTableQuiz;
