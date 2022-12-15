import 'src/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux'
import store from 'src/redux/store'

export const themeOptions: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => `
      div#__next {
        background-color: #d3e0ea6e;
        min-height: 100vh;
      }
      `,
    },
  },
  palette: {
    primary: {
      main: '#276678',
    },
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={createTheme(themeOptions)}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp;
