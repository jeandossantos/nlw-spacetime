import React from 'react';
import Link from 'next/link';

export default function Copyright() {
  return (
    <footer className="text-sm leading-relaxed text-gray-200">
      Feito com 💜 no NLW da{' '}
      <Link
        rel="noreferrer"
        href={'https://rocketseat.com.br'}
        target="_blank"
        className="underline hover:text-gray-100"
      >
        Rocketseat
      </Link>
    </footer>
  );
}
