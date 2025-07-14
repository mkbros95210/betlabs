# Deployment Instructions for Ultra Betting App

This document provides instructions for deploying the Ultra Betting App.

## Prerequisites

Before you begin, ensure you have the following:

*   A Supabase account
*   A Vercel account (or another hosting provider for Next.js)
*   Node.js and npm installed

## 1. Supabase Setup

1.  **Create a new Supabase project.**
2.  **Get your project's API URL and keys.** You'll find these in your Supabase project's settings under "API".
3.  **Run the database schema.** In the Supabase SQL Editor, paste the contents of `supabase/schema.sql` and run it to create the necessary tables.

## 2. Environment Variables

You'll need to set the following environment variables in your hosting environment (e.g., Vercel).

### For the Web App (`apps/web`)

*   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project's URL.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project's `anon` key.

### For the Admin App (`apps/admin`)

*   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project's URL.
*   `SUPABASE_SERVICE_KEY`: Your Supabase project's `service_role` key.

## 3. Deployment

1.  **Connect your Git repository to Vercel.**
2.  **Configure the projects.** You'll need to configure a separate project for each app (`apps/web` and `apps/admin`).
3.  **Set the build command and output directory.**
    *   For the `web` app, the root directory should be `apps/web`.
    *   For the `admin` app, the root directory should be `apps/admin`.
4.  **Add the environment variables.** Add the environment variables listed above to each project in Vercel.
5.  **Deploy!**

## 4. Supabase Edge Functions

The Supabase edge functions in `supabase/functions` need to be deployed separately using the Supabase CLI.

1.  **Install the Supabase CLI.**
2.  **Log in to the Supabase CLI.**
3.  **Link your local project to your Supabase project.**
4.  **Deploy the functions.**
