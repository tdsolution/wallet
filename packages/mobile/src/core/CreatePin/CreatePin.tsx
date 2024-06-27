import React, { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as S from '../AccessConfirmation/AccessConfirmation.style';
import { NavBar } from '$uikit';
import { openSetupNotifications, openSetupWalletDone } from '$navigation';
import { walletActions } from '$store/wallet';
import { CreatePinForm } from '$shared/components';
import { tk } from '$wallet';
import { popToTop } from '$navigation/imperative';
import { useParams } from '@tonkeeper/router/src/imperative';
import { BlockingLoader } from '@tonkeeper/uikit';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../../constants/colors';

export const CreatePin: FC = () => {
  const params = useParams<{ isImport?: boolean }>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isImport = !!params.isImport;

  const handlePinCreated = useCallback(
    async (pin: string) => {
      setIsLoading(true);
      dispatch(
        walletActions.createWallet({
          pin,
          onDone: (identifiers) => {
            if (isImport) {
              tk.saveLastBackupTimestampAll(identifiers);
            }
            if (tk.wallet.notifications.isAvailable) {
              openSetupNotifications(identifiers);
            } else {
              openSetupWalletDone(identifiers);
            }
            setIsLoading(false);
          },
          onFail: () => {
            setIsLoading(false);
          },
        }),
      );
    },
    [dispatch, isImport],
  );

  return (
    <S.Wrap>
      <NavBar onClosePress={popToTop} />
      <CreatePinForm onPinCreated={handlePinCreated} />
      {isLoading && <View
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
      <ActivityIndicator size="large" color={colors.Primary}/>
    </View>}
    </S.Wrap>
  );
};
