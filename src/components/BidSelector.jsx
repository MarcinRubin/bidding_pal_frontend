import {
    Flex,
    HStack,
    VStack,
    Button,
    Grid,
    GridItem,
    Icon,
    IconButton,
    Heading,
    Text
} from "@chakra-ui/react";
import {
    BsSuitSpadeFill,
    BsSuitClubFill,
    BsSuitDiamondFill,
    BsSuitHeartFill,
} from "react-icons/bs";

const bidLevel = [1, 2, 3, 4, 5, 6, 7];

const bidColor = {
    C: {
        id: "C",
        icon: <BsSuitClubFill />,
        iconName: BsSuitClubFill,
        color: "black",
    },
    D: {
        id: "D",
        icon: <BsSuitDiamondFill />,
        iconName: BsSuitDiamondFill,
        color: "red",
    },
    H: {
        id: "H",
        icon: <BsSuitHeartFill />,
        iconName: BsSuitHeartFill,
        color: "red",
    },
    S: {
        id: "S",
        icon: <BsSuitSpadeFill />,
        iconName: BsSuitSpadeFill,
        color: "black",
    },
    NT: {
        id: "NT",
        icon: <BsSuitSpadeFill />,
        iconName: "NT",
    },
};

const special = ["X", "XX", "PAS"];

const BidSelector = ({ bidState, setBidState }) => {
    const handleChangeLevel = (e) => {
        let newBidState = { ...bidState, special: "" };
        newBidState.level = e.target.id;
        setBidState((prev) => newBidState);
    };

    const handleChangeColor = (e) => {
        let newBidState = { ...bidState, special: "" };
        newBidState.suit = e.currentTarget.id;
        setBidState((prev) => newBidState);
    };

    const handleChangeSpecial = (e) => {
        let newBidState = {
            level: "",
            suit: "",
            special: e.currentTarget.id,
        };
        setBidState((prev) => newBidState);
    };

    return (
        <VStack w="320px">
            <Heading h={12} display="flex" flexDirection="row" alignItems="center">
                {[bidState.level, bidState.special].join("")}
                {bidState.suit ? (
                    bidColor[bidState.suit].iconName === "NT" ? <Text color="blue.300">NT</Text>:
                    <Icon as={bidColor[bidState.suit].iconName} color={bidColor[bidState.suit].color} boxSize={7} mt={1}/>
                ) : null}
            </Heading>

            <HStack gap={3} w="100%">
                <Flex alignItems="center">
                    <Grid templateColumns="repeat(3, 1fr)" gap={1} mr={1}>
                        {bidLevel.slice(0, -1).map((item, idx) => (
                            <GridItem key={idx}>
                                <Button
                                    colorScheme="green"
                                    variant="outline"
                                    id={item}
                                    onClick={handleChangeLevel}
                                >
                                    {item}
                                </Button>
                            </GridItem>
                        ))}
                    </Grid>
                    <Button
                        id="7"
                        variant="outline"
                        colorScheme="green"
                        onClick={handleChangeLevel}
                    >
                        7
                    </Button>
                </Flex>
                <Flex alignItems="center">
                    <VStack>
                        <Grid templateColumns="repeat(2, 1fr)" gap={1} mr={1}>
                            {Object.values(bidColor)
                                .slice(0, -1)
                                .map((item, idx) => (
                                    <GridItem key={idx}>
                                        <IconButton
                                            variant="outline"
                                            colorScheme="green"
                                            icon={item.icon}
                                            color={item.color}
                                            id={item.id}
                                            onClick={handleChangeColor}
                                        />
                                    </GridItem>
                                ))}
                        </Grid>
                    </VStack>
                    <Button
                        id="NT"
                        variant="outline"
                        colorScheme="green"
                        onClick={handleChangeColor}
                    >
                        NT
                    </Button>
                </Flex>
            </HStack>
            <HStack justifyContent="space-between" w="100%">
                <HStack gap={1}>
                    {special.map((item, idx) => (
                        <Button
                            key={idx}
                            id={item}
                            onClick={handleChangeSpecial}
                        >
                            {item}
                        </Button>
                    ))}
                </HStack>
            </HStack>
        </VStack>
    );
};

export default BidSelector;
