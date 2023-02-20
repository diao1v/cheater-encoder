import React from 'react'
import { formValuesType } from '../../helpers/types'
import { useForm, UseFormReturnType } from '@mantine/form'
import {
  TextInput,
  NumberInput,
  Button,
  Group,
  Tooltip,
  SimpleGrid,
  Switch,
  Paper,
  Stack,
  Text,
  Select,
  Box,
} from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { defaultValuesPoster } from '../../utils/http-request'
import { showNotification, updateNotification } from '../../utils/notifications'
import { IconInfoCircle } from '@tabler/icons'

type Props = {
  userId: string
  defaultValues: formValuesType
}

const DefaultValuesForm: React.FC<Props> = ({ userId, defaultValues }) => {
  const {
    mutate: updateDefaultValuesToDatabase,
    error: updateDefaultValuesToDatabaseError,
    isLoading: updateDefaultValuesToDatabaseLoading,
    isSuccess: updateDefaultValuesToDatabaseSuccess,
  } = useMutation(defaultValuesPoster, {
    onSuccess: (data) => {
      updateNotification({
        id: 'update-default-values',
        type: 'success',
        title: 'Default Values Updated!',
        message: 'Default values updated successfully!',
      })
    },
    onError: (error) => {
      updateNotification({
        id: 'update-default-values',
        type: 'error',
        title: 'Error',
        message:
          'Something went wrong. Could not update default values. Please refresh the page and try again later.',
      })
      console.log(error)
    },
  })

  const form = useForm({
    initialValues: {
      ...defaultValues,
    },

    validate: {},
  })

  const formSubmissionHandler = (values: formValuesType) => {
    updateDefaultValuesToDatabase(values)
    showNotification({
      id: 'update-default-values',
      type: 'loading',
      title: 'Default Values Updating...',
      message: 'Updating default values...',
    })
  }

  return (
    <Paper shadow="xs" radius="xs" p="md" sx={{ width: '90%', margin: 'auto' }}>
      <form onSubmit={form.onSubmit((values) => formSubmissionHandler(values))}>
        <Stack spacing={10}>
          <TextInput
            withAsterisk
            label="Base URL"
            placeholder="Where the manifest locates"
            {...form.getInputProps('baseURL')}
          />
          <SimpleGrid
            cols={3}
            breakpoints={[{ maxWidth: 'md', cols: 2, spacing: 'sm' }]}
          >
            <TextInput
              label={
                <Tooltip
                  multiline
                  width={300}
                  position="top-start"
                  label="The base name for the video segments. Eg, for a series file AAA_1_video_1.mp4 ... AAA_1_video_30.mp4, the base name is AAA_1_video"
                >
                  <Group spacing={2}>
                    File Base Name
                    <IconInfoCircle size={14} />
                  </Group>
                </Tooltip>
              }
              {...form.getInputProps('fileBaseName')}
            />

            <NumberInput
              withAsterisk
              label="Live Duration (sec)"
              {...form.getInputProps('liveDuration')}
            />

            <NumberInput
              withAsterisk
              label="Manifest Update Time (sec)"
              {...form.getInputProps('minimumUpdatePeriod')}
            />

            <NumberInput
              withAsterisk
              precision={2}
              label="Buffer Time (sec)"
              {...form.getInputProps('minBufferTime')}
            />

            <NumberInput
              withAsterisk
              label="DVR Window (sec)"
              {...form.getInputProps('timeShiftBufferDepth')}
            />

            <NumberInput
              withAsterisk
              label="Presentation Delay (sec)"
              {...form.getInputProps('suggestedPresentationDelay')}
            />
            <NumberInput
              label={
                <Tooltip
                  multiline
                  width={300}
                  position="top-start"
                  label="This gives Period a start time after the Live to VoD conversion. The default of Period start time for Live and VoD is always 0"
                >
                  <Group spacing={2}>
                    VoD Period Start (sec)
                    <IconInfoCircle size={17} />
                  </Group>
                </Tooltip>
              }
              {...form.getInputProps('vodPeriodStart')}
            />
            <NumberInput
              withAsterisk
              label="Period Duration"
              {...form.getInputProps('periodDuration')}
            />

            <NumberInput
              withAsterisk
              label="Timescale"
              {...form.getInputProps('timescale')}
            />
            <NumberInput
              withAsterisk
              label="Presentation Time Offset"
              {...form.getInputProps('segmentPresentationTimeOffset')}
            />
            <Select
              label={
                <Tooltip
                  multiline
                  width={300}
                  position="top-start"
                  label="This gives Period a different PTO after the Live to VoD conversion. During live, PTO is the value set above. After conversion, the PTO will adjust to equal the first segment time.(make sure the first segment is algin to the Period start)"
                >
                  <Group spacing={2}>
                    PTO change after L2VOD
                    <IconInfoCircle size={17} />
                  </Group>
                </Tooltip>
              }
              data={[
                { value: false, label: 'Keep the PTO' },
                { value: true, label: 'Change the PTO' },
              ]}
              {...form.getInputProps('segmentPresentationTimeOffsetDiff')}
            />
            <NumberInput
              withAsterisk
              label="Segment Start Number"
              {...form.getInputProps('segmentStartNumber')}
            />
            <NumberInput
              withAsterisk
              label="First Segment Time (sec)"
              {...form.getInputProps('segmentStartTime')}
            />
            <NumberInput
              withAsterisk
              label="Segment Duration"
              {...form.getInputProps('segmentDuration')}
            />
          </SimpleGrid>
          <Group position="center" mt="md">
            <Button type="submit">Update the default settings</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}

export default DefaultValuesForm
