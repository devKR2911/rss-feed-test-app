import '../styles/global.css'
import {AppProps} from "next/app";
import Header from "../components/layout/header";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App({Component, pageProps}: AppProps) {
    return <>
        <Header/>
        <Component {...pageProps} />
    </>
}
