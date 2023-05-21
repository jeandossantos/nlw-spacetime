import { User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function SignIn() {
  return (
    <Link
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
    >
      <div className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full">
        <User className="w-5 h-5 text-gray-500" />
      </div>
      <p className="text-sm leading-snug max-w-[140px]">
        Crie sua conta <span className="underline">e salve suas memórias!</span>
      </p>
    </Link>
  );
}
