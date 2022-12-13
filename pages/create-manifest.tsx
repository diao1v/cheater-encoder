import Stepper from '../src/components/Stepper'
import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import { getUserDefaultValues } from '../src/utils/supabase-database'
import type { DefaultValuesType } from '../src/helper/types'
import { getInitialManifestDefaultValues } from '../src/helper/default-values'

type PageProps = {
  user: User
  defaultValues: DefaultValuesType
}

export default function CreateManifestPage({ user, defaultValues }: PageProps) {
  return <Stepper userId={user.id} defaultValues={defaultValues} />
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

  let defaultValues: DefaultValuesType = getInitialManifestDefaultValues()

  if (error) {
    console.log(error)
  }

  if (userDefaultValues[0]) {
    defaultValues = {
      ...defaultValues,
      ...userDefaultValues[0],
    }
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
      defaultValues,
    },
  }
}
