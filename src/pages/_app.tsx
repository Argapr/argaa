import { AppProps } from "next/app";
import { ThemeProvider } from "@/context/ThemeContext";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Head>
                <title>Blog Arga</title>
                <meta name="description" content="Deskripsi website Anda" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
