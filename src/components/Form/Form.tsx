import React, { useEffect } from 'react'
import { Paper, Stack } from '@mantine/core'
import FormSection from './FormSection'
import { useForm, UseFormReturnType } from '@mantine/form'
import {
  TextInput,
  NumberInput,
  Button,
  Group,
  Box,
  SimpleGrid,
} from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { IconClock } from '@tabler/icons'
import { v4 as uuidv4 } from 'uuid'
import { defaultValues } from '../../../helper/default-values'
import { formInitialValues } from '../../../helper/types'
import { poster } from '../../../helper/http-request'
import { useMutation } from '@tanstack/react-query'

type Props = {
  manifestType: string
}

const Form: React.FC<Props> = ({ manifestType }) => {
  const [manifestId, setManifestId] = React.useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setManifestId(uuidv4())
    }
  }, [])

  const {
    mutate: createInitialManifest,
    error,
    isLoading,
    isSuccess,
  } = useMutation(poster, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const formSubmissionHandler = (values: formInitialValues) => {
    const formValues = {
      manifestId,
      menifestType: manifestType === 'vod' ? 'static' : 'dynamic',
      ...values,
      availabilityStartTime: values.availabilityStartTime.toISOString(),
      ...defaultValues,
    }
    createInitialManifest(formValues)
  }

  const form = useForm({
    initialValues: {
      baseURL: '',
      availabilityStartTime: new Date(),
      minimumUpdatePeriod: 16,
      minBufferTime: 4.16,
      timeShiftBufferDepth: 0,
      suggestedPresentationDelay: 32,
      periodStart: 0,
      timescale: 12288,
      segmentPresentationTimeOffset: 0,
      segmentPresentationTimeOffsetDiff: null,
      segmentStartNumber: 1,
      segmentStartTime: 0,
      segmentDuration: 24576,
    },

    validate: {},
  })

  return (
    <Paper shadow="xs" radius="xs" p="md" sx={{ width: '90%', margin: 'auto' }}>
      <form onSubmit={form.onSubmit((values) => formSubmissionHandler(values))}>
        <FormSection title={'Required Section'}>
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
              {manifestType !== 'vod' && (
                <TimeInput
                  withAsterisk
                  icon={<IconClock size={16} />}
                  label="Live start time"
                  withSeconds
                  {...form.getInputProps('availabilityStartTime')}
                />
              )}
              {manifestType !== 'vod' && (
                <NumberInput
                  withAsterisk
                  label="Update Period (sec)"
                  {...form.getInputProps('minimumUpdatePeriod')}
                />
              )}
              <NumberInput
                withAsterisk
                precision={2}
                label="Buffer Time (sec)"
                {...form.getInputProps('minBufferTime')}
              />
              {manifestType !== 'vod' && (
                <NumberInput
                  withAsterisk
                  label="DVR Window (sec)"
                  {...form.getInputProps('timeShiftBufferDepth')}
                />
              )}
              {manifestType !== 'vod' && (
                <NumberInput
                  withAsterisk
                  label="Presentation Delay (sec)"
                  {...form.getInputProps('suggestedPresentationDelay')}
                />
              )}
              <NumberInput
                withAsterisk
                label="Period Start (sec)"
                {...form.getInputProps('periodStart')}
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
              <NumberInput
                withAsterisk
                label="Segment Start Number"
                {...form.getInputProps('segmentStartNumber')}
              />
              <NumberInput
                withAsterisk
                label="Segment Time (sec)"
                {...form.getInputProps('segmentStartTime')}
              />
              <NumberInput
                withAsterisk
                label="Segment Duration"
                {...form.getInputProps('segmentDuration')}
              />
            </SimpleGrid>
          </Stack>
        </FormSection>
        {manifestType !== 'vod' && (
          <FormSection title={'Optional Section'}>
            <SimpleGrid
              cols={3}
              breakpoints={[{ maxWidth: 'md', cols: 2, spacing: 'sm' }]}
            >
              <NumberInput
                label="PTO (If Live to Vod Diff)"
                {...form.getInputProps('segmentPresentationTimeOffsetDiff')}
              />
            </SimpleGrid>
          </FormSection>
        )}
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Paper>
  )
}

export default Form
