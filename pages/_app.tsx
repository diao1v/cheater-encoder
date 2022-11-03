import '../styles/globals.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider, AppShell } from '@mantine/core'
import Footer from '../src/components/Footer/'
import Header from '../src/components/Header/'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Chater Encoder</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <AppShell
          padding="md"
          header={<Header />}
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
          fixed
          footer={<Footer />}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </>
  )
}
