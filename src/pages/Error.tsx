import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link, useRouteError } from "react-router-dom";
import Home from "./Home";

export default function ErrorPage() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Heading>Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>
        <i>{error.statusText || error.message}</i>
      </Text>
      <Button bg="green.300" color="white" my={4}><Link to="..">Go to Home</Link></Button>
    </Flex>
  );
}