import '../styles/global.css';
import { AppProps } from 'next/app';
import Header from '../components/layout/Header';

// Load bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// Load font awesome free icons
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import { ToastContainer } from 'react-nextjs-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer  align={'right'} position={'top'}/>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
