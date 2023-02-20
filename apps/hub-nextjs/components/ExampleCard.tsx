import {
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function ExampleCard({
  title,
  img,
}: {
  title: string;
  img: string;
}) {
  const router = useRouter();

  function handleExampleRedirect(exampleName: string) {
    router.push(`/hub/${exampleName}`);
  }

  return (
    <WrapItem key={title}>
      <Card
        w="sm"
        variant="outline"
        cursor={"pointer"}
        direction="row"
        onClick={() => handleExampleRedirect(title)}
        _hover={{ bg: "#F8F8F8" }}
      >
        <Image src={img} h="64px" w="64px" m="2" mr="0" />
        <CardBody>
          <Flex alignItems="center" height="100%">
            <Heading size="lg">{title}</Heading>
          </Flex>
        </CardBody>
      </Card>
    </WrapItem>
  );
}
