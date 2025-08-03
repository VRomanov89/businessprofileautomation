'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Clock, Settings, LogOut, User, Bell, Shield } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/auth/signin');
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) return null;

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
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
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
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              >
                <Clock className="text-gray-400 group-hover:text-blue-500 mr-3 h-5 w-5 transition-colors" />
                Queue
              </Link>
              <Link
                href="/dashboard/settings"
                className="bg-blue-50 text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <Settings className="text-blue-500 mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">
                manage your account preferences and application settings.
              </p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
              {/* Profile Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-600">{session.user?.name || 'Demo User'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-600">{session.user?.email || 'demo@example.com'}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500">Account management features coming soon.</p>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <Bell className="h-5 w-5 text-gray-400 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Post Success Notifications</label>
                      <p className="text-sm text-gray-500">Get notified when posts are published successfully</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Error Notifications</label>
                      <p className="text-sm text-gray-500">Get alerted if posts fail to publish</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked disabled />
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500">Notification preferences coming soon.</p>
                  </div>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-gray-400 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Connected Accounts</label>
                    <p className="text-sm text-gray-600 mb-2">Google Business Profile access via OAuth 2.0</p>
                    <p className="text-xs text-gray-500">We only access the permissions needed to manage your business profiles.</p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500">Advanced security settings coming soon.</p>
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