import {
  Flex,
  Heading,
  Divider,
  VStack,
  Box,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { CodeBlock, dracula } from "react-code-blocks";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const paths = ["Slack", "Notion", "Google Sheets"].map((example) => {
    return {
      params: { example: example },
    };
  });

  return {
    paths,
    fallback: false, // TODO: change to whatever hub ends up being
  };
}

export async function getStaticProps({
  params,
}: {
  params: { example: string };
}) {
  const { example } = params;

  return {
    props: { example },
  };
}

export default function Example({ example }: { example: string }) {
  const router = useRouter();

  function handleGitHubLink(example: string) {}

  function handleBack() {
    router.push("/hub");
  }

  // Need to figure out how to center promptable text in header, viewport won't cooperate with current header structure.
  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="5"
        borderBottom="1px solid gray"
      >
        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          onClick={handleBack}
        />
        <Flex justify="center" ml="20" w="100%">
          <Heading size="xl">Promptable</Heading>
        </Flex>
        <Button
          variant="outline"
          onClick={() => {
            handleGitHubLink(example);
          }}
          size="lg"
        >
          GitHub Link
        </Button>
      </Flex>

      <VStack align="left" mb="0" m="10" spacing="10">
        <Box>
          <Heading size="lg" ml="1">
            {example + " Loader"}
          </Heading>
          <Divider />
          <Text mt="3" ml="1" fontSize="lg">
            Text about the loader....
          </Text>
        </Box>
        <Box>
          <Heading size="lg" ml="1">
            Usage
          </Heading>
          <Divider />
          <Text mt="3" ml="1" fontSize="lg">
            Relevant text about the usage....
          </Text>
          <Flex align="center" justify="center">
            <Box w="xl" mt="3" ml="1" bg="#EAEAEA" p="2" borderRadius={"md"}>
              <CodeBlock
                text={
                  "const add = (x,y) => x+y;\nconst add = (x,y) => x+y;\nconst add = (x,y) => x+y;const add = (x,y) => x+y;\nconst add = (x,y) => x+y;\nconst add = (x,y) => x+y;"
                }
                language="typescript"
                theme={dracula}
              />
              <Flex align="center" justify="center">
                <Button mt="3" colorScheme="purple">
                  Deploy
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </>
  );
}
