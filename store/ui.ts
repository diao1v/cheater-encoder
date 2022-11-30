import create from 'zustand'

type ModalState = {
  isModalOpen: boolean
  setModalOpened: () => void
  setModalClosed: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: true,
  setModalOpened: () => set({ isModalOpen: true }),
  setModalClosed: () => set({ isModalOpen: false }),
}))
