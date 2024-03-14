import React from 'react';
import { NextUIProvider } from '@nextui-org/react'; // Import NextUIProvider
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  // Wrap the Component with NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
