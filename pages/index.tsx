import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Box, Title, Stack, Text } from '@mantine/core'

export default function Home() {
  return (
    <Stack spacing="sm" sx={{ height: '100%' }}>
      <Box sx={{ marginTop: '5vh', textAlign: 'center', padding:'10rem'}}>
        <Title
          order={1}
          size={50}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          Cheater Encoder
        </Title>
        <Text
          size={20}
          variant="gradient"
          gradient={{ from: '#845EF7', to: '#FD7E14', deg: 120 }}
        >
          The Cheater Encoder is a tool that enables users to create
          and customize online stream manifests. It simulates the functionality
          of an encoder, allowing users to set values for their manifests, as
          well as generate Live to VoD conversion manifests. This tool provides
          a convenient and user-friendly way for users to mock, manage and organize their online streaming content.
        </Text>
      </Box>
    </Stack>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return {
    props: {
      initialSession: session,
    },
  }
}
