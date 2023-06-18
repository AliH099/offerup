import 'styles/globals.css';
import { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import createEmotionCache from 'helpers/emotionCache';
import theme from 'theme';
import { ToastContainer } from 'react-toastify';

export type NextPageWithLayout<T = any> = NextPage<T> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

interface AppProps extends NextAppProps {
    emotionCache?: EmotionCache;
    Component: NextPageWithLayout<any>;
}

export default function App(props: AppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div dir="rtl">{getLayout(<Component {...pageProps} />)}</div>
                <ToastContainer
                    autoClose={3000}
                    position="top-center"
                    hideProgressBar
                    closeButton={false}
                />
            </ThemeProvider>
        </CacheProvider>
    );
}
