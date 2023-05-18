import Button from '@/components/Button';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import imgLogo from '../assets/nlw-spacetime.svg';

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2 ">
      <div className="flex flex-col items-start justify-between relative py-16 overflow-hidden border-r px-28 border-white/10 bg-[url(../assets/bg-star.svg)] bg-cover ">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full " />

        <div className="absolute top-0 bottom-0 w-2 right-2 bg-stripes " />

        <Link
          href={'#'}
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <p className="text-sm leading-snug max-w-[140px]">
            Crie sua conta{' '}
            <span className="underline">e salve suas memórias!</span>
          </p>
        </Link>

        <div className="space-y-5">
          <Image src={imgLogo} alt="NLW spacetime" />

          <div className="max-w-[420px] space-y-1">
            <h1 className="text-5xl font-bold leading-tight text-gray-50">
              Sua cápsula do tempo
            </h1>
            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>

          <Link
            href={'#'}
            className="px-5 py-3 text-sm font-bold leading-none text-black inline-block uppercase transition-colors bg-green-500 rounded-full font-alt hover:bg-green-600"
          >
            CADASTRAR LEMBRANÇA
          </Link>
        </div>

        <footer className="text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da{' '}
          <Link
            rel="noreferrer"
            href={'https://rocketseat.com.br'}
            target="_blank"
            className="underline  hover:text-gray-100"
          >
            Rocketseat
          </Link>
        </footer>
      </div>

      <div className="flex flex-col p-16 bg-[url(../assets/bg-star.svg)] bg-cover">
        <div className="flex flex-1 items-center justify-center">
          <p className="leading-relaxed text-center w-[360px]">
            Você ainda não registrou nenhuma lembrança, comece a{' '}
            <Link className="underline hover:text-gray-50" href={'#'}>
              criar agora!
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
