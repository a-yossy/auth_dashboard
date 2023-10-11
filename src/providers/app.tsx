import { ReactNode, FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'src/libs/theme';
import { AuthProvider } from 'src/context/AuthContext';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => (
  <AuthProvider>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </AuthProvider>
);
