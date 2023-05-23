import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg';

import { api } from '../src/lib/api';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/60d3e353c76d00223436',
};

export default function App() {
  const router = useRouter();

  const [request, response, sigInWithGithub] = useAuthRequest(
    {
      clientId: '60d3e353c76d00223436',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery
  );

  async function handleOAuthGithubCode(code: string) {
    const { data: response } = await api.post('/register', { code });

    await SecureStore.setItemAsync('token', response.token);

    router.push('/memories');
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      handleOAuthGithubCode(code);
    }
  }, [response]);

  return (
    <View className="flex-1 items-center px-8 py-10">
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
          onPress={() => sigInWithGithub()}
        >
          <Text className="text-sm text-black uppercase font-alt">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-sm leading-relaxed text-center text-gray-200 font-body ">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  );
}
