import { supabase } from './supabase';

const GOOGLE_MY_BUSINESS_API_BASE = 'https://mybusinessbusinessinformation.googleapis.com/v1';

export interface GoogleBusinessLocation {
  name: string;
  title: string;
  categories: Array<{ name: string }>;
  storefrontAddress?: {
    addressLines?: string[];
    locality?: string;
    administrativeArea?: string;
    postalCode?: string;
    regionCode?: string;
  };
}

export class GoogleBusinessService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async makeRequest(endpoint: string) {
    const response = await fetch(`${GOOGLE_MY_BUSINESS_API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google API Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async getAccounts() {
    try {
      const response = await this.makeRequest('/accounts');
      return response.accounts || [];
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }

  async getLocations(accountName: string): Promise<GoogleBusinessLocation[]> {
    try {
      const response = await this.makeRequest(`/${accountName}/locations`);
      return response.locations || [];
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  async getAllBusinessProfiles(): Promise<GoogleBusinessLocation[]> {
    try {
      const accounts = await this.getAccounts();
      const allLocations: GoogleBusinessLocation[] = [];

      for (const account of accounts) {
        try {
          const locations = await this.getLocations(account.name);
          allLocations.push(...locations);
        } catch (error) {
          console.error(`Error fetching locations for account ${account.name}:`, error);
          // Continue with other accounts even if one fails
        }
      }

      return allLocations;
    } catch (error) {
      console.error('Error fetching all business profiles:', error);
      throw error;
    }
  }

  static async createPost(locationName: string, content: string, accessToken: string) {
    const endpoint = `${GOOGLE_MY_BUSINESS_API_BASE}/${locationName}/localPosts`;
    
    const postData = {
      languageCode: 'en-US',
      summary: content,
      callToAction: {
        actionType: 'LEARN_MORE',
        url: 'https://www.example.com', // You can make this configurable
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create post: ${response.status} - ${errorText}`);
    }

    return response.json();
  }
}

export async function refreshGoogleToken(refreshToken: string): Promise<string> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh Google token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function getUserAccessToken(userId: string): Promise<string> {
  const { data, error } = await supabase
    .from('users')
    .select('access_token, refresh_token')
    .eq('id', userId)
    .single();

  if (error || !data) {
    throw new Error('User not found');
  }

  // Try the access token first
  try {
    // Test if the token is still valid by making a simple API call
    const response = await fetch(`${GOOGLE_MY_BUSINESS_API_BASE}/accounts`, {
      headers: {
        'Authorization': `Bearer ${data.access_token}`,
      },
    });

    if (response.ok) {
      return data.access_token;
    }
  } catch {
    console.log('Access token expired, refreshing...');
  }

  // If access token is expired, refresh it
  if (data.refresh_token) {
    const newAccessToken = await refreshGoogleToken(data.refresh_token);
    
    // Update the access token in the database
    await supabase
      .from('users')
      .update({ access_token: newAccessToken })
      .eq('id', userId);

    return newAccessToken;
  }

  throw new Error('No valid tokens available');
}