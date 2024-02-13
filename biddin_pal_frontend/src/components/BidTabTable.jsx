import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import BidTable from "./BidTable"

const BidTabTable = ({paths, handleChangeActiveComment}) => {

  console.log(paths);

  return (
    <Tabs defaultIndex={0}>
      <TabList>
      {paths.map((item, idx) => (
        <Tab key={idx}>{idx + 1}</Tab>
      ))}
    </TabList>
  
    <TabPanels>
      {paths.map((path, idx) => (
        <TabPanel key={idx}>
          <BidTable
            pathNumber = {idx}
            path = {path}
            handleChangeActiveComment ={handleChangeActiveComment}
          />
      </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
  );
};

export default BidTabTable;
