import React, { useState, useEffect, useRef } from 'react'
import {
  Stepper as MantineStepper,
  Button,
  Group,
  Box,
  Stack,
  SimpleGrid,
} from '@mantine/core'
import { v4 as uuidv4 } from 'uuid'
import DashForm from '@components/DashForm'
import ManifestTypeSwitcher from '../ManifestTypeSwitcher'
import ManifestLinkDisplay from '../ManifestLinkDisplay'
import type { formValuesType } from '@helpers/types'
import Prism from '@components/Prism'

type Props = {
  userId: string
  defaultFormValues: formValuesType
}

const Stepper: React.FC<Props> = ({ userId, defaultFormValues }) => {
  const [step, setStep] = useState<number>(1)
  const [eventType, setEventType] = useState<'live' | 'vod' | 'live-to-vod'>(
    'live-to-vod'
  )
  const [protocalType, setProtocalType] = useState<'dash' | 'hls'>('dash')
  const [manifestId, setManifestId] = React.useState('')
  const [formSubmited, setFormSubmited] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined' && !manifestId) {
      setManifestId(uuidv4())
    }
  }, [manifestId])

  const submitRef = useRef<HTMLInputElement>()

  const nextStep = () => {
    if (step === 1 && submitRef.current) {
      submitRef.current.click()
    }
    setStep((current) => (current < 2 ? current + 1 : current))
  }
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current))

  return (
    <Box
      sx={{ width: '100%', height: '100%', margin: 'auto', marginY: '4rem' }}
    >
      <Stack justify="space-between" sx={{ height: '100%' }}>
        <MantineStepper active={step} onStepClick={setStep} breakpoint="sm">
          <MantineStepper.Step label="Choose Type" description="Type of event">
            <Group position="center" sx={{ height: '400px' }}>
              <ManifestTypeSwitcher
                protocalType={protocalType}
                setProtocalType={setProtocalType}
                eventType={eventType}
                setEventType={setEventType}
              />
            </Group>
          </MantineStepper.Step>
          <MantineStepper.Step
            label="Generate Manifest"
            description="Input manifest parameters"
          >
            <SimpleGrid
              cols={2}
              spacing="sm"
              breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}
            >
              <Prism eventType={eventType} manifestId={manifestId} />
              {protocalType === 'dash' ? (
                <DashForm
                  userId={userId}
                  defaultFormValues={defaultFormValues}
                  eventType={eventType}
                  manifestId={manifestId}
                  submitRef={submitRef}
                  formSubmited={formSubmited}
                  setFormSubmited={setFormSubmited}
                />
              ) : (
                <div>hls</div>
              )}
            </SimpleGrid>
          </MantineStepper.Step>
          <MantineStepper.Step
            label="Generate Manifest"
            description="Get manifest link"
          >
            <Group position="center">
              <ManifestLinkDisplay
                manifestId={manifestId}
                eventType={eventType}
              />
            </Group>
          </MantineStepper.Step>
        </MantineStepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep} disabled={step === 0}>
            Back
          </Button>
          <Button onClick={nextStep} disabled={step === 2 || !eventType}>
            Next step
          </Button>
        </Group>
      </Stack>
    </Box>
  )
}

export default Stepper
