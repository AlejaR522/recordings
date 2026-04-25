# Recordings

A modern web application for tracking daily wellness habits, mood, sleep, hydration, and productivity. Built with React, TypeScript, and Supabase.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-blue?logo=vite)

## 📋 Features

 **Mood Tracking** - Log your daily mood with an intuitive interface  
 **Task Management** - Create, organize, and track tasks by priority and day  
 **Hydration Tracker** - Monitor your daily water intake  
 **Sleep Tracker** - Track sleep duration and quality  
 **Productivity Tracker** - Log completed tasks and productivity metrics  
 **Checklist System** - Create and manage daily checklists  
 **Gratitude Journal** - Record moments of gratitude  
 **Authentication** - Secure login with Supabase Auth  
 **Data Persistence** - All data synced with Supabase backend  

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: React Query (@tanstack/react-query)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Form Validation**: React Hook Form + Zod
- **Testing**: Vitest
- **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/wellbeing-tracker.git
   cd wellbeing-tracker
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   ```sh
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials in `.env.local`:
   ```
   VITE_SUPABASE_PROJECT_ID=your_project_id
   VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   VITE_SUPABASE_URL=https://your-project.supabase.co
   ```

4. **Start the development server**
   ```sh
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## 📝 Available Scripts

```sh
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── ChecklistCard.tsx
│   ├── GratitudeCard.tsx
│   ├── MoodTracker.tsx
│   ├── TaskList.tsx
│   └── ...
├── pages/              # Page components
│   ├── Index.tsx       # Main dashboard
│   ├── Auth.tsx        # Login page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # External integrations
│   └── supabase/       # Supabase client & types
├── App.tsx             # Main app component
└── main.tsx            # Entry point

supabase/
├── config.toml         # Supabase configuration
└── migrations/         # Database migrations
```

## 🔒 Setting up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Get your project URL and anon public key from project settings
3. Run the database migrations:
   ```sql
   -- The migrations are already in supabase/migrations/
   -- They will be applied when deploying
   ```
4. Add your credentials to `.env.local`

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

```sh
npm run build
```

### Deploy to Other Platforms

This is a standard Node.js/React app built with Vite. It can be deployed to:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS Amplify
- Railway
- Render
- Any Node.js hosting provider

## 📖 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 🐛 Troubleshooting

### "Cannot find module" errors
```sh
rm -rf node_modules package-lock.json
npm install
```

### Supabase connection issues
- Verify your `.env.local` has correct credentials
- Check that Supabase project is active
- Ensure tables exist in your database

### Build fails
```sh
npm run lint           # Fix linting issues
npm run build:dev     # Check for build errors
```

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a portfolio project showcasing modern web development practices.

---

Made with by Alejandra Ruiz end Raquel Martinez
