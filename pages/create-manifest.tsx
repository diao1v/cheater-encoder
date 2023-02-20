import Stepper from '../src/components/Stepper'
import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import { getUserDefaultValues } from '../src/utils/supabase-database'
import type { formValuesType } from '../src/helpers/types'
import { getInitialFormValues } from '../src/helpers/default-values'

type PageProps = {
  user: User
  defaultFormValues: formValuesType
}

export default function CreateManifestPage({
  user,
  defaultFormValues,
}: PageProps) {
  return <Stepper userId={user.id} defaultFormValues={defaultFormValues} />
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

  let defaultFormValues: formValuesType

  const { data: userDefaultValues, error } = await getUserDefaultValues(
    supabase,
    session.user.id
  )

  if (error || !userDefaultValues[0]) {
    console.log(error)
    defaultFormValues = getInitialFormValues()
  } else {
    defaultFormValues = userDefaultValues[0]
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
      defaultFormValues,
    },
  }
}
