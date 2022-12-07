import React from 'react'
import { Text, Footer as MantineFooter, Group, Stack } from '@mantine/core'
import { IconHeart, IconLoader } from '@tabler/icons'
import { useManifestCount } from '../../hooks/useManifestCount'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../../../db_types'



type Props = {}

const Footer: React.FC<Props> = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const { data, error, isFetching } = useManifestCount(supabaseClient)

  const manifestCount = isFetching ? (
    <IconLoader />
  ) : error ? (
    '???'
  ) : (
    data?.count
  )
  return (
    <MantineFooter height={70} p="xs">
      <Group position="center" spacing="xl">
        <Stack spacing={0}>
          <Group position="center" spacing={1}>
            Made by Yiwei, by accident, with&nbsp;
            <IconHeart size={16} color="red" fill="red" />
          </Group>
          <Group position="center" spacing={5}>
            Total manifests has been created so far:
            <Text
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              weight={700}
            >
              {manifestCount}
            </Text>
          </Group>
        </Stack>
      </Group>
    </MantineFooter>
  )
}

export default Footer
