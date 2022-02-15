import { Box, VStack, Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";

import Login from "../../components/Login";

export const Home = () => (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" p={1}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <VStack spacing={8}>
        <Login />
      </VStack>
    </Grid>
  </Box>
);
