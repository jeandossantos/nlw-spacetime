import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'nativewind';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';

import bgBlur from './src/assets/bg-blur.png';
import Stripes from './src/assets/stripes.svg';
import NLWLogo from './src/assets/nlw-spacetime-logo.svg';

const StyledStripes = styled(Stripes);

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <ImageBackground
      source={bgBlur}
      className="flex-1 items-center relative px-8 py-10 bg-gray-900"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-2xl leading-tight text-center text-gray-50 font-title ">
            Sua cápsula do tempo
          </Text>
          <Text className="text-base leading-relaxed text-center text-gray-100 font-body">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="px-5 py-3 bg-green-500 rounded-full"
        >
          <Text className="text-sm text-black uppercase font-alt">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-sm leading-relaxed text-center text-gray-200 font-body ">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}
