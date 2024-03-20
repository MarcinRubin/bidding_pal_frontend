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
    const createTable = (path) => {
        const players = ["W", "N", "E", "S"];
        let n = 0;
        let table = [];
        while (n < path.length) {
            let row = [];
            for (let player of players) {
                if (n < path.length && player === path[n].player) {
                    row.push([n, path[n].bid]);
                    n += 1;
                } else {
                    row.push("");
                }
            }
            table.push(row);
        }
        return table;
    };

    const table = createTable(path);
    console.log(table);

    return (
        <TableContainer>
            <Table variant="simple" bg="green.200" size="lg">
                <Thead>
                    <Tr bg="green.400">
                        <Th borderRightWidth={1} textAlign="center">
                            W
                        </Th>
                        <Th borderRightWidth={1} textAlign="center">
                            N
                        </Th>
                        <Th borderRightWidth={1} textAlign="center">
                            E
                        </Th>
                        <Th borderRightWidth={1} textAlign="center">
                            S
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {table.map((item, idx) => (
                        <Tr key={idx} borderWidth={1}>
                            {item.map((item2, idx2) => (
                                <Td
                                    key={idx2}
                                    borderRightWidth={1}
                                    cursor = {item2 ? "pointer": "default"}
                                    _hover={item2 ? {bgColor: "green.100" }: {}}
                                    onClick={item2 ? () => handleChangeActiveComment(pathNumber, item2[0]): null}
                                >
                                    {item2 ?  <SingleBid>{item2[1]}</SingleBid> : "-"}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};



export default BidTable;
