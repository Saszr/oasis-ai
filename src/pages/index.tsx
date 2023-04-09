import Head from 'next/head';
import { Flex, Image } from '@chakra-ui/react';

import { LoginWeb3Button } from '@/components';
import { AutoCreateContract } from '@/views';

export default function CreateContract() {
  return (
    <>
      <Head>
        <title>Oasis - Create Contract By AI</title>
        <meta name="description" content="Oasis Web3 Connect" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" margin="0 auto" minH="full" bg="gray.50">
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
      </Flex>
    </>
  );
}
