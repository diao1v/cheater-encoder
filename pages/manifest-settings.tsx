import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import type { FetchedDefaultValuesType } from '../src/helper/types'
import { getUserDefaultValues } from '../src/utils/supabase-database'
import DefaultValuesForm from '../src/components/DefaultValuesForm'
import { Text, Stack, Title } from '@mantine/core'

type PageProps = {
  user: User
  defaultValues: FetchedDefaultValuesType
  error?: string
}

export default function ManifestSettingsPage({
  user,
  defaultValues,
  error,
}: PageProps) {
  return (
    <Stack
      my={20}
      sx={{
        textAlign: 'center',
      }}
    >
      <Title
        order={3}
        size={25}
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue', deg: 60 }}
      >
        Default Manifest Settings
      </Title>
      <Text size={15}>
        These settings will be used as default values for your manifests:
      </Text>
      {error ? (
        <Text size={20}>{error}</Text>
      ) : (
        <DefaultValuesForm userId={user.id} defaultValues={defaultValues} />
      )}
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

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  const { data: userDefaultValues, error } = await getUserDefaultValues(
    supabase,
    session.user.id
  )

  if (error || !userDefaultValues[0]) {
    return {
      props: {
        initialSession: session,
        user: session.user,
        error: error?.message || 'No default values found, please try again',
      },
    }
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
      defaultValues: userDefaultValues[0],
    },
  }
}
