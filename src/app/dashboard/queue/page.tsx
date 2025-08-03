import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Calendar, Clock, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default async function Queue() {
  const session = await auth();
  
  if (!session) {
    redirect('/auth/signin');
  }

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
                Welcome, {session.user?.name || 'User'}
              </span>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button
                  type="submit"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </form>
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
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              >
                <MapPin className="text-gray-400 group-hover:text-blue-500 mr-3 h-5 w-5 transition-colors" />
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
                className="bg-blue-50 text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <Clock className="text-blue-500 mr-3 h-5 w-5" />
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Queue</h1>
              <p className="text-gray-600">
                Monitor and manage your scheduled posts across all connected profiles.
              </p>
            </div>

            {/* Coming Soon State */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Post Queue Coming Soon
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                View all your scheduled posts in one place with real-time status updates and management controls.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-green-800">
                  <strong>Queue features:</strong><br />
                  • Real-time posting status<br />
                  • Edit scheduled posts<br />
                  • Pause/resume campaigns<br />
                  • Posting analytics & insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}