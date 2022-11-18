import '../styles/globals.css'
import '../styles/preflight.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider, AppShell } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import Footer from '../src/components/Footer/'
import Header from '../src/components/Header/'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <QueryClientProvider client={queryClient}>
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
        <NotificationsProvider>
          <AppShell
            padding="md"
            header={<Header />}
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[1],
              },
            })}
            fixed
            footer={<Footer manifestsCount={pageProps.manifestsCount} />}
          >
            <Component {...pageProps} />
          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
