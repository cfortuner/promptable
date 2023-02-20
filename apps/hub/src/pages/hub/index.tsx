import { Text } from "@chakra-ui/react";

import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Wrap,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import ExampleCard from "components/ExampleCard";

export default function Home() {
  function handleSearch() {}

  const promptableIntro = "Upgrade your tools with AI";
  const promptableCTA = "Find Templates that simplify your work.";

  const examples: any[] = [
    {
      title: "Slack",
      img: "/slack.png",
      enabled: true,
      description: "Build a GPT-3 powered slack bot.",
    },
    { title: "Notion", img: "/notion.png", enabled: false },
    { title: "Google Sheets", img: "/google_sheets.png", enabled: false },
  ];

  const exampleCards = examples.map((example) => {
    return (
      <ExampleCard
        title={example.title}
        img={example.img}
        enabled={example.enabled}
        description={example.description || ""}
      />
    );
  });

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="left"
        padding="5"
        borderBottom="1px solid gray"
      >
        <Heading size="lg">Promptable Hub</Heading>
      </Flex>
      <Flex
        flexDirection={"column"}
        align="center"
        justify="center"
        gap={10}
        mt={20}
      >
        <Box>
          <Heading size="2xl" textAlign={"center"}>
            {promptableIntro}
          </Heading>
          <Heading mt="3" textAlign={"center"} fontWeight="light">
            {promptableCTA}
          </Heading>
        </Box>
        {/* <InputGroup size="lg" w="lg">
          <InputLeftElement cursor={"pointer"} children={<Search2Icon />} />
          <Input onChange={handleSearch} placeholder="Search examples" />
        </InputGroup> */}
        <SimpleGrid spacing="40px" columns={[1, null, 2]}>
          {exampleCards.map((c) => {
            return c;
          })}
        </SimpleGrid>
      </Flex>
    </>
  );
}
