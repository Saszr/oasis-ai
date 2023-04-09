import { extendTheme } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';

import { styles } from './styles';
import { foundations } from './foundations';

const config: ThemeConfig = {
  initialColorMode: 'light',
};

const customTheme = extendTheme({
  ...foundations,
  styles,
  config,
});

export default customTheme;
