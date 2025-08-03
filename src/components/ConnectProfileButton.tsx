'use client';

import { Plus } from 'lucide-react';

export default function ConnectProfileButton() {
  const handleConnect = () => {
    // Simulate profile connection with better UX
    alert('🚀 Profile connection feature coming soon!\n\nThis will integrate with Google Business Profile API to:\n• Connect your business profiles\n• Sync location data\n• Enable automated posting\n\nStay tuned for the full integration!');
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={handleConnect}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Connect Profile
      </button>
      <div className="text-xs text-gray-500">
        Demo mode: Click to see connection flow
      </div>
    </div>
  );
}