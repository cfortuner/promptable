import React from "react";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import ExampleCard from "components/ExampleCard";

export default function Home() {
  function handleSearch() {}

  const promptableIntro = "Discover how to implement features in Promptable!";
  const promptableCTA = "Select an example to see how to easy it is to build.";

  const examples: any[] = [
    { title: "Slack", img: "/slack.png" },
    { title: "Notion", img: "/notion.png" },
    { title: "Google Sheets", img: "/google_sheets.png" },
  ];

  const exampleCards = examples.map((example) => {
    return <ExampleCard title={example.title} img={example.img} />;
  });

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="5"
        borderBottom="1px solid gray"
      >
        <Heading size="lg">Promptable Hub</Heading>
        <InputGroup ml="5" size="lg" w="lg">
          <InputLeftElement cursor={"pointer"} children={<Search2Icon />} />
          <Input onChange={handleSearch} placeholder="Search examples" />
        </InputGroup>
      </Flex>
      <Heading size="lg" mt="5" textAlign={"center"}>
        {promptableIntro}
      </Heading>
      <Heading size="md" mt="3" textAlign={"center"}>
        {promptableCTA}
      </Heading>
      <Flex align="center" justify="center">
        <Wrap spacing="10px" justify="left" mt="7">
          {exampleCards}
        </Wrap>
      </Flex>
    </>
  );
}
