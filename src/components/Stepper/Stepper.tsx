import React, { useState } from 'react'
import {
  Stepper as MantineStepper,
  Button,
  Group,
  Box,
  Stack,
} from '@mantine/core'
import { VideoTypeSwitcher, Form } from '../Form'

const Stepper: React.FC = () => {
  const [manifestType, setManifestType] = useState('live')
  const [active, setActive] = useState(1)
  const nextStep = () =>
    setActive((current) => (current < 1 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  return (
    <Box sx={{ width: '90%', height: '100%', margin: 'auto', marginY: '2rem' }}>
      <Stack justify="space-between" sx={{ height: '100%' }}>
        <MantineStepper active={active} onStepClick={setActive} breakpoint="sm">
          <MantineStepper.Step
            label="Choose Type"
            description="Type of manifest"
          >
            <Group position="center" sx={{ height: '400px' }}>
              <VideoTypeSwitcher
                manifestType={manifestType}
                setManifestType={setManifestType}
              />
            </Group>
          </MantineStepper.Step>
          <MantineStepper.Step
            label="Generate Manifest"
            description="Get manifest link"
          >
            <Group position="center">
              <Form manifestType={manifestType} />
            </Group>
          </MantineStepper.Step>
        </MantineStepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep} disabled={active === 0}>
            Back
          </Button>
          <Button onClick={nextStep} disabled={active === 1 && !manifestType}>
            Next step
          </Button>
        </Group>
      </Stack>
    </Box>
  )
}

export default Stepper
