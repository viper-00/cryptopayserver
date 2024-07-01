import { CssBaseline } from '@mui/material';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
// import { ThemeProvider } from 'styled-components';
import ErrorBoundary from '../ErrorBoundary';
const Web3Provider = dynamic(() => import('./Web3Provider'));

// const ChakraConfig = {
//   initialColorMode: 'light',
//   useSystemColorMode: true,
// };

// const theme = extendTheme({ ChakraConfig });

// Create a theme instance.
// export const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//   },
//   typography: {
//     fontFamily: roboto.style.fontFamily,
//   },
// });

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary>
      <Web3Provider>
        {/* <ChakraProvider resetCSS theme={theme}>
          {children}
        </ChakraProvider> */}
        {/* <ThemeProvider> */}
          <CssBaseline />
          {children}
        {/* </ThemeProvider> */}
      </Web3Provider>
    </ErrorBoundary>
  );
};

export default Providers;
