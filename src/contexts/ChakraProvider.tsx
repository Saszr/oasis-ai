import { ChakraProvider, localStorageManager } from '@chakra-ui/react';

import customTheme from '@/styles/theme';

interface ChakraProps {
  children: React.ReactNode;
}

const Chakra = ({ children }: ChakraProps) => {
  return (
    <ChakraProvider colorModeManager={localStorageManager} theme={customTheme}>
      {children}
    </ChakraProvider>
  );
};

export default Chakra;
