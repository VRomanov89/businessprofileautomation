# BPA - Business Profile Automation

**Automate your Google Business Profile posts with our simple scheduling tool.**

## Overview

BPA is a MVP tool that allows businesses to:
- Sign up using Google OAuth
- Connect their Google Business Profile(s)
- Queue and schedule posts for each profile
- Automate posting through a background scheduler

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: Supabase (PostgreSQL)
- **API Integration**: Google Business Profile API
- **Testing**: Playwright
- **Deployment**: Vercel (recommended)

## Local Development Setup

### Prerequisites

- Node.js 18+ and npm
- A Google Cloud Project with Business Profile API enabled
- A Supabase project

### Environment Variables

Copy `.env.local` and fill in your credentials:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3001

# Google Business Profile API
GOOGLE_API_KEY=your_google_api_key
```

### Database Setup

1. Create a new Supabase project
2. Run the SQL from `database/schema.sql` in your Supabase SQL editor
3. Update your environment variables with Supabase credentials

### Google Cloud Setup

1. Create a Google Cloud Project
2. Enable the Google Business Profile API
3. Set up OAuth 2.0 credentials:
   - Type: Web application
   - Authorized redirect URIs: `http://localhost:3001/api/auth/callback/google`
   - Scopes: `openid email profile https://www.googleapis.com/auth/business.manage`

### Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3001` to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Playwright tests
- `npm run test:ui` - Run Playwright tests with UI
- `npm run test:headed` - Run Playwright tests in headed mode

## Features Implemented

### ✅ Completed
- [x] Landing page with waitlist signup
- [x] Google OAuth authentication
- [x] Basic dashboard UI
- [x] Supabase database integration
- [x] Google Business Profile API integration
- [x] Playwright test setup

### 🚧 In Progress
- [ ] Post creation and scheduling interface
- [ ] Post queue management
- [ ] Automated posting scheduler

### 📋 Planned
- [ ] Image upload for posts
- [ ] Post analytics
- [ ] Multi-timezone support
- [ ] Bulk post operations
- [ ] Email notifications

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   └── page.tsx        # Landing page
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
├── database/              # Database schemas
├── tests/                 # Playwright tests
└── public/               # Static assets
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy to your preferred hosting provider
3. Set up environment variables
4. Configure domain and SSL

## Testing

Run the test suite:

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run specific test file
npx playwright test tests/landing-page.spec.ts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

Private project - All rights reserved.

## Support

For questions or issues, please contact [your-email@example.com].
