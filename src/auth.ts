// Simplified auth implementation for production compatibility
// This will be replaced with proper NextAuth once React 19 compatibility is resolved

export async function auth() {
  // Mock session for development
  return {
    user: {
      id: "mock-user-id",
      name: "Demo User",
      email: "demo@example.com",
      image: "https://via.placeholder.com/32"
    }
  };
}

export async function signIn(provider: string, options?: { redirectTo?: string }) {
  // Mock sign in - in production this would redirect to Google OAuth
  if (options?.redirectTo) {
    const { redirect } = await import('next/navigation');
    redirect(options.redirectTo);
  }
}

export async function signOut(options?: { redirectTo?: string }) {
  // Mock sign out
  if (options?.redirectTo) {
    const { redirect } = await import('next/navigation');
    redirect(options.redirectTo);
  }
}

export const handlers = {
  GET: async () => new Response('Auth endpoint not implemented', { status: 501 }),
  POST: async () => new Response('Auth endpoint not implemented', { status: 501 })
};