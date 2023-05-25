import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg';
import { api } from '../src/lib/api';
import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

dayjs.locale(ptBr);

interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}
export default function Memories() {
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();
  const [memories, setMemories] = useState<Memory[]>([]);

  async function signOut() {
    await SecureStore.deleteItemAsync('token');

    router.push('/');
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token');

    const memories = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemories(memories.data);
  }

  useEffect(() => {
    loadMemories();
  }, []);

  return (
    <ScrollView
      className="flex-1 px-8 "
      contentContainerStyle={{
        paddingBottom: bottom,
        paddingTop: top,
      }}
    >
      <View className="flex-row items-center justify-between mt-4">
        <NLWLogo />

        <Link href={'/new'} asChild>
          <View className="flex-row gap-1.5">
            <TouchableOpacity
              className="items-center justify-center w-10 h-10 bg-red-500 rounded-full"
              onPress={signOut}
            >
              <Icon name="log-out" size={16} color={'#fff'} className="" />
            </TouchableOpacity>

            <TouchableOpacity className="items-center justify-center w-10 h-10 bg-green-500 rounded-full">
              <Icon name="plus" size={16} color={'#000'} className="" />
            </TouchableOpacity>
          </View>
        </Link>
      </View>

      <View className="my-6 space-y-10">
        {memories.map((memory) => (
          <View className="space-y-4" key={memory.id}>
            <View className="flex-row items-center gap-2">
              <View className="w-5 h-px bg-gray-50" />

              <Text className="text-sm text-gray-100 font-body">
                {dayjs(memory.createdAt).format('D [de] MMMM[,] YYYY')}
              </Text>
            </View>

            <View className="space-y-4">
              <Image
                source={{
                  uri: memory.coverUrl,
                }}
                className="w-full rounded-lg aspect-video"
                alt=""
              />

              <Text className="text-base leading-relaxed text-gray-100 font-body">
                {memory.excerpt}
              </Text>

              <Link href={`/memories/${memory.id}`} asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="text-sm text-gray-200 font-body">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color={'#9e9ea0'} />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
