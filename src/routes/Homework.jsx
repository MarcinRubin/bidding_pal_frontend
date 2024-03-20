import React from "react";
import { useState, useEffect } from "react";
import { Flex, Box, Spinner, Select } from "@chakra-ui/react";
import HomeworkItem from "../components/HomeworkItem";
import fetchData from "../customHooks/loaderFetch";
import { useLoaderData, useNavigation } from "react-router-dom";
import { client } from "../customHooks/axiosClient";

export async function loader() {
    const categories = await fetchData("api/deals/get_categories");
    return categories;
}

const Homework = () => {
    const categories = useLoaderData();
    const navigation = useNavigation();
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("none");

    console.log(category);

    const handleChangeCategory = async (e) =>{
          try {
            const response = await client.get(`api/deals?category=${e.target.value}`);
            setCategory(e.target.value);
            setData(response.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
    }

    if (navigation.state === "loading" || loading) {
        return (
            <Flex w="100%" justifyContent="center">
                <Spinner size="xl" color="green.600" />
            </Flex>
        );
    }

    return (
        <>
            <Select mb={4} placeholder="Wybierz kategorię" variant="green">
                {categories["categories"].map((item, idx) => (
                   <option key={idx} value={item} onClick={handleChangeCategory}>{item}</option>
                ))}
            </Select>
            <Flex
                gap={4}
                wrap="wrap"
                justifyContent="space-around"
                alignItems="center"
                flexDirection="row"
                w="100%"
            >
                {data?.map((item, idx) => (
                    <HomeworkItem key={idx} deal={item} />
                ))}
            </Flex>
        </>
    );
};

export default Homework;
