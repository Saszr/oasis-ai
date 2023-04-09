import { Flex, Box, Divider } from '@chakra-ui/react';

export default function Welcome() {
  return (
    <Flex justifyContent={'center'} alignItems="center" flex={1}>
      <Flex justifyContent={'center'} alignItems="center" gap={5}>
        Oasis AI
        <Box h="20px">
          <Divider orientation="vertical" borderColor={'gray.700'} />
        </Box>
        Only specific task pages are open.
      </Flex>
    </Flex>
  );
}
