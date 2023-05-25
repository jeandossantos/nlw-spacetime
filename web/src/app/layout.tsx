import { cookies } from 'next/headers';
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google';

import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import SignIn from '@/components/SignIn';

import './globals.css';

import Copyright from '@/components/Copyright';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' });
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
});

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo criada com React, Typescript, e Tailwind.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has('token');

  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${baiJamjuree} font-sans bg-gray-900 text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2 ">
          <div className="flex flex-col items-start justify-between relative py-16 overflow-hidden border-r px-28 border-white/10 bg-[url(../assets/bg-star.svg)] bg-cover ">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full " />
            <div className="absolute top-0 bottom-0 w-2 right-2 bg-stripes " />
            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />
            <Copyright />
          </div>

          <div className="flex max-h-screen overflow-y-scroll flex-col bg-[url(../assets/bg-star.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
