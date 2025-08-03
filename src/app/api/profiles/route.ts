import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // For now, return empty profiles (auth will be implemented later)
    return NextResponse.json({ profiles: [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // For now, return empty profiles (auth will be implemented later)
    return NextResponse.json({ 
      message: 'Profiles refresh not implemented yet',
      profiles: [] 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}