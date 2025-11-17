import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <Component {...pageProps} />
      </PrimeReactProvider>
    </Provider>
  );
}
