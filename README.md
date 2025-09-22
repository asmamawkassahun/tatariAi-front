This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.






lovable-webapp/
├── .env.local                          # Environment variables (API keys, DB URLs)
├── .env.example                        # Environment template for setup
├── .gitignore                          # Git ignore patterns
├── .eslintrc.json                      # ESLint configuration
├── .prettierrc                         # Prettier code formatting
├── next.config.mjs                     # Next.js 15 configuration
├── package.json                        # Dependencies and scripts
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── middleware.ts                       # Route protection & auth middleware
├── instrumentation.ts                  # Performance monitoring setup
│
├── app/                               # Next.js 15 App Router
│   ├── globals.css                    # Global styles, design tokens, gradients
│   ├── layout.tsx                     # Root layout with providers
│   ├── loading.tsx                    # Global loading UI
│   ├── error.tsx                      # Global error boundary
│   ├── not-found.tsx                  # 404 page
│   ├── page.tsx                       # Homepage with hero + community
│   │
│   ├── (auth)/                        # Authentication route group
│   │   ├── login/
│   │   │   └── page.tsx               # Login page
│   │   ├── register/
│   │   │   └── page.tsx               # Registration page
│   │   ├──── forgot-password/
│   │   │    └── page.tsx               # Password reset
│   │   ├──Continue WithEmail
│   │	   └──layout.tsx
│   │   
│   ├── (marketing)/                   # Public marketing pages
│   │   ├── community/
│   │   │   └── page.tsx               # Community showcase
│   │   ├── pricing/
│   │   │   └── page.tsx               # Pricing plans
│   │   ├── enterprise/
│   │   │   └── page.tsx               # Enterprise solutions
│   │   ├── learn/
│   │   │   └── page.tsx               # Documentation & tutorials
│   │   ├── launched/
│   │   │   └── page.tsx               # Launched projects gallery
│   │
│   └── api/                           # API Routes (Next.js 15)
│          └── route.ts           # POST /api/auth/registe
│
├── components/                        # Reusable UI Components
│   ├── ui/                           # shadcn/ui base components
│   │   ├── button.tsx                # Button variants
│   │   ├── input.tsx                 # Input field
│   │   ├── card.tsx                  # Card container
│   │   ├── badge.tsx                 # Status badges
│   │   ├── tabs.tsx                  # Tab navigation
│   │   ├── dialog.tsx                # Modal dialogs
│   │   ├── dropdown-menu.tsx         # Dropdown menus
│   │   ├── form.tsx                  # Form components
│   │   ├── toast.tsx                 # Toast notifications
│   │   └── ...                       # Other shadcn components
│   │
│   ├── layout/                       # Layout components
│   │   ├── header.tsx                # Top navigation bar
│   │   ├── footer.tsx                # Site footer
│   │   ├── sidebar.tsx               # Dashboard sidebar
│   │   └── navigation.tsx            # Navigation logic
│   │
│   ├── hero/                         # Homepage hero section
│   │   ├── hero-section.tsx          # Main hero container
│   │   ├── prompt-input.tsx          # "Tell Lovable to create" input
│   │   ├── action-buttons.tsx        # Attach/Publish buttons
│   │   ├── gradient-background.tsx   # Animated gradient background
│   │   └── hero-animation.tsx        # Hero animations
│   │
│   ├── community/                    # Community showcase components
│   │   ├── community-showcase.tsx    # "From the Community" section
│   │   ├── project-grid.tsx          # Responsive project grid
│   │   ├── project-card.tsx          # Individual project cards
│   │   ├── category-tabs.tsx         # Popular/Internal tools tabs
│   │   ├── project-filters.tsx       # Filter controls
│   │   └── view-all-button.tsx       # "View All" CTA
│   │
│   ├── auth/                         # Authentication components
│   │   ├── login-form.tsx            # Login form
│   │   ├── register-form.tsx         # Registration form
│   │   ├── auth-provider.tsx         # Auth context provider
│   │   ├── protected-route.tsx       # Route protection wrapper
│   │   ├── login-button.tsx          # Header login button
│   │   ├── get-started-button.tsx    # CTA button
│   │   └── auth-modal.tsx            # Login/signup modal
│   │
│   ├── dashboard/                    # Dashboard-specific components
│   │   ├── dashboard-header.tsx      # Dashboard page header
│   │   ├── project-card.tsx          # Project card in dashboard
│   │   ├── project-list.tsx          # Projects listing
│   │   ├── stats-overview.tsx        # Usage statistics
│   │   ├── recent-activity.tsx       # Recent activity feed
│   │   └── quick-actions.tsx         # Quick action buttons
│   │
│   ├── ai/                          # AI-related components
│   │   ├── chat-interface.tsx        # AI chat interface
│   │   ├── code-generator.tsx        # Code generation UI
│   │   ├── ai-suggestions.tsx        # AI suggestion cards
│   │   ├── prompt-builder.tsx        # Prompt construction tool
│   │   └── generation-history.tsx    # History of generations
│   │
│   ├── marketing/                   # Marketing page components
│   │   ├── features-section.tsx      # Features showcase
│   │   ├── pricing-table.tsx         # Pricing comparison
│   │   ├── testimonials.tsx          # Customer testimonials
│   │   ├── cta-section.tsx           # Call-to-action sections
│   │   └── stats-banner.tsx          # Usage statistics banner
│   │
│   └── common/                      # Shared components
│       ├── logo.tsx                  # Lovable logo component
│       ├── loading-spinner.tsx       # Loading indicators
│       ├── error-boundary.tsx        # Error boundary wrapper
│       ├── page-header.tsx           # Consistent page headers
│       ├── search-bar.tsx            # Search functionality
│       └── theme-toggle.tsx          # Dark/light mode toggle
│
├── lib/                             # Utility libraries
│   ├── utils.ts                     # General utilities (cn, formatters)
│   ├── validations.ts               # Zod validation schemas
│   ├── constants.ts                 # App-wide constants
│   ├── auth.ts                      # Authentication configuration
│   ├── db.ts                        # Database connection utilities
│   ├── stripe.ts                    # Stripe payment configuration
│   ├── openai.ts                    # OpenAI/AI SDK configuration
│   ├── animations.ts                # Framer Motion animations
│   ├── supabase/                    # Supabase utilities
│   │   ├── client.ts                # Browser Supabase client
│   │   ├── server.ts                # Server Supabase client
│   │   └── middleware.ts            # Middleware Supabase client
│   └── email.ts                     # Email service utilities
│
├── store/                           # State Management (Zustand)
│   ├── auth-store.ts                # Authentication state
│   ├── project-store.ts             # Project management state
│   ├── ui-store.ts                  # UI state (modals, sidebar)
│   ├── ai-store.ts                  # AI generation state
│   ├── community-store.ts           # Community projects state
│   └── billing-store.ts             # Billing/subscription state
│
├── hooks/                           # Custom React Hooks
│   ├── use-auth.ts                  # Authentication logic
│   ├── use-projects.ts              # Project data fetching
│   ├── use-ai-generation.ts         # AI generation workflow
│   ├── use-community-projects.ts    # Community data fetching
│   ├── use-billing.ts               # Billing/subscription logic
│   ├── use-gradient-animation.ts    # Animated gradient backgrounds
│   ├── use-local-storage.ts         # Persistent local storage
│   ├── use-debounce.ts              # Input debouncing
│   └── use-toast.ts                 # Toast notification system
│
├── types/                           # TypeScript Type Definitions
│   ├── auth.ts                      # User & authentication types
│   ├── project.ts                   # Project-related types
│   ├── community.ts                 # Community project types
│   ├── api.ts                       # API request/response types
│   ├── database.ts                  # Database schema types
│   ├── navigation.ts                # Navigation & routing types
│   └── global.d.ts                  # Global type declarations
│
│
├── public/                          # Static Assets
│   ├── images/
│   │   ├── logo.svg                 # Lovable logo
│   │   ├── hero-bg.jpg              # Hero background image
│   │   ├── project-thumbnails/      # Community project images
│   │   └── avatars/                 # User avatar placeholders
│   ├── icons/
│   │   ├── favicon.ico              # Site favicon
│   │   ├── apple-touch-icon.png     # iOS app icon
│   │   └── manifest-icons/          # PWA icons
│   └── docs/
│       └── api-documentation.pdf    # API documentation
│
├── data/                            # Static Data Files
│   ├── navigation-links.ts          # Header navigation structure
│   ├── footer-links.ts              # Footer link organization
│   ├── community-projects.ts        # Mock community project data
│   └── pricing-plans.ts             # Pricing tier definitions
│
│
├── Services/
