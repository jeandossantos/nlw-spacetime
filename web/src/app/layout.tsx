import './globals.css';
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google';

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
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${baiJamjuree} font-sans bg-gray-900 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
