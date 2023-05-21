import Link from 'next/link';
import React from 'react';

export default function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="leading-relaxed text-center w-[360px]">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <Link className="underline hover:text-gray-50" href={'#'}>
          criar agora!
        </Link>
      </p>
    </div>
  );
}
