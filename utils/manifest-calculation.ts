import { manifestValuesType } from "../helper/types"

export const calculateNewManifestValues = (
  manifestValues: manifestValuesType,
  currentTime: string
) => {
  return {
    ...manifestValues,
  }
}
