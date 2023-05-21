import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import imgLogo from '../assets/nlw-spacetime.svg';

export default function Hero() {
  return (
    <div className="space-y-5">
      <Image src={imgLogo} alt="NLW spacetime" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Link
        href={'#'}
        className="px-5 py-3 text-sm font-bold leading-none text-black inline-block uppercase transition-colors bg-green-500 rounded-full font-alt hover:bg-green-600"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  );
}
