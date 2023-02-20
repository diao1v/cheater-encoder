import React from 'react'
import { Prism as MantinePrism } from '@mantine/prism'
import { useFormStore } from '../../store/form-store'
import { manifestValuesType } from '@helpers/types'
import {
  createDefaultLiveManifestContent,
  createDefaultVodManifestContent,
} from '@helpers/manifest-template'

type Props = {
  eventType: 'live' | 'vod' | 'live-to-vod'
  manifestId: string
}

const Prism: React.FC<Props> = ({ eventType, manifestId }) => {
  const formValues = useFormStore().formValues

  const manifestValues: manifestValuesType = {
    userId: '',
    manifestId,
    eventType,
    manifestType: eventType === 'vod' ? 'static' : 'dynamic',
    availabilityStartTime:
      'This is a time your player call the manifest the first time',
    mediaPresentationDuration: 0,
    segmentTimelineRepeat: 0,
    playStarted: false,
    liveToVod: false,
    ...formValues,
  }

  if (eventType === 'vod') {
    manifestValues.segmentTimelineRepeat =
      Math.floor(
        manifestValues.periodDuration /
          (manifestValues.segmentDuration / manifestValues.timescale)
      ) - 1
  }

  const currentTimeValueInTemplate = '2021-05-01T00:00:00.000Z'

  const manifestContent =
    eventType === 'vod'
      ? createDefaultVodManifestContent(
          manifestValues,
          currentTimeValueInTemplate
        )
      : createDefaultLiveManifestContent(
          manifestValues,
          currentTimeValueInTemplate
        )

  return (
    <MantinePrism colorScheme="dark" language="markup" noCopy>
      {manifestContent}
    </MantinePrism>
  )
}

export default Prism
