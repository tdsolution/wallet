import {
  Screen,
  View,
  Steezy,
  Text,
  Spacer,
  Button,
  deviceHeight,
} from '@tonkeeper/uikit';
import Svg, { Path, Defs, LinearGradient, Stop, G, ClipPath } from 'react-native-svg';
import { useWindowDimensions, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { memo, useCallback } from 'react';
import { t } from '@tonkeeper/shared/i18n';
import { MainStackRouteNames } from '$navigation';
import { useDispatch } from 'react-redux';
import { walletActions } from '$store/wallet';
import { useNavigation } from '@tonkeeper/router';
const HEIGHT_RATIO = deviceHeight / 844;

export const StartScreen = memo(() => {
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();
  const nav = useNavigation();

  const origShapesWidth = 560;
  const origShapesHeight = 494;
  const origShapesScreenHeight = 844;
  const ratioHeight = dimensions.height / origShapesScreenHeight;
  const logoShapesPosX = origShapesWidth / 2 - dimensions.width / 2;
  const logoShapesPosY = origShapesHeight / 2 - (origShapesHeight * ratioHeight) / 2;

  const handleCreatePress = useCallback(() => {
    dispatch(walletActions.generateVault());
    nav.navigate(MainStackRouteNames.CreateWalletStack);
  }, [dispatch, nav]);

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 494 * HEIGHT_RATIO,
          }}
        >
           <Animated.View
            style={[
              styles.absolute.static,
              {
                transform: [
                  { translateX: -logoShapesPosX },
                  { translateY: -logoShapesPosY },
                  { scale: HEIGHT_RATIO },
                ],
              },
            ]}
          >
            <LogoShapes />
          </Animated.View>
        </View>
        <View style={styles.info}>
          <Text type="h2" textAlign="center">
            TD Wallet
          </Text>
          <Spacer y={4} />
          <Text type="body1" color="textSecondary" textAlign="center">
            {t('start_screen.caption')}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.buttons}>
          <Button
            title={t('start_screen.create_wallet_button')}
            onPress={handleCreatePress}
          />
          <Spacer y={16} />
          <Button
            title={t('start_screen.import_wallet_button')}
            color="secondary"
            navigate={MainStackRouteNames.ImportWalletStack}
          />
        </View>
      </View>
    </Screen>
  );
});

const styles = Steezy.create(({ safeArea }) => ({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logoIcon: {
    position: 'relative',
  },
  logoDemo: { 
    width: 150, // Độ rộng của logo
    height: 150, // Độ cao của logo
  },
  content: {
    paddingBottom: safeArea.bottom,
  },
  logo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  buttons: {
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 32,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    height: 224,
    width: '100%',
    zIndex: 1,
  },
  square: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
}));

const LogoShapes = () => (
  <Svg width={560} height={494} fill="none">
     <Image
       style={{ width: 300, height: 300,position: 'absolute' ,left: 120,top:200}}
       source={{ uri: "https://i.imgur.com/xLs5Jrv.png" }}
            />
  </Svg>
);
