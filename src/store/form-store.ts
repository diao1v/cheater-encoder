import { create } from 'zustand'
import { formValuesType } from '../helpers/types'

interface formStoreType {
  formValues: formValuesType
  setFormValues: (formValues: formValuesType) => void
}

export const useFormStore = create<formStoreType>((set) => ({
  formValues: {} as formValuesType,
  setFormValues: (formValues: formValuesType) => set({ formValues }),
}))
