import '../styles/globals.css'
import '../styles/preflight.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider, AppShell } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import Footer from '../src/components/Footer/'
import Header from '../src/components/Header/'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModalsProvider } from '@mantine/modals'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps,
}: AppProps<{
  manifestsCount: number
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

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
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <ModalsProvider>
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
          </ModalsProvider>
        </SessionContextProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
