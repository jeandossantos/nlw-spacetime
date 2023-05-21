import { api } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');

  const { data: payload } = await api.post('/register', { code });

  const redirectUrl = new URL('/', request.url);

  const expiresInSeconds = 60 * 60 * 24 * 30;

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${payload.token}; Path=/; max-age=${expiresInSeconds};`,
    },
  });
}
