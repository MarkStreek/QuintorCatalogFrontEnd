import React from 'react';
import { NextUIProvider } from '@nextui-org/react'; // Import NextUIProvider
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
