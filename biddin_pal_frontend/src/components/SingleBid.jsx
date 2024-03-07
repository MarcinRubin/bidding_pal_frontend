import { Text, Icon } from '@chakra-ui/react'
import React from 'react'
import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill } from "react-icons/bs";

const SingleBid = ({children}) => {
    const bidMapping = {
        "h": {
            "icon": BsSuitHeartFill,
            "color": "red"
        },
        "s": {
            "icon": BsSuitSpadeFill,
            "color": "black"
        },
        "d": {
            "icon": BsSuitDiamondFill,
            "color": "red"
        },
        "c": {
            "icon": BsSuitClubFill,
            "color": "black"
        },
    }

    const renderBid = (bid) => {
        
        if (bid.includes("nt")){
            bid = bid.replace("nt", "")
            return(
                <Text>
                    {bid}<Text as="span" color="blue.500">NT</Text>
                </Text>
            )
        }

        if (bid === "pass" || bid === "?"){
            return(
                <Text as="span">
                    {bid}
                </Text>
            )
        }
        
        
        for (let suit of Object.keys(bidMapping)){
            if( bid.includes(suit) ){
                bid = bid.replace(suit, "");
                return(
                    <Text as="span">
                        {bid}<Icon as={bidMapping[suit].icon} color={bidMapping[suit].color}/>
                    </Text>
                )
            }
        }
    }
    

    return (
    <>
        {children ? renderBid(children) : ""}
    </>
  )
}

export default SingleBid

//<Icon as={suits[idx].icon}>