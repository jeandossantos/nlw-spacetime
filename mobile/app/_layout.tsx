import { styled } from 'nativewind';
import { SplashScreen, Stack } from 'expo-router';
import bgBlur from '../src/assets/bg-blur.png';
import Stripes from '../src/assets/stripes.svg';
import { ImageBackground } from 'react-native';

const StyledStripes = styled(Stripes);

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as secureStore from 'expo-secure-store';

export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null);

  useEffect(() => {
    secureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token);
    });
  }, []);

  if (!hasLoadedFonts) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground
      source={bgBlur}
      className="flex-1 relative bg-gray-900"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}
