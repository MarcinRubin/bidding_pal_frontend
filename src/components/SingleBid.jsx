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
                <Text as="span">
                    {bid}<Text as="span" color="blue.500">NT</Text>
                </Text>
            )
        }

        if (["pas", "?", "x", "xx"].includes(bid)){
            return(
                <Text as="span">
                    {bid.toUpperCase()}
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