'use client';

import { MapPin, Plus, Calendar, Clock, Settings, LogOut } from 'lucide-react';

export default function Dashboard() {
  const handleSignOut = () => {
    // TODO: Implement real sign out when authentication is set up
    window.location.href = '/';
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
              <span className="text-sm text-gray-700">
                Welcome, Demo User
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
              <a
                href="#"
                className="bg-blue-50 text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <MapPin className="text-blue-500 mr-3 h-5 w-5" />
                Profiles
              </a>
              <a
                href="#"
                className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <Calendar className="text-gray-400 mr-3 h-5 w-5" />
                Schedule
              </a>
              <a
                href="#"
                className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <Clock className="text-gray-400 mr-3 h-5 w-5" />
                Queue
              </a>
              <a
                href="#"
                className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <Settings className="text-gray-400 mr-3 h-5 w-5" />
                Settings
              </a>
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

            {/* Empty State */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No profiles connected yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Connect your Google Business Profile to start scheduling and automating your posts.
              </p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="h-4 w-4 mr-2" />
                Connect Profile
              </button>
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