import Stepper from '../src/components/Stepper'
import { countManifestsInSupabase } from '../utils/superbase'

export default function Home() {
  return (
    <>
      <Stepper />
    </>
  )
}

export async function getServerSideProps() {
  const { count: manifestsCount, error } = await countManifestsInSupabase()

  if (error) {
    console.error(error)
    return {
      props: {
        manifestsCount: '???',
      },
    }
  }

  return {
    props: {
      manifestsCount,
    },
  }
}
