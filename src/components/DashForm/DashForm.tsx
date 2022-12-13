import React, { useEffect } from 'react'
import DashFormSection from './DashFormSection'
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
} from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons'
import { formValuesType, manifestValuesType } from '../../helper/types'
import {
  manifestCreationPoster,
  manifestUpdatePutor,
} from '../../utils/http-request'
import { useMutation } from '@tanstack/react-query'
import type { DefaultValuesType } from '../../helper/types'
import { showNotification, updateNotification } from '../../utils/notifications'

type Props = {
  userId: string
  defaultValues: DefaultValuesType
  eventType: 'live' | 'vod' | 'live-to-vod'
  manifestId: string
  submitRef: React.MutableRefObject<any>
  formSubmited: boolean
  setFormSubmited: React.Dispatch<React.SetStateAction<boolean>>
}

const DashForm: React.FC<Props> = ({
  userId,
  defaultValues,
  eventType,
  manifestId,
  submitRef,
  setFormSubmited,
  formSubmited,
}) => {
  const {
    mutate: saveManifestValuesToDatabase,
    error: saveManifestValuesToDatabaseError,
    isLoading: saveManifestValuesToDatabaseLoading,
    isSuccess: saveManifestValuesToDatabaseSuccess,
  } = useMutation(manifestCreationPoster, {
    onSuccess: (data) => {
      updateNotification({
        id: 'create-manifest',
        type: 'success',
        title: 'Manifest Created!',
        message: 'Manifest created successfully!',
      })
      console.log(data)
    },
    onError: (error) => {
      updateNotification({
        id: 'create-manifest',
        type: 'error',
        title: 'Error',
        message:
          'Something went wrong. Could not create the manifest. Please refresh the page and try again later.',
      })
      console.log(error)
    },
  })

  const {
    mutate: updateManifestValuesToDatabase,
    error: updateManifestValuesToDatabaseError,
    isLoading: updateManifestValuesToDatabaseLoading,
    isSuccess: updateManifestValuesToDatabaseSuccess,
  } = useMutation(manifestUpdatePutor, {
    onSuccess: (data) => {
      console.log(data)
      updateNotification({
        id: 'update-manifest',
        type: 'success',
        title: 'Manifest Updated!',
        message: 'Manifest updated successfully!',
      })
    },
    onError: (error) => {
      updateNotification({
        id: 'update-manifest',
        type: 'error',
        title: 'Error',
        message:
          'Something went wrong. Could not update the manifest.'
      })
      console.log(error)
    },
  })

  const defaultManifestValues = defaultValues

  const formSubmissionHandler = (formValues: formValuesType) => {
    const manifestValues: manifestValuesType = {
      userId,
      manifestId,
      eventType,
      manifestType: eventType === 'vod' ? 'static' : 'dynamic',
      ...defaultManifestValues,
      ...formValues,
    }

    if (formSubmited === false) {
      saveManifestValuesToDatabase(manifestValues)
      showNotification({
        id: 'create-manifest',
        type: 'loading',
        title: 'Create Manifest',
        message: 'Creating manifest. Please wait...',
      })
      setFormSubmited(true)
      return
    }
    if (formSubmited === true) {
      // update the stored manifest values
      updateManifestValuesToDatabase(manifestValues)
      showNotification({
        id: 'update-manifest',
        type: 'loading',
        title: 'Update Manifest',
        message: 'Updating manifest. Please wait...',
      })
      return
    }
  }

  const form = useForm({
    initialValues: {
      ...defaultManifestValues,
    },

    validate: {},
  })

  return (
    <Paper shadow="xs" radius="xs" p="md" sx={{ width: '90%', margin: 'auto' }}>
      <form onSubmit={form.onSubmit((values) => formSubmissionHandler(values))}>
        <DashFormSection title={'Required Section'}>
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
              {eventType !== 'vod' && (
                <NumberInput
                  withAsterisk
                  label="Live Duration (sec)"
                  {...form.getInputProps('liveDuration')}
                />
              )}
              {eventType !== 'vod' && (
                <NumberInput
                  withAsterisk
                  label="Manifest Update Time (sec)"
                  {...form.getInputProps('minimumUpdatePeriod')}
                />
              )}
              <NumberInput
                withAsterisk
                precision={2}
                label="Buffer Time (sec)"
                {...form.getInputProps('minBufferTime')}
              />
              {eventType !== 'vod' && (
                <NumberInput
                  withAsterisk
                  label="DVR Window (sec)"
                  {...form.getInputProps('timeShiftBufferDepth')}
                />
              )}
              {eventType !== 'vod' && (
                <NumberInput
                  withAsterisk
                  label="Presentation Delay (sec)"
                  {...form.getInputProps('suggestedPresentationDelay')}
                />
              )}
              {eventType === 'vod' && (
                <NumberInput
                  withAsterisk
                  label="Period Duration"
                  {...form.getInputProps('periodDuration')}
                />
              )}
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
                label="First Segment Time (sec)"
                {...form.getInputProps('segmentStartTime')}
              />
              <NumberInput
                withAsterisk
                label="Segment Duration"
                {...form.getInputProps('segmentDuration')}
              />
            </SimpleGrid>
          </Stack>
        </DashFormSection>
        {eventType === 'live-to-vod' && (
          <DashFormSection title={'Optional Section'}>
            <SimpleGrid
              cols={3}
              breakpoints={[{ maxWidth: 'md', cols: 2, spacing: 'sm' }]}
            >
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
              {/* <NumberInput
                label={
                  <Tooltip
                    multiline
                    width={300}
                    position="top-start"
                    label="This gives Period a different PTO after the Live to VoD conversion. During live, PTO is the value set above. After conversion, the PTO will adjust to equal the first segment time.(make sure the first segment is algin to the Period start)"
                  >
                    <Group spacing={2}>
                      PTO (If Live to Vod Diff)
                      <IconInfoCircle size={17} />
                    </Group>
                  </Tooltip>
                }
                {...form.getInputProps('segmentPresentationTimeOffsetDiff')}
              /> */}

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
            </SimpleGrid>
          </DashFormSection>
        )}
        <Group position="right" mt="md">
          <Button ref={submitRef} type="submit" style={{ display: 'none' }}>
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  )
}

export default DashForm
