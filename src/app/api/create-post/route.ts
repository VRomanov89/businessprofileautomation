import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleBusinessService } from '@/lib/google-business';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    if (!token?.sub || !token.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { profileId, content, mediaUrls = [], scheduleFor } = body;

    // Validate required fields
    if (!profileId || !content) {
      return NextResponse.json({ 
        error: 'Missing required fields: profileId and content are required' 
      }, { status: 400 });
    }

    // Get the connected profile from database
    const { data: profile, error: profileError } = await supabase
      .from('connected_profiles')
      .select('*')
      .eq('id', profileId)
      .eq('user_id', token.sub)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ 
        error: 'Profile not found or not accessible' 
      }, { status: 404 });
    }

    const now = new Date();
    const scheduledDate = scheduleFor ? new Date(scheduleFor) : now;

    // If scheduled for future, save to database for later processing
    if (scheduledDate > now) {
      const { data: scheduledPost, error: scheduleError } = await supabase
        .from('scheduled_posts')
        .insert([{
          user_id: token.sub,
          profile_id: profileId,
          content,
          media_urls: mediaUrls,
          scheduled_for: scheduledDate.toISOString(),
          status: 'scheduled'
        }])
        .select()
        .single();

      if (scheduleError) {
        console.error('Error scheduling post:', scheduleError);
        return NextResponse.json({ 
          error: 'Failed to schedule post' 
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Post scheduled for ${scheduledDate.toLocaleString()}`,
        scheduledPost
      });
    }

    // If posting immediately, call Google API
    try {
      const googleService = new GoogleBusinessService(token.accessToken as string);
      
      // Create the post using Google Business Profile API
      const googlePost = await GoogleBusinessService.createPost(
        profile.google_location_id,
        content,
        token.accessToken as string
      );

      // Save the published post to database
      const { data: publishedPost, error: publishError } = await supabase
        .from('scheduled_posts')
        .insert([{
          user_id: token.sub,
          profile_id: profileId,
          content,
          media_urls: mediaUrls,
          scheduled_for: now.toISOString(),
          status: 'published',
          google_post_id: googlePost.name
        }])
        .select()
        .single();

      if (publishError) {
        console.error('Error saving published post:', publishError);
        // Post was published but failed to save to database
        return NextResponse.json({
          success: true,
          message: 'Post published successfully but failed to save to database',
          googlePost
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Post published successfully!',
        publishedPost,
        googlePost
      });

    } catch (googleError: any) {
      console.error('Google API error:', googleError);
      
      // Save failed post to database
      await supabase
        .from('scheduled_posts')
        .insert([{
          user_id: token.sub,
          profile_id: profileId,
          content,
          media_urls: mediaUrls,
          scheduled_for: now.toISOString(),
          status: 'failed',
          error_message: googleError.message
        }]);

      // Handle specific Google API errors
      if (googleError.message?.includes('403')) {
        return NextResponse.json({ 
          error: 'Access denied to post on this business profile' 
        }, { status: 403 });
      }
      
      if (googleError.message?.includes('401')) {
        return NextResponse.json({ 
          error: 'Authorization expired. Please reconnect your profile.' 
        }, { status: 401 });
      }

      return NextResponse.json({ 
        error: 'Failed to publish post: ' + googleError.message 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Create post error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}