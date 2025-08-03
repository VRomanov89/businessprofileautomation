import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { GoogleBusinessService, getUserAccessToken } from '@/lib/google-business';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if we already have profiles in our database
    const { data: existingProfiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return NextResponse.json(
        { error: 'Failed to fetch profiles' },
        { status: 500 }
      );
    }

    // If we have existing profiles, return them
    if (existingProfiles && existingProfiles.length > 0) {
      return NextResponse.json({ profiles: existingProfiles });
    }

    // Otherwise, fetch from Google API and store them
    try {
      const accessToken = await getUserAccessToken(user.id);
      const googleService = new GoogleBusinessService(accessToken);
      const businessProfiles = await googleService.getAllBusinessProfiles();

      // Store profiles in our database
      const profilesToInsert = businessProfiles.map(profile => ({
        user_id: user.id,
        gmb_location_id: profile.name,
        name: profile.title || 'Unnamed Location',
        timezone: 'UTC', // Default timezone, can be updated later
      }));

      if (profilesToInsert.length > 0) {
        const { data: insertedProfiles, error: insertError } = await supabase
          .from('profiles')
          .insert(profilesToInsert)
          .select();

        if (insertError) {
          console.error('Error inserting profiles:', insertError);
          return NextResponse.json(
            { error: 'Failed to store profiles' },
            { status: 500 }
          );
        }

        return NextResponse.json({ profiles: insertedProfiles });
      }

      return NextResponse.json({ profiles: [] });
    } catch (error) {
      console.error('Google API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch business profiles from Google' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Refresh profiles from Google API
    try {
      const accessToken = await getUserAccessToken(user.id);
      const googleService = new GoogleBusinessService(accessToken);
      const businessProfiles = await googleService.getAllBusinessProfiles();

      // Delete existing profiles for this user
      await supabase
        .from('profiles')
        .delete()
        .eq('user_id', user.id);

      // Insert new profiles
      const profilesToInsert = businessProfiles.map(profile => ({
        user_id: user.id,
        gmb_location_id: profile.name,
        name: profile.title || 'Unnamed Location',
        timezone: 'UTC',
      }));

      if (profilesToInsert.length > 0) {
        const { data: insertedProfiles, error: insertError } = await supabase
          .from('profiles')
          .insert(profilesToInsert)
          .select();

        if (insertError) {
          console.error('Error inserting profiles:', insertError);
          return NextResponse.json(
            { error: 'Failed to store profiles' },
            { status: 500 }
          );
        }

        return NextResponse.json({ 
          message: 'Profiles refreshed successfully',
          profiles: insertedProfiles 
        });
      }

      return NextResponse.json({ 
        message: 'No profiles found',
        profiles: [] 
      });
    } catch (error) {
      console.error('Google API error:', error);
      return NextResponse.json(
        { error: 'Failed to refresh business profiles from Google' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}