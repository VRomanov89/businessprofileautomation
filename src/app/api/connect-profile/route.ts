import { NextResponse } from 'next/server';
import { GoogleBusinessService } from '@/lib/google-business';
import { supabase } from '@/lib/supabase';
import { getToken } from 'next-auth/jwt';

export async function POST(request: Request) {
  try {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    if (!token?.sub || !token.accessToken) {
      return NextResponse.json({ 
        error: 'Unauthorized', 
        message: 'No valid session found. Please sign in again.',
        details: {
          hasToken: !!token,
          hasUserId: !!token?.sub,
          hasAccessToken: !!token?.accessToken
        }
      }, { status: 401 });
    }

    console.log('Token found:', {
      userId: token.sub,
      userEmail: token.email,
      hasAccessToken: !!token.accessToken
    });

    // Initialize Google Business Service with the user's access token
    const googleService = new GoogleBusinessService(token.accessToken as string);

    try {
      // Fetch all business profiles for the user
      console.log('Fetching business profiles...');
      const businessProfiles = await googleService.getAllBusinessProfiles();
      
      console.log('Found business profiles:', businessProfiles.length);
      
      if (businessProfiles.length === 0) {
        return NextResponse.json({ 
          error: 'NoProfilesFound',
          message: 'No Google Business Profiles found. Make sure you have a verified business profile on Google.',
          action: 'create_profile'
        }, { status: 404 });
      }

      // For now, we'll connect the first profile found
      // In a full implementation, you'd show a selection UI
      const selectedProfile = businessProfiles[0];

      console.log('Selected profile:', selectedProfile.title);

      // Store the connected profile in Supabase
      const profileData = {
        user_id: token.sub,
        google_location_id: selectedProfile.name,
        business_name: selectedProfile.title,
        categories: selectedProfile.categories?.map(cat => cat.name) || [],
        address: selectedProfile.storefrontAddress ? 
          `${selectedProfile.storefrontAddress.addressLines?.join(', ') || ''}, ${selectedProfile.storefrontAddress.locality || ''}, ${selectedProfile.storefrontAddress.administrativeArea || ''} ${selectedProfile.storefrontAddress.postalCode || ''}`.trim() : 
          null,
        status: 'active',
        connected_at: new Date().toISOString()
      };

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('connected_profiles')
        .select('*')
        .eq('user_id', token.sub)
        .eq('google_location_id', selectedProfile.name)
        .single();

      let savedProfile;
      
      if (existingProfile) {
        console.log('Updating existing profile...');
        // Update existing profile
        const { data, error } = await supabase
          .from('connected_profiles')
          .update(profileData)
          .eq('id', existingProfile.id)
          .select()
          .single();
          
        if (error) {
          console.error('Supabase update error:', error);
          throw error;
        }
        savedProfile = data;
      } else {
        console.log('Inserting new profile...');
        // Insert new profile
        const { data, error } = await supabase
          .from('connected_profiles')
          .insert([profileData])
          .select()
          .single();
          
        if (error) {
          console.error('Supabase insert error:', error);
          throw error;
        }
        savedProfile = data;
      }

      console.log('Profile saved successfully');

      return NextResponse.json({ 
        success: true, 
        profile: savedProfile,
        allProfiles: businessProfiles.map(profile => ({
          id: profile.name,
          name: profile.title,
          categories: profile.categories?.map(cat => cat.name) || [],
          address: profile.storefrontAddress
        })),
        message: `Successfully connected ${selectedProfile.title}`
      });

    } catch (googleError: unknown) {
      const error = googleError as Error;
      console.error('Google API error:', error);
      
      // Handle specific Google API errors
      if (error.message?.includes('403')) {
        return NextResponse.json({ 
          error: 'AccessDenied',
          message: 'Access denied to Google Business Profile API. Please ensure you have the necessary permissions.',
          action: 'reauthorize',
          details: error.message
        }, { status: 403 });
      }
      
      if (error.message?.includes('401')) {
        return NextResponse.json({ 
          error: 'TokenExpired',
          message: 'Your Google authorization has expired. Please sign in again.',
          action: 'reauthorize',
          details: error.message
        }, { status: 401 });
      }

      return NextResponse.json({ 
        error: 'GoogleAPIError',
        message: 'Failed to fetch business profiles from Google. This might be due to API limitations.',
        details: error.message,
        helpText: 'Note: Google has deprecated the Posts API. Profile connection may work but posting is currently limited.'
      }, { status: 500 });
    }

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Connect profile error:', err);
    return NextResponse.json({ 
      error: 'InternalError',
      message: 'An unexpected error occurred. Please try again.',
      details: err.message
    }, { status: 500 });
  }
}