'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Clock, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import ConnectProfileButton from '@/components/ConnectProfileButton';

// Extended session interface for our custom properties
interface ExtendedSession {
  accessToken?: string;
  error?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push('/auth/signin'); // Not logged in
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">BPA</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-sm text-gray-700">
                Welcome, {session.user?.name || session.user?.email || 'User'}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="bg-blue-50 text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <MapPin className="text-blue-500 mr-3 h-5 w-5" />
                Profiles
              </Link>
              <Link
                href="/dashboard/schedule"
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              >
                <Calendar className="text-gray-400 group-hover:text-blue-500 mr-3 h-5 w-5 transition-colors" />
                Schedule
              </Link>
              <Link
                href="/dashboard/queue"
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              >
                <Clock className="text-gray-400 group-hover:text-blue-500 mr-3 h-5 w-5 transition-colors" />
                Queue
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              >
                <Settings className="text-gray-400 group-hover:text-blue-500 mr-3 h-5 w-5 transition-colors" />
                Settings
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Business Profiles</h1>
              <p className="text-gray-600">
                Connect your Google Business Profiles to start scheduling posts.
              </p>
            </div>

            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="flex items-center space-x-4">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full"
                  />
                )}
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {session.user?.name || 'Unknown User'}
                  </p>
                  <p className="text-gray-600">{session.user?.email}</p>
                  <p className="text-sm text-gray-500">
                    Signed in with Google
                  </p>
                </div>
              </div>
              
              {/* Debug info - remove in production */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Debug Info:</p>
                <p className="text-xs text-gray-600">User Email: {session.user?.email || 'No Email'}</p>
                <p className="text-xs text-gray-600">
                  Access Token: {(session as ExtendedSession).accessToken ? '✓ Present' : '✗ Missing'}
                </p>
                <p className="text-xs text-gray-600">
                  Session Error: {(session as ExtendedSession).error || 'None'}
                </p>
              </div>
            </div>

            {/* Connect Profile Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No profiles connected yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Connect your Google Business Profile to start scheduling and automating your posts.
              </p>
              <ConnectProfileButton />
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Connected Profiles</p>
                    <p className="text-2xl font-bold text-gray-700">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Scheduled Posts</p>
                    <p className="text-2xl font-bold text-gray-700">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Posts This Month</p>
                    <p className="text-2xl font-bold text-gray-700">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}