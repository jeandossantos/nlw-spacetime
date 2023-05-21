import { getUserFromCookie } from '@/lib/auth';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Profile() {
  const { name, avatarUrl } = getUserFromCookie();

  return (
    <div className="flex items-center gap-3 text-left transition-colors">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full">
        <Image
          src={avatarUrl}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
          alt={`${name} avatar`}
        />
      </div>
      <p className="text-sm leading-snug max-w-[140px]">
        {name}
        <Link
          href={'#'}
          className="text-red-400 block transition-colors hover:text-red-300"
        >
          {' '}
          Quero sair{' '}
        </Link>
      </p>
    </div>
  );
}
