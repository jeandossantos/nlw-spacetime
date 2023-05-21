import { cookies } from 'next/headers';

import Copyright from '@/components/Copyright';
import Hero from '@/components/Hero';
import SignIn from '@/components/SignIn';
import EmptyMemories from '@/components/EmptyMemories';
import Profile from '@/components/Profile';

export default function Home() {
  const isAuthenticated = cookies().has('token');

  return (
    <main className="grid min-h-screen grid-cols-2 ">
      <div className="flex flex-col items-start justify-between relative py-16 overflow-hidden border-r px-28 border-white/10 bg-[url(../assets/bg-star.svg)] bg-cover ">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full " />

        <div className="absolute top-0 bottom-0 w-2 right-2 bg-stripes " />

        {isAuthenticated ? <Profile /> : <SignIn />}

        <Hero />

        <Copyright />
      </div>

      <div className="flex flex-col p-16 bg-[url(../assets/bg-star.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  );
}
