export enum CreateWalletStackRouteNames {
  CreatePasscode = 'CreateWalletPasscode',
  GenerateMnemonicEVM = 'GenerateMnemonicEVM',
  Notifications = 'CreateWalletNotifications',
}

export type CreateWalletStackParamList = {
  [CreateWalletStackRouteNames.CreatePasscode]: {};
  [CreateWalletStackRouteNames.Notifications]: {};
  [CreateWalletStackRouteNames.GenerateMnemonicEVM]: {};
};
