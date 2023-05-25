import EmptyMemories from '@/components/EmptyMemories';
import { api } from '@/lib/api';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import ptBr from 'dayjs/locale/pt-br';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

dayjs.locale(ptBr);

interface Memory {
  id: string;
  name: string;
  excerpt: string;
  coverUrl: string;
  createdAt: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has('token');
  const token = cookies().get('token')?.value;

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const response = await api.get<Memory[]>('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memories = response.data;

  return (
    <div className="flex flex-col gap-10 p-8 ">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-6">
          <time className="flex items-center gap-2 -ml-8 text-gray-100 tex-sm before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D [de] MMMM[,] YYYY')}{' '}
          </time>

          <Image
            src={memory.coverUrl}
            alt=""
            width={592}
            height={280}
            className="w-full object-cover rounded-lg aspect-video"
          />

          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 transition-colors hover:text-gray-100 "
          >
            Ler mais
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
