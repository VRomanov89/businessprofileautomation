-- Create connected_profiles table to store user's connected Google Business Profiles
CREATE TABLE IF NOT EXISTS connected_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  google_location_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  categories TEXT[] DEFAULT '{}',
  address TEXT,
  phone_number TEXT,
  website_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique connection per user per location
  UNIQUE(user_id, google_location_id)
);

-- Create scheduled_posts table for storing posts to be published
CREATE TABLE IF NOT EXISTS scheduled_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  profile_id UUID NOT NULL REFERENCES connected_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'published', 'failed', 'cancelled')),
  google_post_id TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post_templates table for reusable post templates
CREATE TABLE IF NOT EXISTS post_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_connected_profiles_user_id ON connected_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_user_id ON scheduled_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_profile_id ON scheduled_posts(profile_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_scheduled_for ON scheduled_posts(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_status ON scheduled_posts(status);
CREATE INDEX IF NOT EXISTS idx_post_templates_user_id ON post_templates(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_connected_profiles_updated_at 
  BEFORE UPDATE ON connected_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scheduled_posts_updated_at 
  BEFORE UPDATE ON scheduled_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_post_templates_updated_at 
  BEFORE UPDATE ON post_templates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE connected_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies to ensure users can only access their own data
CREATE POLICY "Users can view their own connected profiles" ON connected_profiles
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own connected profiles" ON connected_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update their own connected profiles" ON connected_profiles
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can delete their own connected profiles" ON connected_profiles
  FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can view their own scheduled posts" ON scheduled_posts
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own scheduled posts" ON scheduled_posts
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update their own scheduled posts" ON scheduled_posts
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can delete their own scheduled posts" ON scheduled_posts
  FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can view their own post templates" ON post_templates
  FOR SELECT USING (user_id = auth.uid()::text OR is_public = true);

CREATE POLICY "Users can insert their own post templates" ON post_templates
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update their own post templates" ON post_templates
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can delete their own post templates" ON post_templates
  FOR DELETE USING (user_id = auth.uid()::text);