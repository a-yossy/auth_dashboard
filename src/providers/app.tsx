import { ReactNode, FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'src/libs/theme';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
