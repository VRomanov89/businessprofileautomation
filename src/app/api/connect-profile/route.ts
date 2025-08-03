import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In a real implementation, you would:
    // 1. Use the user's Google access token to fetch their business profiles
    // 2. Present them with a list to choose from
    // 3. Store the selected profile in the database
    
    // For now, we'll simulate a successful connection
    const mockProfile = {
      id: 'mock-profile-' + Date.now(),
      user_id: session.user.id,
      gmb_location_id: 'location-123',
      name: 'Demo Restaurant',
      timezone: 'America/New_York',
    };

    // Check if we're in development mode (placeholder credentials)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')) {
      // Development mode - return mock data
      console.log('Development mode: Mock profile connection:', mockProfile);
      return NextResponse.json({ 
        success: true, 
        profile: mockProfile,
        message: 'Profile connected successfully (development mode)'
      });
    }
    
    // Production mode - save to Supabase
    const { data, error } = await supabase
      .from('profiles')
      .insert([mockProfile])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to connect profile' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      profile: data,
      message: 'Profile connected successfully'
    });

  } catch (error) {
    console.error('Connect profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}