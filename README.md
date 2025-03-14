# BruceLeads

A modern lead management and sales automation platform built with Next.js 14, Prisma, and TypeScript.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Headless UI
- **Animation**: Framer Motion
- **Forms**: React Hook Form
- **Validation**: Zod
- **Payment Processing**: Stripe

## Features

- Smart trigger detection for sales opportunities
- Lead scoring and management
- Activity tracking
- Task management
- Analytics dashboard
- Team collaboration tools
- Stripe integration for payments

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   yarn dev
   ```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (authenticated)/    # Protected routes with sidebar
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── marketing/        # Marketing components
│   ├── ui/               # UI components
│   └── leads/            # Lead-related components
├── lib/                   # Utility functions and configurations
└── types/                # TypeScript type definitions
```

## Required Accounts

1. **Database**: Set up a PostgreSQL database (local or hosted)
2. **OAuth Providers**:
   - [Google Cloud Console](https://console.cloud.google.com/)
   - [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
3. **Payment Processing**:
   - [Stripe](https://stripe.com/)
4. **Email Service** (optional):
   - [SendGrid](https://sendgrid.com/) or [Amazon SES](https://aws.amazon.com/ses/)
5. **Redis** (for rate limiting):
   - [Redis Cloud](https://redis.com/cloud/overview/) or local installation

## Development

- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn start`: Start production server
- `yarn lint`: Run ESLint
- `yarn prisma:studio`: Open Prisma Studio

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
