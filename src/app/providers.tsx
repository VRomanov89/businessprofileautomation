'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
}) {
  // @ts-expect-error - NextAuth v4 session type compatibility issue
  return <SessionProvider session={session}>{children}</SessionProvider>;
}