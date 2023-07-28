export default interface IMintModal {
  handleLoading: (isMintLoading: boolean) => void
  checkNetwork: () => boolean
  isModalVisible: boolean
  toggleIsVisible: () => void
  loading: boolean
  coreMintFunc: () => Promise<void>
  handleRefetch: () => Promise<void>
}
