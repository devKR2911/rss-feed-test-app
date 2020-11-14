import '../styles/global.css'
import {AppProps} from "next/app";
import Header from "../components/layout/header";

// Load bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'

// Load font awesome free icons
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

export default function App({Component, pageProps}: AppProps) {
    return <>
        <Header/>
        <Component {...pageProps} />
    </>
}
