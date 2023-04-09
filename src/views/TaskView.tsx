import { Flex, Image } from '@chakra-ui/react';

import { LoginWeb3Button } from '@/components';
import AutoCreateContract from './AutoCreateContract';

export default function TaskView() {
  return (
    <>
      <Flex
        as="header"
        width="full"
        align="center"
        pos="sticky"
        top={0}
        py={3}
        px={5}
        zIndex="1"
        justifyContent={'space-between'}
      >
        <Image
          src={'/images/bridge/connect_wallet_title.webp'}
          alt=""
          maxW="100px"
        />

        <LoginWeb3Button width="200px" />
      </Flex>

      <Flex
        as="main"
        direction="column"
        alignItems="center"
        minH="full"
        px="6"
        flex={1}
      >
        <AutoCreateContract />
      </Flex>
    </>
  );
}
