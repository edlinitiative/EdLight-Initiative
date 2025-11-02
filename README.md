# EdLight Initiative Website

Modern, accessible website for EdLight Initiative built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run start
```

## 📦 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables (Optional)

If you add backend integrations (Firebase, Stripe, etc.), create a `.env.local` file:

```env
# Example environment variables
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# Add more as needed
```

Then add these same variables in Vercel dashboard under Project Settings → Environment Variables.

## 📂 Project Structure

```
edlight-initiative/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── academy/           # EdLight Academy page
│   ├── labs/              # CISJ Labs page
│   ├── nexus/             # EdLight Nexus page
│   ├── eslp/              # ESLP page
│   ├── store/             # Store page
│   ├── about/             # About page
│   ├── get-involved/      # Get Involved page
│   ├── layout.tsx         # Root layout with fonts & metadata
│   └── globals.css        # Global styles & Tailwind imports
├── components/            # Reusable React components
│   ├── Navbar.tsx        # Sticky navigation bar
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Hero section component
│   ├── Card.tsx          # Card component
│   ├── SectionHeader.tsx # Section header component
│   ├── TestimonialCard.tsx
│   ├── PartnerLogoGrid.tsx
│   ├── ImpactCounters.tsx
│   └── GalleryGrid.tsx
├── data/                  # Static JSON data files
│   ├── impact.json       # Impact statistics
│   ├── testimonials.json # Student testimonials
│   ├── partners.json     # Partner organizations
│   ├── videos.json       # Featured video content
│   ├── nexus.json        # Opportunity listings
│   ├── store.json        # Store products
│   ├── team.json         # Team member profiles
│   ├── timeline.json     # Organization timeline
│   └── media.json        # Media mentions
├── lib/                   # Utility functions
│   └── utils.ts          # Helper functions (cn, formatNumber, etc.)
├── public/                # Static assets
│   ├── logo.png          # Site logo
│   ├── hero.jpg          # Hero background image
│   ├── gallery/          # Image gallery
│   ├── partners/         # Partner logos
│   └── team/             # Team photos
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies & scripts
```

## ✏️ Editing Content

### Update Impact Statistics

Edit `data/impact.json`:

```json
{
  "studentsServed": 2500,
  "coursesOffered": 45,
  "partnerOrganizations": 18,
  "communityMembers": 5000
}
```

### Add/Edit Testimonials

Edit `data/testimonials.json`:

```json
[
  {
    "id": 1,
    "name": "Student Name",
    "role": "Program Name",
    "image": "/gallery/student.jpg",
    "quote": "Their testimonial quote here"
  }
]
```

### Update Partner Organizations

Edit `data/partners.json`:

```json
[
  {
    "id": 1,
    "name": "Partner Name",
    "logo": "/partners/logo.png",
    "website": "https://partner-website.com"
  }
]
```

### Modify Opportunities (Nexus)

Edit `data/nexus.json`:

```json
[
  {
    "id": 1,
    "title": "Opportunity Title",
    "type": "Scholarship",
    "deadline": "2025-12-31",
    "description": "Description of the opportunity",
    "eligibility": "Who can apply"
  }
]
```

### Update Store Products

Edit `data/store.json`:

```json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 25,
    "image": "/store/product.jpg",
    "description": "Product description"
  }
]
```

### Change Team Members

Edit `data/team.json`:

```json
[
  {
    "id": 1,
    "name": "Team Member Name",
    "role": "Their Role",
    "image": "/team/photo.jpg",
    "bio": "Short biography"
  }
]
```

### Modify Timeline

Edit `data/timeline.json`:

```json
[
  {
    "year": 2024,
    "title": "Milestone Title",
    "description": "What happened this year"
  }
]
```

## 🎨 Customizing Design

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: '#38BDF8',    // Main brand color
  accent: '#FACC15',     // Accent color (buttons, CTAs)
  text: '#1E293B',       // Primary text color
  background: '#F9FAFB', // Page background
},
```

### Fonts

Fonts are loaded in `app/layout.tsx`. To change:

```typescript
import { YourFont, AnotherFont } from 'next/font/google'

const yourFont = YourFont({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-your-font',
})
```

Then update `tailwind.config.ts`:

```typescript
fontFamily: {
  heading: ['var(--font-your-font)', 'sans-serif'],
  body: ['var(--font-another-font)', 'sans-serif'],
},
```

## 🔧 Development Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server (after build)
npm run start

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## 🔌 Future Integrations (TODO Comments)

Throughout the codebase, you'll find TODO comments marking where future integrations should go:

### Donations (Zeffy/Stripe)
- **File**: `app/get-involved/page.tsx`
- **Location**: Donate section
- **Action**: Replace placeholder button with Zeffy embed or Stripe integration

### Contact Form Backend
- **File**: `app/get-involved/page.tsx`
- **Location**: `onSubmit` function
- **Action**: Connect to Firebase, SendGrid, or your preferred email service

### Newsletter Subscription
- **File**: `components/Footer.tsx`, `app/api/newsletter/route.ts`
- **Location**: Newsletter input field & API route
- **Action**: Provide Resend credentials via `.env.local`
  - `RESEND_API_KEY`
  - `NEWSLETTER_INBOX`
  - Optional: `NEWSLETTER_FROM_EMAIL` (defaults to `EdLight Initiative <onboarding@resend.dev>`)

### E-commerce Platform
- **File**: `app/store/page.tsx`
- **Location**: Product cards
- **Action**: Integrate Shopify, WooCommerce, or Stripe for checkout

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are mobile-first and tested across devices.

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels for navigation and interactive elements
- Keyboard navigation support
- Focus outlines for accessibility
- Skip link to main content
- Alt text for all images
- Sufficient color contrast (WCAG AA compliant)

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### TypeScript Errors

```bash
# Check for TypeScript errors
npx tsc --noEmit
```

### Linting Errors

```bash
# Auto-fix linting issues
npm run lint -- --fix
```

## 📄 License

Copyright © 2024 EdLight Initiative. All rights reserved.

## 🤝 Contributing

For contributions or questions, please contact the EdLight Initiative team at info@edlight.org

---

**Deployment Checklist:**

Before deploying to production:

- [ ] Update all placeholder images with real photos
- [ ] Review and update all content in data JSON files
- [ ] Test all page routes and links
- [ ] Verify mobile responsiveness
- [ ] Run Lighthouse audit for performance and accessibility
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Configure domain (if using custom domain)
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Add real social media links in Footer
- [ ] Test contact form submission
- [ ] Configure donation integration (Zeffy/Stripe)

**Post-Deployment:**

- [ ] Submit sitemap to Google Search Console
- [ ] Set up Vercel Analytics
- [ ] Monitor Core Web Vitals
- [ ] Set up automated backups for data files
- [ ] Document content update procedures for team
