'use client';

import { Plus, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface ConnectProfileButtonProps {
  onSuccess?: (profile: any) => void;
}

export default function ConnectProfileButton({ onSuccess }: ConnectProfileButtonProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleConnect = async () => {
    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/connect-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Profile connected successfully!');
        
        if (onSuccess) {
          onSuccess(data.profile);
        }
        
        // Refresh the page after a brief delay to show the connected profile
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setStatus('error');
        
        // Handle different error types
        switch (data.error) {
          case 'NoProfilesFound':
            setMessage('No Google Business Profiles found. Please create a business profile on Google first.');
            break;
          case 'AccessDenied':
            setMessage('Access denied. Please ensure you have permissions to manage your business profile.');
            break;
          case 'TokenExpired':
            setMessage('Your session has expired. Please sign in again.');
            setTimeout(() => {
              window.location.href = '/auth/signin';
            }, 3000);
            break;
          default:
            setMessage(data.message || 'Failed to connect profile. Please try again.');
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Connecting...
        </>
      );
    }

    if (status === 'success') {
      return (
        <>
          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
          Connected!
        </>
      );
    }

    if (status === 'error') {
      return (
        <>
          <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
          Try Again
        </>
      );
    }

    return (
      <>
        <Plus className="h-4 w-4 mr-2" />
        Connect Profile
      </>
    );
  };

  const getButtonStyles = () => {
    const baseStyles = "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
    
    if (status === 'success') {
      return `${baseStyles} text-green-700 bg-green-100 hover:bg-green-200`;
    }
    
    if (status === 'error') {
      return `${baseStyles} text-red-700 bg-red-100 hover:bg-red-200`;
    }
    
    if (loading) {
      return `${baseStyles} text-gray-700 bg-gray-100 cursor-not-allowed`;
    }
    
    return `${baseStyles} text-white bg-blue-600 hover:bg-blue-700`;
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={handleConnect}
        disabled={loading}
        className={getButtonStyles()}
      >
        {getButtonContent()}
      </button>
      
      {message && (
        <div className={`text-sm p-3 rounded-lg ${
          status === 'success' 
            ? 'text-green-800 bg-green-50 border border-green-200' 
            : status === 'error'
            ? 'text-red-800 bg-red-50 border border-red-200'
            : 'text-gray-600 bg-gray-50 border border-gray-200'
        }`}>
          {message}
        </div>
      )}
      
      {status === 'idle' && (
        <div className="text-xs text-gray-500">
          This will connect your Google Business Profile for automated posting
        </div>
      )}
    </div>
  );
}