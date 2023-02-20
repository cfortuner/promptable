import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function ExampleCard({
  title,
  img,
  enabled,
  description = "",
}: {
  title: string;
  img: string;
  enabled: boolean;
  description: string;
}) {
  const router = useRouter();

  function handleExampleRedirect(exampleName: string) {
    if (!enabled) {
      return;
    }

    router.push(`/hub/${exampleName}`);
  }

  return (
    <Box key={title}>
      <Card
        w="sm"
        variant="outline"
        cursor={"pointer"}
        direction="row"
        onClick={() => handleExampleRedirect(title)}
        background={!enabled ? "#F8F8F8" : undefined}
        _hover={{ bg: !enabled ? undefined : "#F8F8F8" }}
      >
        {!enabled && (
          <Badge
            variant="outline"
            colorScheme="green"
            position="absolute"
            h={"fit-content"}
            right={2}
            top={2}
          >
            Coming Soon!
          </Badge>
        )}
        <Image src={img} h="64px" w="64px" m="2" mr="0" />
        <CardBody>
          <Flex alignItems="left" height="100%" flexDirection={"column"}>
            <Heading size="lg">{title}</Heading>
            <Text>{description}</Text>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
}
