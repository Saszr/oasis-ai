import { useEffect, useState } from 'react';
import { Button, Box, useColorMode } from '@chakra-ui/react';
import { useWeb3Modal, useWeb3ModalTheme } from '@web3modal/react';
import { useAccount } from 'wagmi';

const LoginWeb3Button = ({ width = '400px' }: { width?: string }) => {
  const account = useAccount();
  const { open } = useWeb3Modal();
  const { colorMode } = useColorMode();
  const { setTheme } = useWeb3ModalTheme();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setTheme({
      themeMode: colorMode,
      themeColor: 'purple',
      themeBackground: 'gradient',
    });
  }, [colorMode, setTheme]);

  useEffect(() => {
    setIsConnected(account.isConnected);
  }, [account.isConnected]);

  return (
    <Box w={width}>
      {isConnected ? (
        <Button
          py="26px"
          fontSize="xl"
          w="full"
          variant={'outline'}
          onClick={() => open()}
          color="#C7B6FF"
          borderRadius="lg"
          borderColor={'#fff'}
          _hover={{
            opacity: 0.7,
          }}
        >
          {account.address &&
            `${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
        </Button>
      ) : (
        <Button
          py="26px"
          fontSize="xl"
          w="full"
          onClick={() => open()}
          color="#C7B6FF"
          borderRadius="lg"
          backgroundColor="#fff"
        >
          Connect wallet
        </Button>
      )}
    </Box>
  );
};

export default LoginWeb3Button;
