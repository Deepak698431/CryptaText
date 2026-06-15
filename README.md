# ChatSphere

ChatSphere is a modern AI-powered messaging platform built with Next.js App Router. It includes secure authentication, email verification, message creation and retrieval, profile management, and AI-assisted message suggestions.

## Key Features

- User registration with email verification
- Secure login via NextAuth credentials provider
- AI-generated message suggestions using OpenRouter / OpenAI
- Message composition and storage in MongoDB
- Profile management and user settings
- Resend email integration for verification messages
- Tailwind CSS-based responsive UI

## Technology Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- MongoDB with Mongoose
- NextAuth for authentication
- Resend + @react-email for verification email delivery
- OpenAI/OpenRouter for AI message suggestions
- Tailwind CSS + shadcn/ui components
- Zod for validation helpers

## Project Structure

- `src/app/` - main application routes and pages
  - `(auth)/signup` - sign-up page with verification flow
  - `(auth)/signin` - login page
  - `(auth)/verify` - email verification page
  - `dashboard` - authenticated user dashboard
  - `messages` - message listing and interaction
  - `profile` - profile settings
  - `setting-page` - user settings
- `src/app/api/` - backend API routes
  - `sign-up` - register user and send verification code
  - `verify-code` - verify user account by code
  - `send-messages` - save user messages
  - `get-Messages` - retrieve user messages
  - `suggest-messges` - generate AI suggestions
- `src/lib/` - shared utilities
  - `dbConnect.ts` - MongoDB connection helper
  - `resend.ts` - Resend email client
- `src/models/` - Mongoose models
- `src/helpers/` - reusable helpers like email sending
- `src/components/` - UI components and email templates

## Environment Setup

Create a `.env` file in the project root and provide the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
RESEND_API_KEY=your_resend_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

> Replace each value with your own credentials.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev` - starts the development server
- `npm run build` - builds the application for production
- `npm run start` - starts the production server
- `npm run lint` - runs ESLint

## Authentication Flow

1. Users sign up with username, email, and password.
2. A verification code is emailed via Resend.
3. Users verify their account using the code.
4. Verified users can sign in and access the dashboard.

## API Routes

- `POST /api/sign-up` - register a new user and send verification email
- `POST /api/verify-code` - validate verification code and activate account
- `POST /api/send-messages` - save a new message for the authenticated user
- `GET /api/get-Messages` - return stored messages for the logged-in user
- `POST /api/suggest-messges` - generate AI suggestions for message content

## Notes

- The application uses JWT-based sessions with NextAuth.
- Messages are stored on the authenticated user document.
- Verification codes expire after one hour.

## Contributions

Feel free to extend ChatSphere by adding features such as:

- message editing/deletion
- better AI prompt customization
- notifications and email resend flows
- direct chat or conversation history

---

Made with Next.js, Tailwind CSS, MongoDB, and AI-powered messaging.
